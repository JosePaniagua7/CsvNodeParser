const { CsvParserNoSchema } = require('../CsvParsers/CsvParserNoSchema');

module.exports = {
    getParser: (options) => {
        // if (options.length);
        return new CsvParserNoSchema();
    }
}