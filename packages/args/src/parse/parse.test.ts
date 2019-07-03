import parse from '../parse';

const mockArgs = (...args: string[]) => ['node', 'assistant/path', ...args];

describe('args tests', () => {
  it('should parse an option', () => {
    expect(parse(mockArgs('MY_OPTION'))).toMatchObject({
      flags: {},
      options: ['MY_OPTION'],
    });
  });

  it('should parse multiple options', () => {
    expect(parse(mockArgs('MY_FIRST_OPTION', 'MY_SECOND_OPTION'))).toMatchObject({
      flags: {},
      options: ['MY_FIRST_OPTION', 'MY_SECOND_OPTION'],
    });
  });

  it('should parse a flag', () => {
    expect(parse(mockArgs('--my-flag=value'))).toMatchObject({
      flags: {
        'my-flag': 'value',
      },
      options: [],
    });
  });

  it('should parse a flag without a value as a boolean', () => {
    expect(parse(mockArgs('--my-flag'))).toMatchObject({
      flags: {
        'my-flag': true,
      },
      options: [],
    });
  });

  it('should parse a flag where the value contains spaces', () => {
    expect(parse(mockArgs('--my-flag=my long value'))).toMatchObject({
      flags: {
        'my-flag': 'my long value',
      },
      options: [],
    });
  });

  it('should parse a flag surrounded by double quotes', () => {
    expect(parse(mockArgs('--my-flag="my long value"'))).toMatchObject({
      flags: {
        'my-flag': 'my long value',
      },
      options: [],
    });
  });

  it('should parse a flag surrounded by quotes', () => {
    expect(parse(mockArgs(`--my-flag='my long value'`))).toMatchObject({
      flags: {
        'my-flag': 'my long value',
      },
      options: [],
    });
  });

  it('should parse a flag with a list value', () => {
    expect(parse(mockArgs('--my-flag=FIRST,SECOND,THIRD'))).toMatchObject({
      flags: {
        'my-flag': ['FIRST', 'SECOND', 'THIRD'],
      },
      options: [],
    });
  });
});
