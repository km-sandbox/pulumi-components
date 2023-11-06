import {ExpectOutput} from './ExpectOutput';
import {DeferredResourceValue} from '../common/resource';

export class ExpectDeferredResourceValue<T> extends ExpectOutput<T> {
  constructor(resource: DeferredResourceValue<T>) {
    const resourceOutput = resource.get();
    super(resourceOutput);
  }
}
