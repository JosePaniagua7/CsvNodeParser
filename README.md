# Node csv parser

## Usage

### Simple Usage, no schema provided

The basic usage of this library consist in a simple csv file reader where you can provide a file path to read and parse and it will output the data based on the file headers. For exmaple
    
    addresses.csv
    
    nombre,apellido,calle,distrito,estado,codigo_postal
    John,Doe,120 jefferson st.,Riverside, NJ, 08075
    Jack,McGinnis,220 hobo Av.,Phila, PA,09119
    "John ""Da Man""",Repici,120 Jefferson St.,Riverside, NJ,08075
    Stephen,Tyler,"7452 Terrace ""At the Plaza"" road",SomeTown,SD, 91234
    ,Blankman,,SomeTown, SD, 00298
    "Joan ""the bone"", Anne",Jet,"9th, at Terrace plc",Desert City,CO,00123

You can use the following code:

    const CsvParser = require('csv_node_parser');

    CsvParser.parse('./addresses.csv')
    .then(data => console.log(data));

And the expected output will look like this: 

    {
        rows: [
            {
                nombre: 'John',
                apellido: 'Doe',
                calle: '120 jefferson st.',
                distrito: 'Riverside',
                estado: ' NJ',
                codigo_postal: ' 08075'
            },
            {
                nombre: 'Jack',
                apellido: 'McGinnis',
                calle: '220 hobo Av.',
                distrito: 'Phila',
                estado: ' PA',
                codigo_postal: '09119'
            },
            ...
        ],
        errors: []
    }

The errors arr will be filled when in certain row some of the fields are missing, this happens because of performance reasons, the "place" or "position" of the data source is calculated just once based on the headers, so, if the algorithm can't find one field within one specific row it will be returned in the errors array indicating the line that is lacking that field.

### Usage with provided schema. 

Now, let's say that you are willing to use a library that not just read and return the raw rows but also return the desired data contract so you can simply call your ORM bulk create method or perform any other data manipulation sentences.

To accomplish this, we must provide a shema that represents the desired data contract to our previous function, for example, if you provide the following schema 

    const CsvParser = require('csv_node_parser');

    //---addresses.csv----//

    nombre,apellido,calle,distrito,estado,codigo_postal
    John,Doe,120 jefferson st.,Riverside, NJ, 08075
    Jack,McGinnis,220 hobo Av.,Phila, PA,09119

    const schema = {
        Person: {
            name: {
                //source must match the header in the csv
                source: 'nombre',
            },
            lastname: {
                source: 'apellido'
            }
        },
        Address: {
            Street: {
                name: {
                    source: 'calle'
                }
            },
            district: {
                source: 'distrito'
            }
        }
    };

    CsvParser.parse('./addresses.csv', schema)
    .then(res => console.log(res));

You will get the following output

    [
        {
            "Person": {
                "name": "John",
                "lastname": "Doe"
            },
            "Address": {
                "Street": {
                    "name": "120 jefferson st."
                },
                "district": "Riverside"
            }
        },
        ...
    ]

Now, since it's a parser you should be able to perform some data manipulation in runtime, let's say that now our csv file contains the born year of each person, but what you really need is the age, so, instead of having to implement an algorithm from scratch you can simply pass a parsing function to your source field and it will perform any data manipulation you want. For example: 


    //---addresses.csv----//

    nombre,apellido,calle,distrito,estado,codigo_postal,birth_year
    John,Doe,120 jefferson st.,Riverside, NJ, 08075,1999    

    //Now your schema will look something like this
    const schema = {
        Person: {
            name: {
                source: 'nombre',
            },
            lastname: {
                source: 'apellido'
            },
            age: {
                source: 'birth_year',
                //parse key and indicate a function to execute with the value
                parse: (birth_year) => new Date().getFullYear() - parseInt(birth_year)
            }
        },
        Address: {
            Street: {
                name: {
                    source: 'calle'
                }
            },
            district: {
                source: 'distrito'
            }
        }
    };


And you'll get an output like: 

    [
        {
            "Person": {
                "name": "John",
                "lastname": "Doe",
                //parsed age
                "age": 21
            },
            "Address": {
                "Street": {
                    "name": "120 jefferson st."
                },
                "district": "Riverside"
            }
        },
        ...
    ]


## Author

**[Jose Paniagua](https://github.com/JosePaniagua7)** 


## License

This project is licensed under the MIT License.