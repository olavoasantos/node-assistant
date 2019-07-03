import { IApp, IModule } from '@node-assistant/core';
import Paths from '../Paths';

const Module: IModule = {
  name: 'paths',
  install(app: IApp) {
    return new Paths(app.config.get('paths'));
  },
  toolbox(app: IApp) {
    return {
      paths: app.modules.paths.list,
    };
  },
};

export default Module;
