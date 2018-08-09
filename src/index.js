const help = require('./help');
const commands = require('./commands');
const parseArgs = require('./parseArgs');

class Cli {
  constructor() {
    this.flags = {};
    this.options = [];
    this.command = [];
    this.commands = {};
  }

  init() {
    this.getArgs();
    this.initCommands(commands);

    return this;
  }

  getArgs() {
    const { command, options, flags } = parseArgs();
    this.command = command;
    this.options = options;
    this.flags = flags;
  }

  register(Command) {
    if (!Command.COMMAND) {
      throw new Error(`Command ${Command.constructor.name} did not define a COMMAND static variable`);
    }
    this.commands[Command.COMMAND] = {
      command: Command.COMMAND,
      description: Command.DESCRIPTION,
      handle: new Command(this.options, this.flags),
    };
  }

  initCommands(list) {
    list.forEach(Command => this.register(Command));
  }

  registerCommands(list) {
    if (!Array.isArray(list)) {
      throw new Error('Command list is not an Array');
    }

    this.initCommands(list);

    return this;
  }

  exec() {
    if (!this.command) {
      help(this.commands);
      return;
    }

    const command = this.commands[this.command];
    if (!command) {
      throw new Error(`Command ${this.command} not found`);
    }

    command.handle.run();
  }
}

module.exports = Cli;
