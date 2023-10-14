export interface KubernetesConfig {
  releaseChannel: string;
}

export interface ProviderConfig {
  project: string;
  location: string;
  kubernetes: KubernetesConfig;
}
