import Paths from '.';
import { IPaths } from './contracts';

describe('Paths tests', () => {
  let paths: IPaths;
  beforeEach(() => {
    paths = new Paths({
      root: 'path/to/root',
    });
  });

  it('should set default paths', () => {
    paths = new Paths();

    expect(paths.config.cwd).toBeDefined();
    expect(paths.config.root).toBeDefined();

    console.log(process.argv);
  });

  it('should store the configuration on the instance', () => {
    expect(paths.config).toMatchObject({
      root: 'path/to/root',
    });
  });

  it('should define the path fetcher on the list', () => {
    expect(paths.list.root).toBeDefined();
  });

  it('should generate a path based on the provided initial path', () => {
    const { root } = paths.list;

    expect(root('file.ext')).toBe('path/to/root/file.ext');
  });
});
