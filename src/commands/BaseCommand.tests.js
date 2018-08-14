const CreateFakeCommand = require('./CreateFakeCommand');

describe('BaseCommand class', () => {
  let Command;
  beforeEach(() => {
    Command = CreateFakeCommand('command');
  });

  it('should have help and silent flags by default', () => {
    const command = new Command();
    const helpFlag = command.constructor.FLAGS.find(
      flag => flag.name === 'help',
    );
    expect(helpFlag).toBeDefined();
    expect(helpFlag.alias).toBe('h');

    const silentFlag = command.constructor.FLAGS.find(
      flag => flag.name === 'silent',
    );
    expect(silentFlag).toBeDefined();
    expect(silentFlag.alias).toBe('s');
    expect(silentFlag.default).toBe(false);
    expect(command.silent).toBeDefined();
    expect(command.silent).toBeFalsy();
  });

  it('should parse the commands options', () => {
    Command.OPTIONS = [{ name: 'option' }];
    const command = new Command(['value-of-option'], {});

    expect(command.option).toBe('value-of-option');
  });

  it('should parse the commands flags', () => {
    Command.FLAGS = [{ name: 'flag' }];

    const command = new Command([], { flag: 'value of flag' });
    expect(command.flag).toBe('value of flag');
  });

  it('should parse the commands flags using alias', () => {
    Command.FLAGS = [{ name: 'flag-with-alias', alias: 'alias' }];

    const command1 = new Command([], { 'flag-with-alias': 'value of flag' });
    expect(command1['flag-with-alias']).toBe('value of flag');

    const command2 = new Command([], { alias: 'value of flag' });
    expect(command2['flag-with-alias']).toBe('value of flag');
  });

  it('should parse the commands flags which has a default value', () => {
    Command.FLAGS = [{ name: 'flag-with-default', default: 'DEFAULT VALUE' }];

    const command = new Command([], { });
    expect(command['flag-with-default']).toBe('DEFAULT VALUE');
  });

  it('should run the help function if the help flag is set to true', () => {
    const command = new Command([], { help: true });
    let helpWasCalled = false;
    command.helpBlock = () => { helpWasCalled = true; };

    expect(helpWasCalled).toBeFalsy();
    command.$run();
    expect(helpWasCalled).toBeTruthy();
  });

  it('should run the command once it is called', () => {
    const command = new Command();
    expect(command.ran).toBeFalsy();
    command.$run();
    expect(command.ran).toBeTruthy();
  });
});
