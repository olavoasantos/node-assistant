import { ICommand, ICommandModule, tCommandList } from './contracts';

class Commands implements ICommandModule {
  public list: tCommandList = {};

  public define(...commands: ICommand[]) {
    commands.forEach((command: ICommand) => {
      this.list[command.command] = command;
    });
  }

  public has(command: string) {
    return Object.keys(this.list).includes(command);
  }

  public get(command: string) {
    if (!this.has(command)) {
      throw new Error(`Command "${command}" does not exist.`);
    }

    return this.list[command];
  }
}

export default Commands;
