export interface KubernetesConfig {
  releaseChannel: string;
  autopilot: boolean;
}

export interface ProviderConfig {
  project: string;
  location: string;
  kubernetes: KubernetesConfig;
}
