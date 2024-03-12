import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { mockedUrl } from 'src/test/mocks/url';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Url } from './entities/url.entity';
import { nanoid } from 'nanoid';
import { mocked } from 'jest-mock';
import { BadRequestException } from '@nestjs/common';
import { UrlRepository } from './url.repository';
import { ConfigService } from '@nestjs/config';

jest.mock('nanoid');

const mockedNanoId = mocked(nanoid);

describe('UrlService', () => {
  let service: UrlService;

  const urlModelMock = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const configServiceMock = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    configServiceMock.get.mockReturnValueOnce('https://brightly.com');

    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    const baseUrl = 'https://brightly.com';
    it('should throw if url is not valid', async () => {
      mockedNanoId.mockReturnValue('riptoriyamasan');
      await expect(
        service.create({ originalUrl: 'RIP toriyama sensei' }),
      ).rejects.toThrow(
        new BadRequestException('Original Url is not a valid url'),
      );
    });

    it('should get and return existing shortened', async () => {
      const originalUrl = mockedUrl.originalUrl;
      const createData = { originalUrl };
      const myNanoId = 'ikuzoooo';
      mockedNanoId.mockReturnValue(myNanoId);
      const existingUrl = {
        originalUrl,
        shortUrl: myNanoId,
      };

      urlModelMock.findOne.mockResolvedValueOnce(existingUrl);
      await expect(service.create(createData)).resolves.toStrictEqual(
        existingUrl,
      );

      expect(urlModelMock.findOne).toHaveBeenCalledTimes(1);
      expect(urlModelMock.findOne).toHaveBeenCalledWith({
        originalUrl,
      });

      expect(urlModelMock.create).not.toHaveBeenCalled();
    });

    it('should shorten received url', async () => {
      const originalUrl = mockedUrl.originalUrl;
      const createData = { originalUrl };
      const myNanoId = 'rip-toriyama-san';
      mockedNanoId.mockReturnValue(myNanoId);
      const expectedResult = {
        originalUrl,
        shortUrl: myNanoId,
      };

      urlModelMock.findOne.mockResolvedValueOnce(undefined);
      urlModelMock.create.mockResolvedValueOnce(expectedResult);
      await expect(service.create(createData)).resolves.toStrictEqual(
        expectedResult,
      );

      expect(urlModelMock.findOne).toHaveBeenCalledTimes(1);
      expect(urlModelMock.findOne).toHaveBeenCalledWith({
        originalUrl,
      });

      expect(urlModelMock.create).toHaveBeenCalledTimes(1);
      expect(urlModelMock.create).toHaveBeenCalledWith(expectedResult);
    });
  });
});
