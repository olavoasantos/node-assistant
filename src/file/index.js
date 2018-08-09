const fs = require('fs');
const path = require('path');

module.exports = (...filePath) => fs.readFileSync(path.resolve(...filePath), 'utf8');
