import convertDataToTrees from "./dataToTable";
import data from './data.json';

test('renders learn react link', () => {
    console.log(JSON.stringify(convertDataToTrees(data)));
});

