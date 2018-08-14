const Cli = require('./index');
const createFakeCommand = require('./commands/CreateFakeCommand');

describe('Cli class', () => {
  let cli;
  beforeEach(() => {
    cli = new Cli();
  });

  it('should contain flags, options, comman and a list of commands', () => {
    expect(cli.flags).toEqual({});
    expect(cli.options).toEqual([]);
    expect(cli.command).toEqual('');
    expect(cli.commands).toEqual({});
  });

  it('should parse arguments', () => {
    process.argv = [
      'node',
      'assistant',
      'command.name',
      'option 1',
      'option 2',
      '--flag1',
      '--flag2=value',
      '--flag3=value with spaces',
    ];
    cli.getArgs();

    expect(cli.command).toEqual('command.name');
    expect(cli.options).toEqual(['option 1', 'option 2']);
    expect(cli.flags).toEqual({ flag1: true, flag2: 'value', flag3: 'value with spaces' });
  });

  it('should register a command into the command dictionary', () => {
    const FakeCommand = createFakeCommand('command');

    cli.register(FakeCommand);

    expect(cli.commands['fake:command']).toBeTruthy();
    expect(cli.commands['fake:command'].command).toBe('fake:command');
    expect(cli.commands['fake:command'].description).toBe('command description');
    expect(cli.commands['fake:command'].handle.constructor.name).toBe('FakeCommand');
  });

  it('should initialize default commands and args', () => {
    process.argv = ['node', 'assistant', 'command.name', 'option', '--flag'];
    cli.defaultCommands = [createFakeCommand('command')];

    expect(cli.options).toEqual([]);
    expect(cli.flags).toEqual({});
    expect(cli.command).toEqual('');
    expect(cli.commands['fake:command']).toBeUndefined();

    cli.init();

    expect(cli.options).toEqual(['option']);
    expect(cli.flags).toEqual({ flag: true });
    expect(cli.command).toEqual('command.name');
    expect(cli.commands['fake:command']).toBeDefined();
  });

  it('should register a list of commands', () => {
    const commands = [
      createFakeCommand('command'),
      createFakeCommand('command2'),
    ];

    expect(cli.commands['fake:command']).not.toBeDefined();
    expect(cli.commands['fake:command2']).not.toBeDefined();

    cli.initCommands(commands);

    expect(cli.commands['fake:command']).toBeDefined();
    expect(cli.commands['fake:command2']).toBeDefined();
  });

  it('should throw an error if registerCommands does not receive an Array', () => {
    expect(
      () => { cli.registerCommands('NOT AN ARRAY'); },
    ).toThrow();
    expect(
      () => { cli.registerCommands(createFakeCommand('command')); },
    ).toThrow();
    expect(
      () => { cli.registerCommands([]); },
    ).not.toThrow();
  });

  it('should call the help function if the command is not set', () => {
    let helpWasCalled = false;
    cli.help = () => { helpWasCalled = true; };

    process.argv = ['node', 'assistant'];
    cli.init();

    expect(helpWasCalled).toBeFalsy();
    cli.exec();
    expect(helpWasCalled).toBeTruthy();
  });

  it('should throw an error if a command does not exist', () => {
    process.argv = ['node', 'assistant', 'inexistent.command'];
    cli.init();

    expect(
      () => { cli.exec(); },
    ).toThrow();
  });

  it('should run an existent command when it is called', () => {
    process.argv = ['node', 'assistant', 'fake:command'];
    cli.init().register(createFakeCommand('command'));

    expect(cli.commands['fake:command'].handle.ran).toBeFalsy();
    cli.exec();
    expect(cli.commands['fake:command'].handle.ran).toBeTruthy();
  });
});
