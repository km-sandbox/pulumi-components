import * as k8s from '@pulumi/kubernetes';

import {AbstractKubernetesManifest} from './AbstractKubernetesManifest';
import {KubernetesManifestFromRawConfig} from './interfaces';

export class KubernetesManifestFromRaw extends AbstractKubernetesManifest {
  protected resource: k8s.yaml.ConfigGroup;

  constructor(public config: KubernetesManifestFromRawConfig) {
    super(config);
    this.resource = this.applyYAML(this.config.rawYAML);
  }
}
