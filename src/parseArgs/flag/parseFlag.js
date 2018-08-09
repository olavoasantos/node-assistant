const parseFlag = arg => arg.substr(2).split('=').reduce((acc, value, index) => {
  const flag = { ...acc };
  if (index === 0) flag.name = value;
  if (index === 1) flag.value = value;

  return flag;
}, { value: true });

module.exports = parseFlag;
