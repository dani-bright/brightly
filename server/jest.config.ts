import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: '.',
  preset: 'ts-jest',
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    'src/utils/(.*)': '<rootDir>/src/utils/$1',
    'src/constants': '<rootDir>/src/constants.ts',
    'src/test/mocks/(.*)': '<rootDir>/src/test/mocks/$1',
    'src/test/(.*)': '<rootDir>/src/test/$1',
  },
};

const unitConfig: Config.InitialOptions = {
  ...config,
  displayName: 'unit',
  testRegex: '.*\\.spec\\.ts$',
};

const e2eConfig: Config.InitialOptions = {
  ...config,
  displayName: 'e2e',
  testRegex: '.*\\.e2e-spec\\.ts$',
};

export default {
  projects: [e2eConfig, unitConfig],
};
