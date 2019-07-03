import { ICommand } from '@node-assistant/command/dist';
import Assistant from '.';

const originalArgs = [...process.argv];
const resetArgs = () => (process.argv = originalArgs);
const setArgs = (...args: string[]) => (process.argv = [originalArgs[0], originalArgs[1], ...args]);
const cmdFactory = (cmd: Partial<ICommand> = {}) => ({
  name: 'Mocked command',
  description: 'This is a mocked command',
  command: 'mocked:cmd',
  options: [],
  flags: [],
  run: jest.fn(),
  ...cmd,
});

describe('assistant tests', () => {
  const config = {
    paths: {
      root: '/path/to/root',
    },
  };

  afterEach(() => {
    resetArgs();
  });

  it('should define the command', () => {
    const cmd = cmdFactory({ command: 'my:cmd' });
    const cli = new Assistant(config);
    cli.define(cmd);

    expect(cli.commands()).toMatchObject({
      'my:cmd': cmd,
    });
  });

  it('should run the defined command ', () => {
    setArgs('my:cmd');
    const cmd = cmdFactory({ command: 'my:cmd' });
    const cli = new Assistant(config);
    cli.define(cmd);

    cli.run();

    expect(cmd.run).toHaveBeenCalledTimes(1);
  });

  it('should receive paths', () => {
    setArgs('my:cmd');
    const cli = new Assistant(config);
    const cmd = cmdFactory({
      command: 'my:cmd',
      run: ({ paths }) => {
        expect(paths).toBeDefined();
      },
    });
    cli.define(cmd);
    cli.run();
  });
});
