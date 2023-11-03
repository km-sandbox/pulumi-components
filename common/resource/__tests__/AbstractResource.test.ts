import {describe, test, expect, beforeEach} from 'vitest';

import {AbstractResource} from '../AbstractResource';
import {ResourceValue, DirectResourceValue} from '../ResourceValue';

class TestableAbstractResource extends AbstractResource {
  get name(): ResourceValue<string> {
    return new DirectResourceValue('mockName');
  }

  public getFullName(name: string): string {
    return super.getFullName(name);
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

  describe('name getter', () => {
    test('should resolve name as mockName', async () => {
      const name = await abstractResource.name.get();

      expect(name).toBe('mockName');
    });
  });
});
