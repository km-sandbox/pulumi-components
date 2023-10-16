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

  protected applyYAML(yamlData: string): k8s.yaml.ConfigGroup {
    return new k8s.yaml.ConfigGroup(
      `${this.config.name}-${this.nameSuffix}`,
      {yaml: yamlData},
      {provider: this.provider}
    );
  }
}
