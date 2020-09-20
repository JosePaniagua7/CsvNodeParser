const { CsvParser } = require('./CsvParser');
const DataContractParser = require('../DataContractParser');

class CsvParserWithSchema extends CsvParser {

    constructor() {
        super();
    }

    parse = async (file_path, schema) => {
        const raw_data = await this.readData(file_path);
        const lines = raw_data.split('\n');
        const headers = lines.shift().split(',');
        const indexed_schema = DataContractParser.getContractIndexes(schema, headers);
        const rows = [];

        lines.forEach((line) => {
            const line_attributes = line.split(',');
            const parsedLine = parseLine(line_attributes, indexed_schema);
            rows.push(parsedLine);
        });

        return rows;
    }
}


const parseLine = (line_attributes, schema) => {
    const line_object = {};
    Object.entries(schema).forEach(([key, value]) => {
        const parser = value.hasOwnProperty('source_index') ? getAttributeValue : parseLine;
        line_object[key] = parser(line_attributes, value);
    });
    return line_object;
};

const getAttributeValue = (line_attributes, { source_index, parse }) =>
    parse
        ? parse(line_attributes[source_index])
        : line_attributes[source_index];

module.exports = { CsvParserWithSchema };