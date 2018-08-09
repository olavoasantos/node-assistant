const File = require('../../file');
const BaseCommand = require('../BaseCommand');
const createFile = require('../../createFile');

class CreateCommand extends BaseCommand {
  run() {
    const { name, command, description } = this.flags;
    const CommandStub = File(__dirname, './CreateCommand.stub');
    createFile(this.options[0], CommandStub, { name, command, description: description || '' });

    return this;
  }
}

CreateCommand.COMMAND = 'create:command';
CreateCommand.DESCRIPTION = 'Create a new command';

module.exports = CreateCommand;
