// 输入:[a1,a2...an]，每个数代表坐标中的一个点
// 双指针法
// 1. 左右边界，小者不可能作为边界，所以小者需要移动
//    - Min(x,y)*t = x*t (当且仅当x<=y)
//    - 如若使用小者作为边界，大者移动，那么后面的区域最多也不超过x*t
// 2. 缩小边界的过程，记录左右边界之间的最大区域

function maxArea(height) {
    let result = 0;
    let left = 0; // 左指针
    let right = height.length - 1; // 右指针
    while (left < right) {
        let area = Math.min(height[left], height[right]) * (right - left);
        result = Math.max(area, result);
        if (height[left] <= height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return result
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
