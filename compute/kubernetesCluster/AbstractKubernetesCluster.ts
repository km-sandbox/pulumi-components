import {AbstractResource} from '../../common/resource';

export abstract class AbstractKubernetesCluster extends AbstractResource {
  protected nameSuffix = 'cluster';

  public abstract getKubeConfig(): Promise<string>;
}
