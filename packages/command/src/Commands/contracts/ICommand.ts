import { IFlag, IOption } from '.';

interface ICommand {
  name: string;
  description: string;
  command: string;
  options: IOption[];
  flags: IFlag[];
  run(options: { [key: string]: any }): void;
}

export default ICommand;
