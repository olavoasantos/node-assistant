const chalk = require('chalk');
const Console = require('../console');
const project = require('../../package.json');

const parseOptions = command => command.OPTIONS.reduce(
  (str, option) => str + chalk.whiteBright(` {${option.name}}`),
  '',
);

const printOption = (option) => {
  let str = '\t';
  str += chalk.whiteBright(`${option.name}`);

  str += chalk.white(`:\t${option.description}`);
  if (option.default != null) {
    str += chalk.white(` (default: ${option.default !== '' ? option.default : '\'\''})`);
  }

  Console.echo(str);
};

const printFlag = (flag) => {
  let str = '\t';
  str += chalk.whiteBright(`--${flag.name}`);
  if (flag.alias) {
    str += chalk.whiteBright(`, --${flag.alias}`);
  }

  str += chalk.white(`:\t${flag.description}`);
  if (flag.default != null) {
    str += chalk.white(` (default: ${flag.default !== '' ? flag.default : '\'\''})`);
  }

  Console.echo(str);
};

const describeOptions = command => command.OPTIONS.forEach(printOption);
const describeFlags = command => command.FLAGS.forEach(printFlag);

const helpBlock = (command) => {
  Console.echo();
  Console.success(`${project.name} - v${project.version} - by ${project.author.name}`);
  Console.echo();
  Console.echo(chalk.white('node-assistant ') + chalk.whiteBright(command.COMMAND) + parseOptions(command));
  Console.echo();
  Console.echo(chalk.whiteBright(command.DESCRIPTION));
  Console.echo();
  Console.echo('Options:');
  Console.echo(describeOptions(command));
  Console.echo('Flags:');
  Console.echo(describeFlags(command));
  Console.echo(printFlag({ name: 'help', alias: 'h', description: 'Quick help on command' }));
  Console.echo();
};

module.exports = helpBlock;
