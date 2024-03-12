import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlRepository {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  async find(urlFilterQuery?: FilterQuery<Url>): Promise<Url[]> {
    return this.urlModel.find(urlFilterQuery);
  }

  async findOne(userFilterQuery: FilterQuery<Url>): Promise<Url> {
    return this.urlModel.findOne(userFilterQuery);
  }

  async create(url: Url): Promise<Url> {
    return this.urlModel.create(url);
  }
}
