import {AbstractResource} from '../../common/resource';

export abstract class AbstractKubernetesCluster extends AbstractResource {
  readonly nameSuffix: string = 'cluster';
}
