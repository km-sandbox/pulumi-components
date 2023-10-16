import * as k8s from '@pulumi/kubernetes';

import {AbstractResource} from '../../common/resource';
import {KubernetesManifestConfig} from './interfaces';

export abstract class AbstractKubernetesManifest extends AbstractResource {
  readonly nameSuffix: string = 'manifest';
  protected config: KubernetesManifestConfig;
  abstract resource: k8s.yaml.ConfigGroup;

  constructor(config: KubernetesManifestConfig) {
    super();
    this.config = config;
  }

  protected applyYAML(yamlData: string): k8s.yaml.ConfigGroup {
    return new k8s.yaml.ConfigGroup(
      `${this.config.name}-${this.nameSuffix}`,
      {yaml: yamlData},
      {provider: this.config.k8sProvider}
    );
  }
}
