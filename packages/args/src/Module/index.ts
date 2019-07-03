import { IApp, IModule } from '@node-assistant/core';
import parse from '../parse';

const Module: IModule = {
  name: 'args',
  install() {
    return { parse };
  },
  toolbox(app: IApp) {
    const { flags, options } = app.modules.args.parse(process.argv);
    const command = options.shift();

    return { command, flags, options };
  },
};

export default Module;
