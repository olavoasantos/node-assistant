/* eslint-disable class-methods-use-this */
const File = require('../file');
const Console = require('../console');
const help = require('../help').command;

class BaseCommand {
  constructor(options, flags) {
    this.$flags = flags;
    this.$options = options;
    this.$init();
  }

  $init() {
    this.$parseArgs();
  }

  $parseArgs() {
    this.$parseOptions();
    this.$parseFlags();
  }

  $parseOptions() {
    this.constructor.OPTIONS.forEach((option, index) => {
      this[option.name] = this.$options[index];
    });
  }

  $parseFlags() {
    this.constructor.FLAGS.forEach((option) => {
      this[option.name] = this.$flags[option.name] || this.$flags[option.alias] || option.default;
    });
  }

  $run() {
    if (this.$flags.h || this.$flags.help) {
      help(this.constructor);
      return;
    }
    this.run();
  }

  loadContentsFrom(...filePath) {
    return File(...filePath);
  }

  get $info() {
    return this.constructor.$info;
  }

  get $error() {
    return this.constructor.$error;
  }

  get $echo() {
    return this.constructor.$echo;
  }

  get $success() {
    return this.constructor.$success;
  }

  get $warning() {
    return this.constructor.$warning;
  }
}

BaseCommand.COMMAND = null;
BaseCommand.DESCRIPTION = null;

BaseCommand.FLAGS = [];
BaseCommand.OPTIONS = [];

BaseCommand.$info = Console.info;
BaseCommand.$echo = Console.echo;
BaseCommand.$error = Console.error;
BaseCommand.$success = Console.success;
BaseCommand.$warning = Console.warning;

module.exports = BaseCommand;
