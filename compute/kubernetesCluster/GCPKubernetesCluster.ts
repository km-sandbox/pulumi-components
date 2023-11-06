import {
  Cluster,
  ReleaseChannelChannel,
} from '@pulumi/google-native/container/v1beta1';

import {DeferredResourceValue} from '../../common/resource';
import {KubernetesClusterConfig} from './interfaces';
import {AbstractKubernetesCluster} from './AbstractKubernetesCluster';

export class GCPKubernetesCluster extends AbstractKubernetesCluster {
  protected resource: Cluster;

  constructor(config: KubernetesClusterConfig) {
    super();
    this.resource = this.createClusterResource(config);
  }

  private createClusterResource(config: KubernetesClusterConfig): Cluster {
    const fullName = this.getFullName(config.name);
    const parentResource = this.buildParentResource(config);
    return new Cluster(fullName, {
      project: config.project,
      parent: parentResource,
      location: config.location,
      releaseChannel: {channel: config.releaseChannel as ReleaseChannelChannel},
      autopilot: {enabled: config.autopilot},
      resourceLabels: this.buildResourceLabels(config),
    });
  }

  private buildParentResource(config: KubernetesClusterConfig): string {
    return `projects/${config.environment}/locations/${config.location}`;
  }

  private buildResourceLabels(
    config: KubernetesClusterConfig
  ): Record<string, string> {
    return {
      app: config.name,
      env: config.environment,
    };
  }

  public get name(): DeferredResourceValue<string> {
    return new DeferredResourceValue(this.resource.name);
  }

  public get kubeConfig(): DeferredResourceValue<string> {
    return new DeferredResourceValue(this.resource.getKubeconfig());
  }
}
