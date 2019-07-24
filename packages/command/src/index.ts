import { IModule } from '@node-assistant/core';
import Commands from './Commands';

const Module: IModule = {
  name: 'commands',
  install() {
    return new Commands();
  },
};

export default Module;
export { ICommand, ICommandModule, tCommandList } from './Commands/contracts';
