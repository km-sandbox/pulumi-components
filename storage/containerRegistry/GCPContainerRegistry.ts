import {Repository} from '@pulumi/google-native/artifactregistry/v1beta2';

import {DeferredResourceValue} from '../../common/resource';
import {ContainerRegistryConfig} from './interfaces';
import {AbstractContainerRegistry} from './AbstractContainerRegistry';

export class GCPContainerRegistry extends AbstractContainerRegistry {
  protected resource: Repository;

  constructor(config: ContainerRegistryConfig) {
    super();
    this.resource = this.createRepositoryResource(config);
  }

  private createRepositoryResource(
    config: ContainerRegistryConfig
  ): Repository {
    const fullName = this.getFullName(config.name);
    return new Repository(fullName, {
      repositoryId: fullName,
      project: config.project,
      location: config.location,
      format: 'DOCKER',
      labels: this.buildLabels(config),
    });
  }

  private buildLabels(config: ContainerRegistryConfig): Record<string, string> {
    return {
      app: config.name,
      env: config.environment,
    };
  }

  public get name(): DeferredResourceValue<string> {
    return new DeferredResourceValue(this.resource.name);
  }
}
