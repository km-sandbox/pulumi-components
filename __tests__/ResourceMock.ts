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

function resourceMockIsEqualToArgs(
  resourceMock: ResourceMockConfig,
  args: pulumi.runtime.MockResourceArgs
): boolean {
  const resourceMockType = resourceMock.provider + ':' + resourceMock.type;

  return resourceMockType === args.type;
}

function callMockIsEqualToArgs(
  callMock: CallMockConfig,
  args: pulumi.runtime.MockCallArgs
): boolean {
  const callMockToken = callMock.provider + ':' + callMock.token;

  return callMockToken === args.token;
}

export function setResourceMocks(config: MockConfiguration = {}): void {
  pulumi.runtime.setMocks({
    newResource: (
      args: pulumi.runtime.MockResourceArgs
    ): pulumi.runtime.MockResourceResult => {
      const defaultMockResourceResult = {
        id: `${args.name}-id`,
        state: args.inputs,
      };

      const mockConfig = config.resourceMocks?.find(rm =>
        resourceMockIsEqualToArgs(rm, args)
      );

      return mockConfig?.mockResponse || defaultMockResourceResult;
    },
    call: (
      args: pulumi.runtime.MockCallArgs
    ): pulumi.runtime.MockCallResult => {
      const mockConfig = config.callMocks?.find(cm =>
        callMockIsEqualToArgs(cm, args)
      );

      return mockConfig?.mockResponse || args.inputs;
    },
  });
}
