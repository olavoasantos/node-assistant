import IApp from './IApp';

interface IModule {
  name: string;
  install?: (app: IApp) => any;
  toolbox?: (app: IApp) => { [key: string]: any };
}

export default IModule;
