const { CsvParser } = require('./CsvParser');

class CsvParserNoSchema extends CsvParser {

    constructor() {
        super();
    }

    parse = async (file_path) => {
        const raw_data = await this.readData(file_path);
        const lines = raw_data.split('\n');
        const headers = lines.shift().split(',');
        const rows = [];
        const errors = [];

        lines.forEach((line, index) => {
            const line_attributes = line.split(',');
            if (line_attributes.length < headers.length) {
                errors.push({
                    'description': `Line ${(index + 1)} has too few arguments`
                });
            } else {
                const target_object = {};
                headers.forEach((key, index) => target_object[key] = line_attributes[index]);
                rows.push(target_object);
            }
        });

        return { rows, errors };
    }
}

module.exports = { CsvParserNoSchema };