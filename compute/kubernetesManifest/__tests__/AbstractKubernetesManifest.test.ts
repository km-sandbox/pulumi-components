import {describe, test, expect, beforeAll} from 'vitest';
import * as k8s from '@pulumi/kubernetes';

import {setResourceMocks} from '../../../__tests__/ResourceMock';
import {AbstractKubernetesManifest} from '../AbstractKubernetesManifest';
import {KubernetesManifestConfig} from '../interfaces';

class TestableAbstractKubernetesManifest extends AbstractKubernetesManifest {
  constructor(config: KubernetesManifestConfig) {
    super(config);
  }

  public static _createAndStoreProvider(
    key: string,
    kubeConfig: string
  ): k8s.Provider {
    return AbstractKubernetesManifest.prototype['createAndStoreProvider'].call(
      this,
      key,
      kubeConfig
    );
  }

  public getProviderAndCreateItIfNotExists(): k8s.Provider {
    return super.getProviderAndCreateItIfNotExists();
  }

  public applyYAML(yamlData: string): k8s.yaml.ConfigGroup {
    return super.applyYAML(yamlData);
  }
}

interface Provider {
  clusterName: string;
  kubeConfig: string;
}

interface GetProviderTestCase {
  name: string;
  config: KubernetesManifestConfig;
  existingProviders: Provider[];
  expectedProvider: Provider;
}

const defaultKubernetesManifestConfig: KubernetesManifestConfig = {
  project: 'spam',
  name: 'foo',
  environment: 'prod',
  location: 'useast1',
  clusterName: 'cluster1',
  kubeConfig: 'someKubeConfig',
};

const mockConfig = {
  resourceMocks: [
    {
      package: 'kubernetes',
      module: 'yaml',
      type: 'ConfigGroup',
      mockResponse: {
        id: 'configmap-id',
        state: {},
      },
    },
    {
      package: 'kubernetes',
      module: 'providers',
      type: 'kubernetes',
      mockResponse: {
        id: 'provider-id',
        state: {
          kubeconfig: 'mocked-kubeconfig',
        },
      },
    },
  ],
};

describe('getProviderAndCreateItIfNotExists Method', () => {
  beforeAll(() => {
    setResourceMocks(mockConfig);
  });

  const testCases: GetProviderTestCase[] = [
    {
      name: 'Provider exists, should return existing provider',
      config: defaultKubernetesManifestConfig,
      existingProviders: [
        {
          clusterName: 'foo',
          kubeConfig: 'someKubeConfig',
        },
      ],
      expectedProvider: {
        clusterName: 'foo',
        kubeConfig: 'someKubeConfig',
      },
    },
    {
      name: 'Provider doesnt exists, should create and return new provider',
      config: defaultKubernetesManifestConfig,
      existingProviders: [],
      expectedProvider: {
        clusterName: 'foo',
        kubeConfig: 'someKubeConfig',
      },
    },
  ];

  testCases.forEach(
    async ({name, config, existingProviders, expectedProvider}) => {
      test.concurrent(name, async () => {
        existingProviders.forEach(({clusterName, kubeConfig}) => {
          TestableAbstractKubernetesManifest._createAndStoreProvider(
            clusterName,
            kubeConfig
          );
        });

        const kubernetesManifest = new TestableAbstractKubernetesManifest(
          config
        );
        const providerObject =
          await kubernetesManifest.getProviderAndCreateItIfNotExists();

        const provider: Provider = {
          clusterName: await providerObject.clusterName,
          kubeConfig: await providerObject.kubeconfig,
        };

        // expect(provider.clusterName).toEqual(expectedProvider.clusterName);
        expect(provider.kubeConfig).toEqual(expectedProvider.kubeConfig);
      });
    }
  );
});

// describe('applyYAML Method', () => {
//   const testCases: TestCase[] = [
//     {
//       name: 'Should apply YAML with correct arguments',
//       config: {
//         name: 'foo',
//         clusterName: 'cluster1',
//         kubeConfig: 'someConfig',
//       },
//       input: 'someYAMLData',
//       expected: {
//         name: 'foo-manifest',
//         yaml: 'someYAMLData',
//         provider: {name: 'cluster1', kubeconfig: 'someConfig'},
//       },
//     },
//   ];

//   testCases.forEach(({name, config, input, expected}) => {
//     test.concurrent(name, () => {
//       const manifest = new TestableAbstractKubernetesManifest(config);
//       const result = manifest['applyYAML'](input);
//       expect(result).toEqual(expected);
//     });
//   });
// });
