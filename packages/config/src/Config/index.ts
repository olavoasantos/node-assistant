import { IConfig, tDefinitions } from './contracts';

class Config implements IConfig {
  public definitions: tDefinitions;

  constructor(defaultValues: tDefinitions = {}) {
    this.definitions = defaultValues;
  }

  public all() {
    return { ...this.definitions };
  }

  public get(key: string) {
    return this.definitions[key];
  }

  public set(key: string, value: any) {
    this.definitions[key] = value;
  }

  public merge(key: string, value: any) {
    if (!Object.keys(this.definitions).includes(key)) {
      this.set(key, value);
    }

    const definition: any = this.definitions[key];

    if (Array.isArray(definition)) {
      this.set(key, [...definition, ...value]);
    }

    if (typeof definition === 'object' && definition !== null && !Array.isArray(definition)) {
      this.set(key, { ...definition, ...value });
    }
  }
}

export default Config;
