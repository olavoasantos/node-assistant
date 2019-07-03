import ICommand from './ICommand';

export { default as IFlag } from './IFlag';
export { default as IOption } from './IOption';
export { default as ICommand } from './ICommand';
export { default as ICommandModule } from './ICommandModule';
export type tCommandList = { [key: string]: ICommand };
