// Z字形变换
function convert(s, numRows) {
    if (numRows === 1) {
        return s;
    }
    let result = '';
    let rows = numRows;
    let index = 0;
    let i = 0;
    let j = 0;
    let down = true;
    let dp = Array.from(new Array(rows), () => []);
    while (index < s.length) {
        dp[i][j] = s[index++];
        if(down){
            i++;
            if(i === rows - 1){
                down = false;
            }
        }else{
            i--;
            j++;
            if(i === 0){
                down = true;
            }
        }
    }
    result = dp.reduce((sum, row) => (sum = sum + row.join('')), '');
    return result;
}

console.log(convert('LEETCODEISHIRING', 2));
