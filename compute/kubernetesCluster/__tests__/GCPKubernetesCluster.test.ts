import {ReleaseChannelChannel} from '@pulumi/google-native/container/v1beta1';
import {describe, test, expect} from 'vitest';

import {setResourceMocks} from '../../../__tests__/ResourceMock';
import {GCPKubernetesCluster} from '../GCPKubernetesCluster';
import {KubernetesClusterConfig} from '../interfaces';

interface TestCase {
  name?: string;
  config: KubernetesClusterConfig;
  expectedParent: string;
  expectedLabels: Record<string, string>;
  expectedName: string;
  expectedKubeConfig: string;
}

const defaultTestCase: TestCase = {
  config: {
    environment: 'prod',
    project: 'spam',
    location: 'useast1',
    name: 'foo',
    releaseChannel: ReleaseChannelChannel.Regular,
    autopilot: false,
  },
  expectedParent: 'projects/prod/locations/useast1',
  expectedLabels: {app: 'foo', env: 'prod'},
  expectedName: 'foo-cluster',
  expectedKubeConfig: 'someExpectedKubeConfig',
};

describe('GCPKubernetesCluster', () => {
  const testCases: TestCase[] = [
    {
      name: 'With All Settings and RAPID channel',
      ...defaultTestCase,
      config: {
        ...defaultTestCase.config,
        releaseChannel: ReleaseChannelChannel.Rapid,
      },
    },
    {
      name: 'With All Settings and REGULAR channel',
      ...defaultTestCase,
      config: {
        ...defaultTestCase.config,
        releaseChannel: ReleaseChannelChannel.Regular,
      },
    },
    {
      name: 'With All Settings but Autopilot Disabled',
      ...defaultTestCase,
      config: {
        ...defaultTestCase.config,
        autopilot: false,
      },
    },
  ];

  testCases.forEach(
    ({
      name,
      config,
      expectedParent,
      expectedLabels,
      expectedName,
      expectedKubeConfig,
    }) => {
      test.concurrent(
        `should correctly initialize cluster: ${name}`,
        async () => {
          setResourceMocks({
            resourceMocks: [
              {
                package: 'google-native',
                module: 'container/v1beta1',
                type: 'Cluster',
                mockResponse: {
                  id: `${config.name}-id`,
                  state: {
                    name: `${config.name}-cluster`,
                    kubeconfig: expectedKubeConfig,
                    location: config.location,
                    project: config.project,
                    releaseChannel: {
                      channel: config.releaseChannel,
                    },
                    autopilot: {
                      enabled: config.autopilot,
                    },
                    resourceLabels: {
                      app: config.name,
                      env: config.environment,
                    },
                  },
                },
              },
            ],
          });

          const cluster = new GCPKubernetesCluster(config);

          const actualParent = cluster['buildParentResource'](config);
          const actualLabels = cluster['buildResourceLabels'](config);
          const actualName = await cluster.name;
          // const actualKubeConfig = await cluster.getKubeConfig();

          expect(actualParent).toEqual(expectedParent);
          expect(actualLabels).toEqual(expectedLabels);
          expect(actualName).toEqual(expectedName);
          // expect(actualKubeConfig).toEqual(expectedKubeConfig);
        }
      );
    }
  );
});
