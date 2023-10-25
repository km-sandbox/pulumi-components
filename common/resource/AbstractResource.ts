import {Output} from '@pulumi/pulumi';

export abstract class AbstractResource {
  protected nameSuffix = 'suffix';

  protected getFullName(name: string): string {
    return `${name}-${this.nameSuffix}`;
  }

  abstract get name(): Promise<string>;

  protected promiseOf<T>(
    property: string,
    resourceOutput: Output<T>
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      resourceOutput.apply((value: T) => {
        if (value) {
          resolve(value);
        } else {
          reject(new Error(`${property} is undefined.`));
        }
      });
    });
  }
}
