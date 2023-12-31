import {AbstractResource, ResourceValue} from '../../common/resource';

export abstract class AbstractKubernetesCluster extends AbstractResource {
  protected readonly nameSuffix = 'cluster';

  public abstract get kubeConfig(): ResourceValue<string>;
}
