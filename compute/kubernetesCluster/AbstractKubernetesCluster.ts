import {AbstractResource} from '../../common/resource';

export abstract class AbstractKubernetesCluster extends AbstractResource {
  protected readonly nameSuffix = 'cluster';

  public abstract getKubeConfig(): Promise<string>;
}
