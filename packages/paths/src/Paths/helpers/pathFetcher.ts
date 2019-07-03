import path from 'path';
import { tPathFetcher } from '../contracts';

export default (base: string): tPathFetcher => (...pieces: string[]) => {
  return path.join(base, ...pieces);
};
