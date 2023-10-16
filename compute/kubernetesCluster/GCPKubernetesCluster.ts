import {
  Cluster,
  ReleaseChannelChannel,
} from '@pulumi/google-native/container/v1beta1';

import {KubernetesClusterConfig} from './interfaces';
import {AbstractKubernetesCluster} from './AbstractKubernetesCluster';

export class GCPKubernetesCluster extends AbstractKubernetesCluster {
  protected resource: Cluster;

  constructor(config: KubernetesClusterConfig) {
    super();
    this.resource = new Cluster(this.getFullName(config.name), {
      project: config.project,
      parent: `projects/${config.environment}/locations/${config.location}`,
      location: config.location,
      releaseChannel: {
        channel: config.releaseChannel as ReleaseChannelChannel,
      },
      autopilot: {enabled: config.autopilot},
      resourceLabels: {
        app: config.name,
        env: config.environment,
      },
    });
  }

  public async getKubeConfig(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.resource.getKubeconfig().apply(kubeconfig => {
        if (kubeconfig) {
          resolve(kubeconfig);
        } else {
          reject(new Error('Kubeconfig is undefined.'));
        }
      });
    });
  }
}