const flag = require('./flag');
const option = require('./option');

const parseArgs = (parameters) => {
  const flags = {};
  const options = [];
  const args = [...parameters];
  const command = args.shift();

  args.forEach((val) => {
    if (flag.check(val)) {
      const { name, value } = flag.parse(val);
      flags[name] = value;
    }

    if (option.check(val)) {
      options.push(val);
    }
  });

  return { command, options, flags };
};

module.exports = parseArgs;
