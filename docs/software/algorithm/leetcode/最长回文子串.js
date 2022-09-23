// 给定一个字符串s，找到s中最长的回文子串。你可以假设s的最大长度是1000
/**
 * 求最大回文子串
 *  动态规划求法：dp[i][j] = s[i] === s[j] && (dp[i+1][j-1] || j - i < 2)
 * @param {*} s 字符串
 */
function longestPalindrome(s) {
    let result = '';
    let n = s.length;
    let dp = Array.from(new Array(n), () => new Array(n).fill(0))
    for (let i = n - 1; i >= 0; i--) { // 这里倒着进行的原因是，在判断i~j的子串时要确保i+1~j-1是已经计算过了的
        for (let j = i; j < n; j++) {
            dp[i][j] = s[i] === s[j] && ((j - i < 2) || dp[i + 1][j - 1]);
            if (dp[i][j] && j - i + 1 > result.length) {
                result = s.substring(i, j + 1);
            }
        }
    }
    return result;
}

console.log(longestPalindrome('abbaacdb'));
