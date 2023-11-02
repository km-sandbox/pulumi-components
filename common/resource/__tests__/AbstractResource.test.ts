import {describe, test, expect, beforeEach} from 'vitest';

import {AbstractResource, ResourceValue} from '../../common/resource';
import {Output, output} from '@pulumi/pulumi';

class TestableAbstractResource extends AbstractResource {
  get name(): ResourceValue<string> {
    return new ResourceValue('mockName');
  }

  public getFullName(name: string): string {
    return super.getFullName(name);
  }

  public _promiseOf<T>(
    property: string,
    resourceOutput: Output<T>
  ): Promise<T> {
    return super.promiseOf(property, resourceOutput);
  }
}

describe('AbstractResource', () => {
  let abstractResource: TestableAbstractResource;

  beforeEach(() => {
    abstractResource = new TestableAbstractResource();
  });

  describe('getFullName', () => {
    const testCases = [{baseName: 'baseName', expected: 'baseName-suffix'}];

    test.each(testCases)(
      'should generate a full name with suffix',
      ({baseName, expected}) => {
        const fullName = abstractResource.getFullName(baseName);
        expect(fullName).toBe(expected);
      }
    );
  });

  describe('promiseOf', () => {
    const testCases = [
      {
        property: 'testProperty',
        outputValue: 'mockValue',
        expected: 'mockValue',
      },
      {
        property: 'testProperty',
        outputValue: '',
        expected: 'mockValue',
      },
    ];

    test.each(testCases)(
      'should resolve resource output property',
      async ({property, outputValue, expected}) => {
        const mockOutput: Output<string> = output(outputValue);

        try {
          const resolvedValue = await abstractResource._promiseOf(
            property,
            mockOutput
          );

          expect(resolvedValue).toBe(expected);
        } catch (error) {
          expect((error as Error).message).toBe(`${property} is undefined.`);
        }
      }
    );
  });

  describe('name getter', () => {
    test('should resolve name as mockName', async () => {
      const name = await abstractResource.name;
      expect(name).toBe('mockName');
    });
  });
});
