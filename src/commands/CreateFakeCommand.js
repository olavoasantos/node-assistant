const BaseCommand = require('./BaseCommand');

module.exports = (command) => {
  class FakeCommand extends BaseCommand {
    constructor(options, flags) {
      super(options, flags);
      this.ran = false;
    }

    run() {
      this.ran = true;
    }
  }

  FakeCommand.COMMAND = `fake:${command}`;
  FakeCommand.DESCRIPTION = `${command} description`;

  FakeCommand.OPTIONS = [
  ];

  FakeCommand.FLAGS = [
  ];

  return FakeCommand;
};
