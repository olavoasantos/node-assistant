/* eslint-disable no-console */
const Console = require('../console');

class BaseCommand {
  constructor(options, flags) {
    this.flags = flags;
    this.options = options;
  }

  get info() {
    return this.constructor.info;
  }

  get error() {
    return this.constructor.error;
  }

  get echo() {
    return this.constructor.echo;
  }

  get warning() {
    return this.constructor.warning;
  }
}

BaseCommand.COMMAND = null;
BaseCommand.DESCRIPTION = null;

BaseCommand.info = Console.info;
BaseCommand.echo = Console.echo;
BaseCommand.error = Console.error;
BaseCommand.warning = Console.warning;

module.exports = BaseCommand;
