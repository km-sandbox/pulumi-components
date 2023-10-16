export abstract class AbstractResource {
  protected nameSuffix = 'suffix';

  protected getFullName(name: string): string {
    return `${name}-${this.nameSuffix}`;
  }

  abstract get name(): Promise<string>;
}
