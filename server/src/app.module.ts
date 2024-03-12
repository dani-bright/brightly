import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './module/url/url.module';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configSchema,
      validationOptions: {
        presence: 'required',
      },
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    UrlModule,
  ],
})
export class AppModule {}
