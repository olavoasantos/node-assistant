const BaseCommand = require('../BaseCommand');

class CreateCommand extends BaseCommand {
  run() {
    const {
      path,
      name,
      command,
      description,
    } = this;
    const variables = { name, command, description: description || '' };

    if (!this.silent) this.$info('• Creating file...');
    this.createFile(path, [__dirname, './CreateCommand.stub'], variables);

    if (!this.silent) this.$success(`✓ Command '${this.name}' created!`);

    return this;
  }
}
CreateCommand.OPTIONS = [
  { name: 'path', description: 'Path to create file' },
];
CreateCommand.FLAGS = [
  { name: 'name', alias: 'n', description: 'Component name' },
  { name: 'command', alias: 'c', description: 'Command' },
  { name: 'description', description: 'Command\'s description', default: '' },
];
CreateCommand.COMMAND = 'create:command';
CreateCommand.DESCRIPTION = 'Create a new command';

module.exports = CreateCommand;
