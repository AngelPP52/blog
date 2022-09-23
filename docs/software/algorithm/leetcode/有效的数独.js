// 遍历一遍数独，将每个坐标点，都记录成到三个weekMap中，行/列/宫格
function isSudokuValide(sudo) {
    let rowMap = new Map();
    let colMap = new Map();
    let gridMap = new Map();

    let i = 0;
    let j = 0;
    for (i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudo[i][j] !== '.') {
                let num = sudo[i][j];
                let rowN = `row${i}`;
                let colN = `col${j}`;
                let gridN = `grid${Math.floor(i / 3) * 3 + Math.floor(j / 3)}`;
                let rowNums = rowMap.get(rowN) || {};
                let colNums = colMap.get(colN) || {};
                let gridNums = gridMap.get(gridN) || {};
                if (rowNums[num]
                    || colNums[num]
                    || gridNums[num]) { // 如果这一行，或者这一列，或者这个九宫格已经存在num，那么数独就无效
                    return false;
                }
                rowNums[num] = true; // 从此，这一行含num
                colNums[num] = true; // 从此，这一列含num
                gridNums[num] = true; // 从此，这一九宫格含num
                rowMap.set(rowN, rowNums);
                colMap.set(colN, colNums);
                gridMap.set(gridN, gridNums);
            }
        }
    }
    return true;
}