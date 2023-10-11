export interface Resource {
  nameSuffix: string;
  getFullName(name: string): string;
}
