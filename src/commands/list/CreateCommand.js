const BaseCommand = require('../BaseCommand');
const createFile = require('../../createFile');

class CreateCommand extends BaseCommand {
  run() {
    const { name, command, description } = this;
    if (!this.silent) this.$info('• Loading stub...');
    const CommandStub = this.loadContentsFrom(__dirname, './CreateCommand.stub');
    if (!this.silent) this.$info('• Creating file...');
    createFile(this.path, CommandStub, { name, command, description: description || '' });

    if (!this.silent) this.$success(`✓ Command '${this.name}' created!`);

    return this;
  }
}
CreateCommand.OPTIONS = [
  { name: 'path', description: 'Path to create file' },
];
CreateCommand.FLAGS = [
  { name: 'name', description: 'Component name' },
  { name: 'command', alias: 'c', description: 'Command' },
  { name: 'description', description: 'Command\'s description', default: '' },
  { name: 'silent', alias: 's', description: 'Run command silently' },
];
CreateCommand.COMMAND = 'create:command';
CreateCommand.DESCRIPTION = 'Create a new command';

module.exports = CreateCommand;
