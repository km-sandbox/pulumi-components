import {ExpectOutput} from './ExpectOutput';
import {DeferredResourceValue} from '../common/resource';

export class ExpectDeferredResourceValue<T> extends ExpectOutput<T> {
  constructor(resource: DeferredResourceValue<T>) {
    const actualOutput = resource.get();
    super(actualOutput);
  }
}
