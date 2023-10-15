import * as k8s from '@pulumi/kubernetes';

import {ResourceBase} from '../../common/resource';
import {KubernetesManifestConfig} from './interfaces';

export class KubernetesManifestBase extends ResourceBase {
  readonly nameSuffix: string = 'manifest';
  protected manifestConfig: KubernetesManifestConfig;
  protected k8sProvider: k8s.Provider;

  constructor(
    manifestConfig: KubernetesManifestConfig,
    k8sProvider: k8s.Provider
  ) {
    super();
    this.manifestConfig = manifestConfig;
    this.k8sProvider = k8sProvider;
  }

  protected applyYAML(yamlData: string) {
    return new k8s.yaml.ConfigGroup(
      `${this.manifestConfig.name}-${this.nameSuffix}`,
      {
        yaml: yamlData,
      },
      {provider: this.k8sProvider}
    );
  }
}
