import Config, { IConfig, tDefinitions } from '@node-assistant/config';
import { IApp, IModule, tModules, tTools } from './contracts';

class App implements IApp {
  public config: IConfig;
  public modules: tModules;
  public tools: tTools;

  constructor(defaultConfig: tDefinitions = {}) {
    this.tools = {};
    this.modules = {};
    this.config = new Config(defaultConfig);
  }

  public toolbox() {
    return { ...this.tools };
  }

  public use(mod: IModule) {
    if (mod.install !== undefined) {
      this.modules[mod.name] = mod.install(this);
    }
    if (mod.toolbox !== undefined) {
      this.tools = { ...this.tools, ...mod.toolbox(this) };
    }

    return this;
  }
}

export default App;
