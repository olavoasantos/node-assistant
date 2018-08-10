const Console = require('../console');
const project = require('../../package.json');

const helpBlock = (commands) => {
  Console.echo();
  Console.success(`${project.name} - v${project.version} - by ${project.author.name}`);
  Console.echo();
  Console.echo('Commands:');
  Object.keys(commands).forEach((commandName) => {
    if (!commandName) return;
    const command = commands[commandName];
    Console.echo(`  ${command.command}\t\t${command.description}`);
  });
  Console.echo();
};

module.exports = helpBlock;
