import {KubernetesManifestConfig} from './KubernetesManifestConfig';

export interface KubernetesManifestFromRawConfig
  extends KubernetesManifestConfig {
  rawYAML: string;
}
