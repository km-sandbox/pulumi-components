import * as pulumi from '@pulumi/pulumi';

type ResourceMockConfig = {
  provider: string;
  type: string;
  mockResponse: {id: string; state: Record<string, unknown>};
};

type CallMockConfig = {
  provider: string;
  token: string;
  mockResponse: unknown;
};

type MockConfiguration = {
  resourceMocks?: ResourceMockConfig[];
  callMocks?: CallMockConfig[];
};

export function setResourceMocks(config: MockConfiguration = {}): void {
  pulumi.runtime.setMocks({
    newResource: (
      args: pulumi.runtime.MockResourceArgs
    ): pulumi.runtime.MockResourceResult => {
      const mockConfig = config.resourceMocks?.find(
        rm => rm.provider + ':' + rm.type === args.type
      );
      return (
        mockConfig?.mockResponse || {id: `${args.name}-id`, state: args.inputs}
      );
    },
    call: (
      args: pulumi.runtime.MockCallArgs
    ): pulumi.runtime.MockCallResult => {
      const mockConfig = config.callMocks?.find(
        cm => cm.provider + ':' + cm.token === args.token
      );
      return mockConfig?.mockResponse || args.inputs;
    },
  });
}
