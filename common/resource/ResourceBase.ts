export class ResourceBase {
  protected nameSuffix = 'suffix';

  protected getFullName(name: string): string {
    return `${name}-${this.nameSuffix}`;
  }
}
