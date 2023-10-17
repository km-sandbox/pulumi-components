import * as k8s from '@pulumi/kubernetes';
import axios, {AxiosResponse} from 'axios';

import {AbstractKubernetesManifest} from './AbstractKubernetesManifest';
import {KubernetesManifestFromURLConfig} from './interfaces';

export class KubernetesManifestFromURL extends AbstractKubernetesManifest {
  protected resource!: k8s.yaml.ConfigGroup;

  constructor(public config: KubernetesManifestFromURLConfig) {
    super(config);
    this.fetchAndApplyYAML();
  }

  private async fetchAndApplyYAML(): Promise<void> {
    try {
      const yamlData = await this.fetchYAMLFromURL(this.config.yamlURL!);
      this.resource = this.applyYAML(yamlData);
    } catch (error) {
      console.error('Failed to fetch YAML: ', error);
    }
  }

  private async fetchYAMLFromURL(url: string): Promise<string> {
    const response: AxiosResponse = await axios.get(url);
    return response.data;
  }
}
