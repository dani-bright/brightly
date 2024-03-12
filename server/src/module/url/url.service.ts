import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { nanoid } from 'nanoid';
import { isValidUrl } from 'src/utils/urlValidation';
import { CreatedUrl, ShortenedUrl } from './url.response';
import { UrlRepository } from './url.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    @InjectConnection() private readonly connection: Connection,
    private readonly configService: ConfigService,
  ) {}

  getDbConnection(): Connection {
    return this.connection;
  }

  async create(createUrlDto: CreateUrlDto): Promise<CreatedUrl> {
    const { originalUrl } = createUrlDto;

    if (!isValidUrl(originalUrl)) {
      throw new BadRequestException('Original Url is not a valid url');
    }

    try {
      const exisitingUrl = await this.urlRepository.findOne({
        originalUrl,
      });

      if (exisitingUrl) {
        return {
          originalUrl: exisitingUrl.originalUrl,
          shortUrl: exisitingUrl.shortUrl,
        };
      }

      const shortUrl = nanoid();

      const createdUrl = await this.urlRepository.create({
        ...createUrlDto,
        shortUrl,
      });

      return { shortUrl, originalUrl: createdUrl.originalUrl };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll(): Promise<ShortenedUrl[]> {
    const base = this.configService.get<string>('BRIGHTLY_URL_BASE');

    const urls = await this.urlRepository.find();
    return urls.map(({ shortUrl }) => ({
      url: `${base}/${shortUrl}`,
      shortUrl,
    }));
  }

  async getUrl(shortUrl: string): Promise<string> {
    const exisitingUrl = await this.urlRepository.findOne({
      shortUrl,
    });
    if (!exisitingUrl) {
      throw new NotFoundException("this url doesn't exist");
    }
    return exisitingUrl.originalUrl;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
