import {ResourceBase} from '../../common/resource';

export class KubernetesClusterBase extends ResourceBase {
  readonly nameSuffix: string = 'cluster';
}
