// 思路：先排序，再使用双指针法
// 1. 左指针和右指针的移动决定条件
//      - 如果一轮求到的结果比目标还小，左指针右移
//      - 如果一轮求到的结果比目标还大，右指针左移

function threeSumClosest(nums, target) {
    nums = nums.sort(); // 使用自己的排序算法
    let left = 0;
    let right = nums.length - 1;
    let result = Number.MAX_SAFE_INTEGER;
    function cloestNumber(nums, target) {
        let index = 0;
        let num = Number.MAX_SAFE_INTEGER;
        do {
            let _num = nums[index++];
            if (Math.abs(_num - target) < Math.abs(num - target)) {
                num = _num;
            }
        } while (index < nums.length);
        return num;
    }
    while (left < right) {
        let less = target - (nums[right] + nums[left]);
        let threeNum = cloestNumber(nums.slice(left + 1, right), less); // 从left~right之间的数中找最接近less的第三个值
        result = cloestNumber([threeNum + nums[left] + nums[right], result], target); // 从[sum, result]中找最接近target的值

        if (result > target) { // 结果大于目标，右指针左移
            right--;
        } else if (result < target) { // 结果小于目标，左指针右移
            left++;
        } else {
            return result;
        }
    }
    return result;
}

console.log(threeSumClosest([-1, 2, 1, -4], 1));
