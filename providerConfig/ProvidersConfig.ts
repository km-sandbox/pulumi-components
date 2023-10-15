import {ProviderConfig} from './interfaces';

export type EnvProviderConfig = Record<string, ProviderConfig>;
export type EnvProviderConfigMap = Record<string, EnvProviderConfig>;

const DevProviderConfig: EnvProviderConfig = {
  gcp: {
    project: 'km-sandbox1',
    location: 'us-east1',
    kubernetes: {
      releaseChannel: 'REGULAR',
      autopilot: true,
    },
  },
};

export const AllEnvProviderConfigMap: EnvProviderConfigMap = {
  dev: DevProviderConfig,
};
