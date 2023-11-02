import {Output} from '@pulumi/pulumi';

export abstract class ResourceValue<T> {
  protected constructor(protected value: T | Output<T>) {}

  abstract get(): Promise<T> | Output<T>;
}

export class DirectResourceValue<T> extends ResourceValue<T> {
  constructor(value: T) {
    super(value);
  }

  get(): Promise<T> {
    return Promise.resolve(this.value as T);
  }
}

export class DeferredResourceValue<T> extends ResourceValue<T> {
  constructor(value: Output<T>) {
    super(value);
  }

  get(): Output<T> {
    return this.value as Output<T>;
  }
}
