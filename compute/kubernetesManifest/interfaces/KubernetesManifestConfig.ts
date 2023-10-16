import * as k8s from '@pulumi/kubernetes';

export interface KubernetesManifestConfig {
  project: string;
  name: string;
  environment: string;
  location: string;

  k8sProvider: k8s.Provider;
}
