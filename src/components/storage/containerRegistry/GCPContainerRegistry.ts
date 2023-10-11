import {Repository} from '@pulumi/google-native/artifactregistry/v1beta2';

import {ContainerRegistryConfig} from './interfaces';
import {ContainerRegistryBase} from './ContainerRegistryBase';

export class GCPContainerRegistry extends ContainerRegistryBase {
  public resource: Repository;

  constructor(config: ContainerRegistryConfig) {
    super();
    this.resource = new Repository(this.getFullName(config.name), {
      project: config.project,
      location: config.location,
      format: 'DOCKER',
      labels: {
        app: config.name,
        env: config.environment,
      },
    });
  }
}
