import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Url } from './entities/url.entity';
import { UrlRepository } from './url.repository';
import { ConfigService } from '@nestjs/config';

describe('UriController', () => {
  let controller: UrlController;

  const urlModelMock = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const configServiceMock = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [
        UrlService,
        UrlRepository,
        {
          provide: getModelToken(Url.name),
          useValue: urlModelMock,
        },
        {
          provide: getConnectionToken('Database'),
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UrlController>(UrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
