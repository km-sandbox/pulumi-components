import axios from 'axios';

import {KubernetesManifestBase} from './KubernetesManifestBase';

export class KubernetesManifestFromURL extends KubernetesManifestBase {
  async deploy() {
    const yamlData = await axios.get(this.manifestConfig.yamlURL!);
    this.applyYAML(yamlData.data);
  }
}
