import Commands from '.';
import { ICommand, ICommandModule } from './contracts';

describe('Commands tests', () => {
  const cmd: ICommand = {
    name: 'Mocked command',
    description: 'This is a mocked command',
    command: 'mocked:cmd',
    options: [],
    flags: [],
    run: jest.fn(),
  };

  let commands: ICommandModule;
  beforeEach(() => {
    commands = new Commands();
    (cmd.run as any).mockClear();
  });

  it('should define a command', () => {
    commands.define(cmd);

    expect(commands.list).toMatchObject({
      [cmd.command]: cmd,
    });
  });

  it('should return true if a command exists based on the command', () => {
    commands.define(cmd);
    expect(commands.has(cmd.command)).toBeTruthy();
  });

  it('should return false if a command does not exist based on the command', () => {
    commands.define(cmd);
    expect(commands.has('A COMMAND DOES NOT EXIST')).toBeFalsy();
  });

  it('should run a command if it exists', () => {
    commands.define(cmd);

    expect(commands.get(cmd.command)).toBe(cmd);
  });

  it('should throw an error if trying to run a command that does not exist', () => {
    commands.define(cmd);

    expect(() => {
      commands.get('A CMD THAT DOES NOT EXIST');
    }).toThrowError();
  });
});
