export interface KubernetesConfig {
  readonly releaseChannel: string;
  readonly autopilot: boolean;
}

export interface ProviderConfig {
  readonly project: string;
  readonly location: string;
  readonly kubernetes: KubernetesConfig;
}
