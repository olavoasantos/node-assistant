import Config from '.';
import IConfig from './contracts/IConfig';

describe('Config tests', () => {
  let config: IConfig;
  beforeEach(() => {
    config = new Config({
      default: 'value',
    });
  });

  it('should set the definitions to an empty object if no defaults are passed to the constructor', () => {
    expect(new Config().definitions).toMatchObject({});
  });

  it('should set the definitions passed through the constructor as default values', () => {
    expect(config.definitions).toMatchObject({
      default: 'value',
    });
  });

  it('should get a value from the definition dictionary', () => {
    expect(config.get('default')).toBe('value');
  });

  it('should set a new definition', () => {
    config.set('new definition', 'new value');

    expect(config.get('new definition')).toBe('new value');
  });

  it('should overwrite a definition if the key already exists', () => {
    config.set('default', 'updated value');

    expect(config.get('default')).toBe('updated value');
  });

  it('should set a value if the key already does not exist and tries to be merged', () => {
    config.merge('object', { 'new definition': 'new value' });

    expect(config.get('object')).toMatchObject({
      'new definition': 'new value',
    });
  });

  it('should merge an object definition if the key already exists', () => {
    config.set('object', { default: 'value' });
    config.merge('object', { 'new definition': 'new value' });

    expect(config.get('object')).toMatchObject({
      default: 'value',
      'new definition': 'new value',
    });
  });

  it('should merge an array definition if the key already exists', () => {
    config.set('array', ['value']);
    config.merge('array', ['new value']);

    expect(config.get('array')).toMatchObject(['value', 'new value']);
  });
});
