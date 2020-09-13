const { CsvParserNoSchema } = require('../CsvParsers/CsvParserNoSchema');
const { CsvParserWithSchema } = require('../CsvParsers/CsvParserWithSchema');

module.exports = {
    getParser: (schema) => Object.keys(schema).length ? new CsvParserWithSchema() : new CsvParserNoSchema()
}