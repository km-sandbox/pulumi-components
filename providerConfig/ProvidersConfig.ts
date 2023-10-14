import {ProviderConfig} from './interfaces';

type ProvidersConfig = Record<string, ProviderConfig>;

const DevProvidersConfig: ProvidersConfig = {
  gcp: {
    project: 'km-sandbox1',
    location: 'us-east1',
    kubernetes: {
      releaseChannel: 'REGULAR',
    },
  },
};

export const EnvProvidersConfig: Record<string, ProvidersConfig> = {
  dev: DevProvidersConfig,
};
