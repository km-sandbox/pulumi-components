import {AbstractResource} from '../../common/resource';

export abstract class AbstractContainerRegistry extends AbstractResource {
  protected readonly nameSuffix = 'cr';
}
