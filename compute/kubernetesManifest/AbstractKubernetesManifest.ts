import * as k8s from '@pulumi/kubernetes';

import {
  AbstractResource,
  ResourceValue,
  DirectResourceValue,
} from '../../common/resource';
import {KubernetesManifestConfig} from './interfaces';
import {} from '../../common/resource/ResourceValue';

export abstract class AbstractKubernetesManifest extends AbstractResource {
  protected readonly nameSuffix = 'manifest';
  protected readonly config: KubernetesManifestConfig;
  private static providers: {[key: string]: k8s.Provider} = {};

  constructor(config: KubernetesManifestConfig) {
    super();
    this.config = config;
  }

  public get name(): ResourceValue<string> {
    const fullName = this.getFullName(this.config.name);
    return new DirectResourceValue(fullName);
  }

  private isProviderExists(key: string): boolean {
    return Boolean(AbstractKubernetesManifest.providers[key]);
  }

  private getExistingProvider(key: string): k8s.Provider {
    return AbstractKubernetesManifest.providers[key];
  }

  private createAndStoreProvider(
    key: string,
    kubeConfig: string
  ): k8s.Provider {
    const provider = new k8s.Provider(key, {kubeconfig: kubeConfig});
    provider.getProvider;
    AbstractKubernetesManifest.providers[key] = provider;
    return provider;
  }

  protected getProviderAndCreateItIfNotExists(): k8s.Provider {
    const key = this.config.clusterName;

    if (this.isProviderExists(key)) {
      return this.getExistingProvider(key);
    }

    return this.createAndStoreProvider(key, this.config.kubeConfig);
  }

  protected applyYAML(yamlData: string): k8s.yaml.ConfigGroup {
    const name = this.getFullName(this.config.name);

    return new k8s.yaml.ConfigGroup(
      name,
      {yaml: yamlData},
      {provider: this.getProviderAndCreateItIfNotExists()}
    );
  }
}
