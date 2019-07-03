import { ICommand, tCommandList } from '@node-assistant/command/dist';
import { IApp } from '@node-assistant/core/dist';

interface IAssistant extends IApp {
  commands: () => tCommandList;
  define(...commands: ICommand[]): this;
  run(): void;
}

export default IAssistant;
