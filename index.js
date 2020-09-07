const CsvParserFactory = require('./CsvParserFactory');

module.exports = {
    parse: async (path, ...options) => {
        if (path) {
            console.log('Indicate at least one path!!!');
            return;
        } else {
            const parser = CsvParserFactory.getParser(options);
            // const data = await parser.parse('./addresses.csv');
            const data = await parser.parse(path);
            return data;
        }
    }
};

// fs.readFile('./addresses.csv', 'utf-8')
//     .then((data) => {
//         const lines = data.split('\n');
//         const target_contract = lines.shift().split(',');
//         const parsed_data = [];
//         const errors = [];

//         lines.forEach((line, index) => {
//             const line_attributes = line.split(',');
//             if (line_attributes.length < target_contract.length) {
//                 errors.push({
//                     'description': `Line ${(index + 1)} has too few arguments`
//                 });
//             } else {
//                 const target_object = {};
//                 target_contract.forEach((key, index) => target_object[key] = line_attributes[index]);
//                 parsed_data.push(target_object);
//             }
//         });
//         const response = { parsed_data, errors }
//         fs.writeFile('./parsed.json', JSON.stringify(response), (err, data) => console.log('finish'));

//     });
