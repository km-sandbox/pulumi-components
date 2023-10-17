import * as k8s from '@pulumi/kubernetes';

export interface KubernetesManifestConfig {
  readonly project: string;
  readonly name: string;
  readonly environment: string;
  readonly location: string;

  readonly provider: k8s.Provider;
  readonly clusterName: string;
  readonly kubeConfig: string;
}
