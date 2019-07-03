import ArgsModule from '@node-assistant/args';
import CommandModule, { ICommand } from '@node-assistant/command';
import { tDefinitions } from '@node-assistant/config';
import ConsoleModule from '@node-assistant/console';
import App from '@node-assistant/core';
import PathsModule from '@node-assistant/paths';
import IAssistant from './contracts/IAssistant';

class Assistant extends App implements IAssistant {
  constructor(config: tDefinitions = {}) {
    super(config);
    this.use(ArgsModule);
    this.use(CommandModule);
    this.use(PathsModule);
    this.use(ConsoleModule);
    // this.use(TemplateModule);
  }

  public commands() {
    return this.modules.commands.list;
  }

  public define(...commands: ICommand[]) {
    this.modules.commands.define(...commands);
    return this;
  }

  public run() {
    const toolbox = this.toolbox();
    const config = this.config.all();
    const { commands } = this.modules;

    const command = commands.get(toolbox.command);

    (async () => await command.run({ ...toolbox, config }))();
  }
}

export default Assistant;
