const CsvParserFactory = require('./CsvParserFactory');

module.exports = {
    parse: async (path, ...options) => {
        if (!path) {
            console.log('Indicate at least one path!!!');
            return '';
        } else {
            const parser = CsvParserFactory.getParser(options);
            const data = await parser.parse(path);
            return data;
        }
    }
};
