export interface KubernetesManifestConfig {
  readonly project: string;
  readonly name: string;
  readonly environment: string;
  readonly location: string;

  readonly clusterName: string;
  readonly kubeConfig: string;
}
