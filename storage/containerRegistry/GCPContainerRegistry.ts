import {Repository} from '@pulumi/google-native/artifactregistry/v1beta2';

import {ContainerRegistryConfig} from './interfaces';
import {AbstractContainerRegistry} from './AbstractContainerRegistry';

export class GCPContainerRegistry extends AbstractContainerRegistry {
  protected resource: Repository;

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

  public get name(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.resource.name.apply((name: string) => {
        if (name) {
          resolve(name);
        } else {
          reject(new Error('Name is undefined.'));
        }
      });
    });
  }
}
