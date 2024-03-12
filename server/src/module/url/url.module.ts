import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './entities/url.entity';
import { UrlRepository } from './url.repository';

@Module({
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
})
export class UrlModule {}
