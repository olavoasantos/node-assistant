import { parseFlagKey, parseFlagValue } from '../helpers';

export default (flag: string) => {
  const [key, ...value] = flag.split('=');

  return { key: parseFlagKey(key), value: parseFlagValue(value.join('=')) };
};
