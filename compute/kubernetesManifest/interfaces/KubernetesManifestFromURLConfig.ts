import {KubernetesManifestConfig} from './KubernetesManifestConfig';

export interface KubernetesManifestFromURLConfig
  extends KubernetesManifestConfig {
  yamlURL: string;
}
