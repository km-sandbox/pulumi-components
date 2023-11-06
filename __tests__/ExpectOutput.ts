import {Output} from '@pulumi/pulumi';
import {expect} from 'vitest';

export class ExpectOutput<T> {
  private actualOutput: Output<T>;

  constructor(resourceOutput: Output<T>) {
    this.actualOutput = resourceOutput;
  }

  toEqual(expected: T) {
    this.actualOutput.apply(actual => {
      expect(actual).toEqual(expected);
    });
  }
}
