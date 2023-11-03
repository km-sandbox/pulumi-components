import {describe, test, expect} from 'vitest';
import {Output} from '@pulumi/pulumi';

import {DeferredResourceValue, DirectResourceValue} from '../ResourceValue';

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
      let deferredVal: DeferredResourceValue<unknown>;

      switch (type) {
        case 'number': {
          const outputValue = Output.create(value as number);
          deferredVal = new DeferredResourceValue<number>(outputValue);

          expect(deferredVal.get()).toEqual(outputValue);
          break;
        }
        case 'string': {
          const outputValue = Output.create(value as string);
          deferredVal = new DeferredResourceValue<string>(outputValue);

          expect(deferredVal.get()).toEqual(outputValue);
          break;
        }
        case 'boolean': {
          const outputValue = Output.create(value as boolean);
          deferredVal = new DeferredResourceValue<boolean>(outputValue);

          expect(deferredVal.get()).toEqual(outputValue);
          break;
        }
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
  });
});
