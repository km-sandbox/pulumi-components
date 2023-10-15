import {ProviderConfig} from './interfaces';

export type EnvConfig = Record<string, ProviderConfig>;
export type EnvConfigMap = Record<string, EnvConfig>;

const DevConfig: EnvConfig = {
  gcp: {
    project: 'km-sandbox1',
    location: 'us-east1',
    kubernetes: {
      releaseChannel: 'REGULAR',
    },
  },
};

export const AllEnvConfigMap: EnvConfigMap = {
  dev: DevConfig,
};
