const getContractIndexes = (contract, headers) => {
    const target_contract = {};
    Object.entries(contract).forEach(([key, value]) => {
        const parser = value.source ? getKeyIndex : getContractIndexes;
        indexed_value = parser(value, headers, key);
        if (indexed_value) target_contract[key] = parser(value, headers, key);
    });
    return target_contract;
}

const getKeyIndex = ({ source, ...value }, headers, key) => {
    const source_index = headers.findIndex(header => header === source);
    if (source_index > -1) {
        value.source_index = source_index;
        return value;
    } else {
        console.log(`The source for key ${key} wasn't found`);
    }
}

module.exports = { getContractIndexes };