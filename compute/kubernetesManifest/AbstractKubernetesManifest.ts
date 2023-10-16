import * as k8s from '@pulumi/kubernetes';

import {AbstractResource} from '../../common/resource';
import {KubernetesManifestConfig} from './interfaces';

export abstract class AbstractKubernetesManifest extends AbstractResource {
  protected readonly nameSuffix = 'manifest';
  protected readonly config: KubernetesManifestConfig;
  protected readonly provider: k8s.Provider;

  constructor(config: KubernetesManifestConfig) {
    super();
    this.config = config;
    this.provider = new k8s.Provider(config.clusterName, {
      kubeconfig: config.kubeConfig,
    });
  }

  public get name(): Promise<string> {
    return new Promise(resolve => {
      resolve(this.getFullName(this.config.name));
    });
  }

  protected applyYAML(yamlData: string): k8s.yaml.ConfigGroup {
    const name = this.getFullName(this.config.name);

    return new k8s.yaml.ConfigGroup(
      name,
      {yaml: yamlData},
      {provider: this.provider}
    );
  }
}
