export interface KubernetesClusterConfig {
  readonly project: string;
  readonly name: string;
  readonly environment: string;
  readonly location: string;
  readonly releaseChannel: string;
  readonly autopilot: boolean;
}
