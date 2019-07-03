import { isUndefined } from 'util';

export default (rawValue: string) => {
  let value: any;
  if (isUndefined(rawValue) || rawValue === '') {
    value = true;
  } else if (
    (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
    (rawValue.startsWith("'") && rawValue.endsWith("'"))
  ) {
    value = rawValue.substr(1).slice(0, -1);
  } else if (rawValue.includes(',')) {
    value = rawValue.split(',');
  } else {
    value = rawValue;
  }

  return value;
};
