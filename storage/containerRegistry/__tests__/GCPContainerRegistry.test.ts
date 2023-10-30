import {describe, test, expect, beforeAll} from 'vitest';

import {GCPContainerRegistry} from '../GCPContainerRegistry';
import {ContainerRegistryConfig} from '../interfaces';
import {setResourceMocks} from '../../../__tests__/ResourceMock';

interface TestCase {
  name: string;
  config: ContainerRegistryConfig;
  expectedName: string;
}

const defaultConfig: ContainerRegistryConfig = {
  project: 'spam',
  name: 'foo',
  environment: 'prod',
  location: 'useast1',
};

const defaultTestCase: TestCase = {
  name: '',
  config: defaultConfig,
  expectedName: 'foo-cr',
};

const mockConfig = {
  resourceMocks: [
    {
      package: 'google-native',
      module: 'artifactregistry/v1beta2',
      type: 'Repository',
      mockResponse: {
        id: 'my-repo-id',
        state: {
          repositoryId: 'my-repo',
        },
      },
    },
  ],
};

describe('GCPContainerRegistry Constructor', () => {
  beforeAll(() => {
    setResourceMocks(mockConfig);
  });

  const testCases: TestCase[] = [
    {
      ...defaultTestCase,
      name: 'should construct GCPContainerRegistry correctly',
    },
  ];

  testCases.forEach(({name, config, expectedName}) => {
    test.concurrent(name, async () => {
      const registry = new GCPContainerRegistry(config);
      const actualName = await registry.name;

      expect(actualName).toEqual(expectedName);
    });
  });
});
