export { default as IPaths } from './IPaths';

export type tPathsConfig = {
  [key: string]: string;
};

export type tPathFetcher = (...pieces: string[]) => string;
export type tPathFetcherList = { [key: string]: tPathFetcher };
