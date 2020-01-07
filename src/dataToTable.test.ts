import convertDataToTrees from "./dataToTable";
import data from './data.json';
import dataToTable from "./dataToTable";

describe('dataToTable', () => {
    // sorry wasn't able to test as thoroughly as I would have wanted
    // have been extermely busy in my day to day so honeslty didn't have time.

    // :(
    test('should work with simple higharchy', () => {
        const data = {
            'id1': {
                "name": "Martin",
                "managerId": "id2"
            },
            'id2': {
                "name": "Bob",
            },
        };

        const expected = [ [ 'Bob', '' ], [ '', 'Martin' ] ];
        expect(dataToTable(data)).toEqual(expected);
    });

    it('should return the correct higharchy for managers that are not employees', () => {
        const data = {
            'id3': {
                "name": "karen",
                "managerId": "Steve"
            }
        };

        const expected = [ [ 'Steve', '' ], [ '', 'karen' ] ];
        expect(dataToTable(data)).toEqual(expected);
    });
})

