const fs = require('fs').promises;

const readFile = (path) => fs.readFile(path, 'utf-8');

module.exports = { readFile };