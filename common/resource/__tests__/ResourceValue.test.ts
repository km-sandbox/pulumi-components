import {describe, test, expect} from 'vitest';
import {Output} from '@pulumi/pulumi';

import {DeferredResourceValue, DirectResourceValue} from '../ResourceValue';
import {ExpectDeferredResourceValue} from '../../../__tests__/ExpectedDeferredResourceValue';

describe('Testing DirectResourceValue', () => {
  const testCases = [
    {value: 12, expected: 12},
    {value: 'test', expected: 'test'},
    {value: true, expected: true},
  ];

  testCases.forEach(tc => {
    test(`Should return ${tc.expected} when get is called`, async () => {
      const directVal = new DirectResourceValue(tc.value);

      expect(await directVal.get()).toBe(tc.expected);
    });
  });
});

describe('Testing DeferredResourceValue', () => {
  const testCases = [
    {name: 'Number Output Test', value: 12, type: 'number'},
    {name: 'String Output Test', value: 'test', type: 'string'},
    {name: 'Boolean Output Test', value: true, type: 'boolean'},
  ];

  testCases.forEach(({name, value, type}) => {
    test.concurrent(name, async () => {
      let deferredValue: DeferredResourceValue<unknown>;

      switch (type) {
        case 'number': {
          const outputValue = Output.create(value as number);
          deferredValue = new DeferredResourceValue<number>(outputValue);

          expect(deferredValue.get()).toEqual(outputValue);
          new ExpectDeferredResourceValue(deferredValue).toEqual(value);
          break;
        }
        case 'string': {
          const outputValue = Output.create(value as string);
          deferredValue = new DeferredResourceValue<string>(outputValue);

          expect(deferredValue.get()).toEqual(outputValue);
          new ExpectDeferredResourceValue(deferredValue).toEqual(value);
          break;
        }
        case 'boolean': {
          const outputValue = Output.create(value as boolean);
          deferredValue = new DeferredResourceValue<boolean>(outputValue);

          expect(deferredValue.get()).toEqual(outputValue);
          new ExpectDeferredResourceValue(deferredValue).toEqual(value);
          break;
        }
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
  });
});
