import * as pulumi from '@pulumi/pulumi';

type ResourceMockConfig = {
  package: string;
  module: string;
  type: string;
  mockResponse: {id: string; state: Record<string, unknown>};
};

type CallMockConfig = {
  package: string;
  module: string;
  function: string;
  mockResponse: unknown;
};

type MockConfiguration = {
  resourceMocks?: ResourceMockConfig[];
  callMocks?: CallMockConfig[];
};

function resourceMockIsTypeOfArgs(
  resourceMock: ResourceMockConfig,
  args: pulumi.runtime.MockResourceArgs
): boolean {
  const resourceMockType =
    resourceMock.package + ':' + resourceMock.module + ':' + resourceMock.type;

  return resourceMockType === args.type;
}

function callMockIsTypeOfArgs(
  callMock: CallMockConfig,
  args: pulumi.runtime.MockCallArgs
): boolean {
  const callMockToken =
    callMock.package + ':' + callMock.module + ':' + callMock.function;

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
        resourceMockIsTypeOfArgs(rm, args)
      );

      return mockConfig?.mockResponse || defaultMockResourceResult;
    },
    call: (
      args: pulumi.runtime.MockCallArgs
    ): pulumi.runtime.MockCallResult => {
      const mockConfig = config.callMocks?.find(cm =>
        callMockIsTypeOfArgs(cm, args)
      );

      return mockConfig?.mockResponse || args.inputs;
    },
  });
}
