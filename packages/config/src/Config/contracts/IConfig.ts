interface IConfig {
  definitions: { [key: string]: any };
  all(): { [key: string]: any };
  get(key: string): any;
  set(key: string, value: any): void;
  merge(key: string, value: any): void;
}

export default IConfig;
