import { IModule } from '@node-assistant/core';
import colorize from './colorize';
import echo from './echo';

const Module: IModule = {
  name: 'console',
  toolbox() {
    return { colorize, echo };
  },
};

export default Module;
