import {KubernetesManifestConfig} from './KubernetesManifestConfig';

export interface KubernetesManifestFromURLConfig
  extends KubernetesManifestConfig {
  readonly yamlURL: string;
}
