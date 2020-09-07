const DataAccess = require('./../DataAccess/DataAccess');

class CsvParser {
    
    constructor() { }

    readData = (file_path) => DataAccess.readFile(file_path);
}

module.exports = { CsvParser };