const chalk = require('chalk');
const Console = require('../console');
const project = require('../../package.json');

const parseCommandOptions = command => command.OPTIONS.reduce(
  (str, option) => str + chalk.whiteBright(` {${option.name}}`),
  '',
);

const parseOptions = (options) => {
  let maxLength = 0;
  return options
    .map((option) => {
      const nameLength = option.name.length;
      if (nameLength > maxLength) {
        maxLength = nameLength;
      }

      return {
        name: option.name,
        default: option.default,
        description: option.description,
      };
    })
    .map(option => ({ ...option, name: option.name.padEnd(maxLength, ' ') }));
};

const parseFlags = (flags) => {
  let maxLength = 0;
  return flags
    .map((flag) => {
      const name = !flag.alias ? `--${flag.name}` : `--${flag.name}, --${flag.alias}`;
      const nameLength = name.length;
      if (nameLength > maxLength) {
        maxLength = nameLength;
      }

      return {
        name,
        default: flag.default,
        description: flag.description,
      };
    })
    .map(option => ({ ...option, name: option.name.padEnd(maxLength, ' ') }));
};

const printDesc = (desc) => {
  let str = '  ';
  str += chalk.whiteBright(`${desc.name}`);

  str += chalk.white(`    ${desc.description}`);
  if (desc.default != null) {
    str += chalk.white(` (default: ${desc.default !== '' ? desc.default : '\'\''})`);
  }

  Console.echo(str);
};

const describeOptions = command => parseOptions(command.OPTIONS).forEach(printDesc);
const describeFlags = command => parseFlags(command.FLAGS).forEach(printDesc);

const helpBlock = (command) => {
  Console.echo();
  Console.success(`${project.name} - v${project.version} - by ${project.author.name}`);
  Console.echo();
  Console.echo(chalk.white('node-assistant ') + chalk.whiteBright(command.COMMAND) + parseCommandOptions(command));
  Console.echo();
  Console.echo(chalk.whiteBright(command.DESCRIPTION));
  Console.echo();
  Console.echo('Options:');
  Console.echo(describeOptions(command));
  Console.echo('Flags:');
  Console.echo(describeFlags(command));
  Console.echo();
};

module.exports = helpBlock;
