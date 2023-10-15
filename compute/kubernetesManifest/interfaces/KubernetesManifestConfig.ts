export interface KubernetesManifestConfig {
  project: string;
  name: string;
  environment: string;
  location: string;
  yamlURL?: string;
  rawYAML?: string;
}
