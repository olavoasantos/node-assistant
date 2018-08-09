const BaseCommand = require('../BaseCommand');

class TestCommand extends BaseCommand {
  run() {
    this.echo('echo something cool');
    this.info('displays some info');
    this.warning('shows a warning');
    this.error('something went wrong!!');
  }
}

TestCommand.COMMAND = 'test';
TestCommand.DESCRIPTION = 'This is a test command';

module.exports = TestCommand;
