/* eslint-disable no-console */
const chalk = require('chalk');

module.exports = {
  echo: text => console.log(text || ''),
  info: text => console.log(chalk.blue(text || '')),
  error: text => console.log(chalk.red(text || '')),
  success: text => console.log(chalk.green(text || '')),
  warning: text => console.log(chalk.yellow(text || '')),
};
