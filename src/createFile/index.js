const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const findOrCreateDir = (dirPath) => {
  try {
    path.dirname(dirPath).split('/').slice(1).reduce((fullPath, dir) => {
      const newPath = fullPath !== '' ? `${fullPath}/${dir}` : dir;
      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath);
      }

      return newPath;
    }, '');
  } catch (e) {
    throw new Error(e);
  }
};

const createFile = (filePath, template = '', variables = {}) => {
  findOrCreateDir(filePath);
  const contents = mustache.render(template, variables);

  try {
    fs.writeFileSync(path.resolve(filePath), contents);
    return true;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = createFile;
