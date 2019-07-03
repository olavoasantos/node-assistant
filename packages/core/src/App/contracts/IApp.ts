import { IModule, tModules, tTools } from '.';

interface IApp {
  config: any;
  modules: tModules;
  tools: tTools;
  toolbox(): tTools;
  use(module: IModule): void;
}

export default IApp;
