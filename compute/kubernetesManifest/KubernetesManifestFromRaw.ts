import {KubernetesManifestBase} from './KubernetesManifestBase';

export class KubernetesManifestFromRaw extends KubernetesManifestBase {
  deploy() {
    this.applyYAML(this.manifestConfig.rawYAML!);
  }
}
