const parseArgs = require('./index');
const option = require('./option');
const flag = require('./flag');

describe('Parse arguments', () => {
  const args = [
    'command',
    'option 1',
    '--flag1',
    'option 2',
    '--flag2=value',
    '--flag3=some value with spaces',
  ];

  it('should identify an option', () => {
    expect(option.check('option')).toBeTruthy();
    expect(option.check('--flag')).toBeFalsy();
  });

  it('should identify a flag', () => {
    expect(flag.check('--flag')).toBeTruthy();
    expect(flag.check('--flag=value')).toBeTruthy();
    expect(flag.check('--flag=value with spaces')).toBeTruthy();
    expect(flag.check('option')).toBeFalsy();
  });

  it('should parse a flag', () => {
    const flag1 = '--flag1';
    const flag2 = '--flag2=value';
    const flag3 = '--flag3=value with spaces';

    expect(flag.parse(flag1)).toEqual({ name: 'flag1', value: true });
    expect(flag.parse(flag2)).toEqual({ name: 'flag2', value: 'value' });
    expect(flag.parse(flag3)).toEqual({ name: 'flag3', value: 'value with spaces' });
  });

  it('should parse commands', () => {
    const { command } = parseArgs(args);
    expect(command).toEqual('command');
  });

  it('should parse options', () => {
    const { options } = parseArgs(args);
    expect(options).toEqual(['option 1', 'option 2']);
  });

  it('should parse flags', () => {
    const { flags } = parseArgs(args);
    expect(flags).toEqual({ flag1: true, flag2: 'value', flag3: 'some value with spaces' });
  });
});
