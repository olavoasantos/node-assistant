import { ICommand, tCommandList } from '../contracts';

interface ICommandModule {
  list: tCommandList;
  define(...command: ICommand[]): void;
  has(command: string): boolean;
  get(command: string): ICommand;
}

export default ICommandModule;
