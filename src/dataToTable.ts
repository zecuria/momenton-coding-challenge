interface Employee {
    name: string,
    managerId?: string
}

interface EmployeeMap {
    [key: string]: Employee
}

interface EmployeeHiarchy {
    id: string
    children?: EmployeeHiarchy[]
}

const convertDataToTrees = (employeeMap: EmployeeMap): EmployeeHiarchy[] => {
    const hiarchyTrees: EmployeeHiarchy[] = [];
    const employeeList: EmployeeHiarchy[] = Object.keys(employeeMap).map((id) => ({ id, children: undefined }));
    const childrenMap: Record<string, EmployeeHiarchy[]> = {};

    employeeList.forEach((listItem) => {
        const { id } = listItem;

        // initialize the map of children
        childrenMap[id] = childrenMap[id] || [];

        // assign children instance to employee
        listItem.children = childrenMap[id];

        const { managerId } = employeeMap[id];
        if (managerId) {
            childrenMap[managerId] = childrenMap[managerId] || [];
            childrenMap[managerId].push(listItem);

            // check if manager is a valid employee otherwise add the manager to the hiarchy
            if (!employeeMap[managerId]) {
                hiarchyTrees.push({ id: managerId, children: childrenMap[managerId] });
            }
        } else {
            hiarchyTrees.push({ id, children: childrenMap[id] });
        }

    });

    return hiarchyTrees;
};

interface TableValue {
    id: string,
    depth: number
}

// create an array of id's and depths to be used to create the table
// this is achieved by applying depth first traversal to the individual higharchy trees
const createTableFromTree = (root: EmployeeHiarchy, depth = 0): TableValue[] => {
    if (!root) {
        return [];
    }

    const {id, children} = root;
    let answer: TableValue[] = [{ depth, id }];
    if (children && children.length)  {
        children.forEach((child) => {
            answer = [...answer, ...createTableFromTree(child, depth+1)];
        })
    }

    return answer;
};

// convert the data map to the table
const dataToTable = (employeeMap: EmployeeMap) => {
    const trees = convertDataToTrees(employeeMap);

    // get the raw data in of each of the trees and flatten the array
    const rawData = trees.map((tree) => createTableFromTree(tree)).reduce((acc, tableData) => [...acc, ...tableData], []);

    // get the max depth in order to know how many columns to have
    const numberOfColumns = 1 + rawData.reduce((max, { depth }) => depth > max ? depth : max, 0);

    const table = rawData.map(({ depth, id }) => {
        // create a number of empty cells in the row
        const row = Array(numberOfColumns).fill('');

        // initialize the cell contianing the value in the row
        const { name = id } = employeeMap[id] || {};
        row[depth] = name;

        return row;
    });

    return table;
}

export default dataToTable;
