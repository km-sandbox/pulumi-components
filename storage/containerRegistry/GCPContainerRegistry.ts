import {Repository} from '@pulumi/google-native/artifactregistry/v1beta2';

import {ContainerRegistryConfig} from './interfaces';
import {AbstractContainerRegistry} from './AbstractContainerRegistry';

export class GCPContainerRegistry extends AbstractContainerRegistry {
  public resource: Repository;

  constructor(config: ContainerRegistryConfig) {
    super();

    const fullName = this.getFullName(config.name);
    this.resource = new Repository(fullName, {
      repositoryId: fullName,
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
