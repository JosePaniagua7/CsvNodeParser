const CsvParserFactory = require('./CsvParserFactory');

module.exports = {
    parse: async (path, schema = {}) => {
        if (!path) {
            console.log('Indicate at least one path!!!');
            return '';
        } else {
            const parser = CsvParserFactory.getParser(schema);
            const data = await parser.parse(path);
            return data;
        }
    }
};
