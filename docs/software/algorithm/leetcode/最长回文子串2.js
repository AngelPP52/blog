
/**
 *  中心扩展求法：
 *  1. 以i为中心，左右扩展
 *  2. 以i和i+1为中心，左右扩展
 *  end. 如果left等于right，继续扩展至left不等于right，得到回文子串
 * @param {*} s 字符串
 */
function longestPalindrome(s) {
    let start = 0;
    let end = 0;
    let result = ''
    function isPalindrome(left, right) {
        while(s[left] === s[right] && left >= 0 && right <= s.length){
            left--;
            right++;
        }
        return right - left + 1;
    }
    
    for (let i = 0; i < s.length; i++) {
        let len1 = isPalindrome(i, i);
        let len2 = isPalindrome(i, i+1);
        let maxLen = Math.max(len1, len2);
        if(maxLen > end - start + 1){
            start = i - Math.ceil(maxLen / 2) + 1;
            end = i + Math.floor(maxLen / 2);
            result = s.substring(start,end);
        }
    }
    return result;
}

console.log(longestPalindrome('abbaacdb'));
