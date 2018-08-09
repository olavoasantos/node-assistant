const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const createFile = (filePath, template = '', variables = {}) => {
  const contents = mustache.render(template, variables);

  try {
    fs.writeFileSync(path.resolve(filePath), contents);
    return true;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = createFile;
