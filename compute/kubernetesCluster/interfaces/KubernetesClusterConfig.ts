export interface KubernetesClusterConfig {
  project: string;
  name: string;
  environment: string;
  location: string;
  releaseChannel: string;
  autopilot: boolean;
}
