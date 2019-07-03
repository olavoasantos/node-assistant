import path from 'path';
import { IPaths, tPathFetcherList, tPathsConfig } from './contracts';
import { pathFetcher } from './helpers';

class Paths implements IPaths {
  public config: tPathsConfig;
  public list: tPathFetcherList;

  constructor(config: tPathsConfig = {}) {
    this.config = { ...this.defaultConfig(), ...config };

    this.list = Object.keys(this.config).reduce((list: tPathFetcherList, name: string) => {
      list[name] = pathFetcher(this.config[name]);
      return list;
    }, {});
  }

  private defaultConfig() {
    return {
      cwd: process.cwd(),
      root: path.dirname(process.argv[1]),
    };
  }
}

export default Paths;
