const Cli = require('./src');
const createFile = require('./src/createFile');

module.exports = {
  default: (new Cli()).init(),
  createFile,
};
