import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UrlModule } from './url.module';
import { mockedUrl } from 'src/test/mocks/url';
import { Connection } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UrlService } from './url.service';

describe('UrlController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  const configServiceMock = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING), //baaad
        UrlModule,
      ],
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbConnection = app.get<UrlService>(UrlService).getDbConnection();
    await dbConnection.collection('url').deleteMany({});
    configServiceMock.get.mockReturnValueOnce('https://brightly.com');
  });

  afterAll(async () => {
    await dbConnection.collection('url').deleteMany({});
    await app.close();
  });

  it('/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/url')
      .send({ originalUrl: mockedUrl.originalUrl });

    expect(response.status).toBe(201);
  });
});
