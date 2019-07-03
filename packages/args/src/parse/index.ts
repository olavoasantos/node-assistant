import { IArgs, tArgs } from './contracts';
import { isFlag, isOption, parseFlag } from './helpers';

const parse: tArgs = (rawArgs: string[]) => {
  const [, , ...args] = rawArgs;
  return args.reduce(
    (parsedArgs: IArgs, arg: string) => {
      if (isOption(arg)) {
        parsedArgs.options = [...parsedArgs.options, arg];
      } else if (isFlag(arg)) {
        const { key, value } = parseFlag(arg);
        parsedArgs.flags[key] = value;
      }

      return parsedArgs;
    },
    {
      flags: {},
      options: [],
    },
  );
};

export default parse;
