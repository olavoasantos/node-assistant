const fs = require('fs');
const path = require('path');

module.exports = (filePath, encoding = 'utf8') => fs.readFileSync(path.resolve(filePath), encoding);
