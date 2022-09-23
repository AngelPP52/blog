// 贪心算法，先把原问题分解成若干个子问题，求子问题的最优解，再将所有子问题的最优解合并成原问题的解
// 这里有点像枚举子问题的解，通过求除数和求余数分解出所有子问题，然后对着子问题的解来合并原问题的解
function intToRoman(num) {
    let number = { num };
    let result = '';
    let keys = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let values = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    function toRoman(num, rate, unit) {
        let count = Math.floor(num.num / rate);
        num.num = num.num % rate
        return new Array(count).fill(unit).join('');
    }
    let index = 0
    while (index < keys.length) {
        result += toRoman(number, keys[index], values[index]);
        index++;
    }
    return result;
}