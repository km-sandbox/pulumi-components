import * as k8s from '@pulumi/kubernetes';
import axios, {AxiosResponse} from 'axios';

import {AbstractKubernetesManifest} from './AbstractKubernetesManifest';
import {KubernetesManifestFromURLConfig} from './interfaces';

export class KubernetesManifestFromURL extends AbstractKubernetesManifest {
  protected resource!: k8s.yaml.ConfigGroup;

  constructor(public config: KubernetesManifestFromURLConfig) {
    super(config);

    axios
      .get(this.config.yamlURL!)
      .then((yamlData: AxiosResponse) => {
        this.resource = this.applyYAML(yamlData.data);
      })
      .catch((error: Error) => {
        console.error('Failed to fetch YAML: ', error);
      });
  }
}
