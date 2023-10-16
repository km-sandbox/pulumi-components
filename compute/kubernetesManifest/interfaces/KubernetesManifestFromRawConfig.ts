import {KubernetesManifestConfig} from './KubernetesManifestConfig';

export interface KubernetesManifestFromRawConfig
  extends KubernetesManifestConfig {
  readonly rawYAML: string;
}
