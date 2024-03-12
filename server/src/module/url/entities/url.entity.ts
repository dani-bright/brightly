import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Url {
  @Prop({ required: true, unique: true })
  originalUrl: string;

  @Prop({ required: true })
  shortUrl: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
