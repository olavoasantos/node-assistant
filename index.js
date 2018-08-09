const Cli = require('./src');
const File = require('./src/file');
const createFile = require('./src/createFile');
const BaseCommand = require('./src/commands/BaseCommand');

module.exports = {
  File,
  createFile,
  BaseCommand,
  default: (new Cli()).init(),
};
