// 滑动窗口
function solution(s){
    let result = '';
    let start = 0;
    let end = 0;
    while(end < s.length - 1){
        let temp = s.substring(start, end);
        let currentStr = s.substring(end, ++end);
        let index = temp.indexOf(currentStr);
        if(index !== -1){
            start += index + 1;
        }else{
            temp += currentStr;
        }
        if(result.length < temp.length){
            result = temp;
        }
    }
    return result.length;
}
