const File = require('../../file');
const BaseCommand = require('../BaseCommand');
const createFile = require('../../createFile');

class FileCommand extends BaseCommand {
  run() {
    const ComponentStub = File(__dirname, './FileCommand.stub');
    createFile(this.options[0], ComponentStub, this.flags);

    return this;
  }
}

FileCommand.COMMAND = 'file';
FileCommand.DESCRIPTION = 'This is a test file command';

module.exports = FileCommand;
