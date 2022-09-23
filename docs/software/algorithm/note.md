## 中心扩展法（案例：最长回文子串）

- 从当前索引为中心，向四周扩展，如果扩展的区域满足条件，则继续扩展，否则记录当前区域，继续向下一个索引

## 动态规划法（案例：最长回文子串）

- 可以将待求解问题分解成若干个子问题，先求解子问题，然后**从这些子问题的解到到原问题的解**
- 与分治法不同的是，适合于动态规划求解的问题，经分解得到子问题往往不是互相独立的，若使用分治法求解这类问题，则分解得到的子问题数目太多，有些子问题被重复计算了很多次
- 如果我们能够保存已解决的子问题的答案，而在需要时再找出已求得的答案，这样就可以避免大量的重复计算，节省时间
- 可以**利用一个表（如二维数组）来记录所有已解的子问题的答案**，不管子问题以后是否被用到，只要它被计算过，就将其结果填入表中

## 双指针法（案例：盛最多水的容器、三数之和、最接近的三数之和）

- 利用两个指针来移动遍历目标结构，一个是头指针，一个是尾指针
- 需要结合具体的情况来决定下一步是移动头指针还是移动尾指针，**这一步是关键，应该通过一些公式来判断移动的指针类型**

## 二叉树遍历

- `先序遍历` - 递归【自己 --> 左子树 --> 右子树】
- `中序遍历` - 递归&【左子树 --> 自己 --> 右子树】
- `后序遍历` - 递归&【左子树 --> 右子树 --> 自己】
- `先序、后序、中序遍历` - 非递归&【**借助一个当前节点以及访问属性**，如果节点被访问过，就不继续访问。先进入左子树直到叶子节点，退出左子树，进入右子树直到叶子节点，退出右子树返回到父节点】
- `层序遍历` - 非递归&【**借助队列存储左右子树节点（非空节点）和当前节点**，先访问自己，然后依次清空队列】

## 二叉树翻转

- 无论是先序、后序、中序、层序遍历，都可以翻转二叉树
- 翻转技巧，只要**将遍历的访问逻辑改成交换左右子节点的逻辑**，其他基本一样。最终结果是，每个节点的左右子节点都会交换位置

## 链表插入（或删除）子项

- 借助一个当前指针，移动找到插入或者删除的位置

## 链表的翻转

- 递归&【先进入下一个节点(currentNode.next)直至**当前节点为空或下一节点为空**返回最后一个节点作为新的头节点(newHead)，然后开始当前结点和下一个节点的两两交换，此时当前结点(currentNode)是倒数第二个节点】

```js
reverseLinkList1() {
    const reverse = (currentNode) => {
        // 直至最后一个节点，然后返回这个节点作为新的头结点
        if (currentNode === null || currentNode.next === null) return head;
        let newHead = reverse(currentNode.next); // 新的头结点
        currentNode.next.next = currentNode; // 1 翻转指向，currentNode.next.next指向currentNode
        currentNode.next = null; // 2 currentNode.next指向空值，currentNode.next原来的指向就断了
        return newHead; // 每次遇到return都会返回上一个调用栈，这样就可以达到倒着进行两两交换的效果（重复1和2）
    }
    this.head = reverse(this.head);
    return this.head;
    // 最终返回反转后的结果
}
```

- 非递归&【使用一个当前节点(currentNode)以及一个新的头结点(newHead)。先翻转当前节点(currentNode)和下一个节点(currentNode.next)，新的头节点指向当前节点，当前节点指向下一个节点继续移动，翻转后的链表和老的链表会由新的头节点和当前节点分别作为头指针，新链表越来越长老链表越来越短】

```js
reverseLinkList2() {
    let currentNode = this.head; // 获取原来的第一个元素
    if (currentNode === null || currentNode.next === null) return currentNode; // 没有节点或者只有一个节点
    let newHead = null;
    while (currentNode != null) {
        let temp = currentNode.next; // 先保存下一个节点
        currentNode.next = newHead; // 翻转指向，currentNode.next指向newHead
        newHead = currentNode; // newHead移动到当前节点的位置
        currentNode = temp // currentNode移动到下一个节点的位置
    }
    this.head = newHead;
    return this.head;
}
```

## 贪心算法（案例：整数转罗马数字）

- 贪心算法，先把原问题分解成若干个子问题，**求子问题的最优解，再将所有子问题的最优解合并成原问题的解**
- 或枚举子问题的解，通过求除数和求余数分解出所有子问题，然后对着子问题的解来合并原问题的解

## 滑动窗口（案例：无重复字符的最长子串）

- 与双指针法有异曲同工之妙
- **关键点在于找到左右阀门的移动条件**

# 排序算法

> 不需要使用额外空间的排序算法：选择排序、插入排序、希尔排序
>
> 需要使用额外空间的排序算法：归并排序

## 选择排序

> `两个for`循环，内循环每次都在`找剩余列表的最小元素`，外循环在移动当前指针，当前指针左侧属于已排有序的列表，右侧（包括当前指针）属于未排无序列表。内循环结束后将最小元素与外循环的当前指针互换位置，然后继续下一轮

算法实现：

```js
function selection(arr) {
    let N = arr.length;
    for (let i = 0; i < N; i++) {
        let min = i;
        for (let j = i + 1; j < N; j++) {
            if (arr[j] < arr[min]) min = j; // 注意：if判断条件必须写在for循环内部，不满足条件时，循环仍会往下走
        }
        let temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
}
```

## 插入排序

> `两个for`循环，内循环在遍历已排有序列表，`将当前指针插入到有序列表中`，外循环在移动当前指针，当前指针左侧属于已排有序的列表，右侧（包括当前指针）属于未排无序列表。
>
> 注意：内循环需要在完成插入时，终止for循环，否则性能就出其不意地比选择排序还差

算法实现：

```js
function insertion(arr) {
    let N = arr.length;
    for (let i = 1; i < N; i++) {
        for (let j = i; j > 0 && (arr[j] < arr[j - 1]); j--) { // 注意：判断条件写在这里，条件不满足时，内循环会终止
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
        }
    }
}
```

## 希尔排序

> `三个for`循环，分别为内中外，中内两个循环在做插入排序（待排数组则通过外循环来控制），外循环是将h按照递增序列递减，h表示以h为间隔创建若干个子数组，每次中内循环都将这些子数组通过插入排序让他们变成有序数组
>
> 实则每次都在交换不相邻的元素，对数组的局部进行插入排序。对比单纯使用插入排序，每次交换都只能是相邻的元素（如果需要插入的位置刚好在另一头，则需要挪动N - 1次）
>
> 希尔排序不稳定表现在：性能大大高于选择排序和插入排序，因为是基于插入排序的，而插入排序的内循环可以中断，所以对有序列表会更快

实现算法：

```js
function shell(arr) {
    let N = arr.length;
    let h = 1;
    while (h < N / 50) h = 50 * h + 1;
    for (; h >= 1; h = Math.floor(h / 50)) {
        for (let i = h; i < N; i++) {
            for (let j = i; j >= h && (arr[j] < arr[j - h]); j -= h) {
                let temp = arr[j];
                arr[j] = arr[j - h];
                arr[j - h] = temp;
            }
        }
    }
}
```

## 归并排序

> 将两个有序的数组归并成一个更大的有序数组
>
> 如果是自顶向下的方式，采取尾递归方式
>
> 实际上，归并排序和希尔排序相比，运行时间之间的差距在常熟级别之内，希尔排序比归并排序快一些（经测试，10000个随机数，归并排序维持在6ms左右，希尔排序比它慢2-3s）
>
> 为啥aux不是merge的局部变量？如果每次归并都创建一个新数组，这样会成为归并排序的运行时间的主要部分（经测试，10000个随机数，这种方式的运行时间是原来的5-6倍）

自顶向下的算法实现：

```js
let aux = []; // 额外空间
function merge(arr, low, middle, high) {
    let i = low, j = middle + 1; // 左右数组的起始点
    for (let k = low; k <= high; k++) {
        aux[k] = arr[k];
    }
    for (let k = low; k <= high; k++) {
        if (i > middle) { // 左数组已经遍历结束
            arr[k] = aux[j++];
        } else if (j > high) { // 右数组已经遍历结束
            arr[k] = aux[i++];
        } else if (aux[j] < aux[i]) { // 右边数组的元素小于左边数组的元素，赋值右边数组的元素（较小的元素）
            arr[k] = aux[j++];
        } else { // 右边数组的元素大于左边数组的元素，负责左边数组的元素（较小的元素）
            arr[k] = aux[i++];
        }
    }
}
function mergeSort(arr, low, high) {
    if (high <= low) return;
    let middle = Math.floor((high - low) / 2) + low;
    mergeSort(arr, low, middle); // 归并左边数组
    mergeSort(arr, middle + 1, high); // 归并右边数组
    merge(arr, low, middle, high); // 合并左边数组和右边数组
}
```

## 快速排序

> 一种分治的排序算法。
>
> 与归并算法不同的是：归并算法是将数组分成两个子数组进行排序，并将有序的子数组归并以将整个数组排序。而排序算法则是以当前指针（切分元素）为准，左侧数组比它小，右边数组比它大，这样两个两个子数组都有序时整个数组就自然有序了

算法实现：

```js
function exch(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function partition(arr, low, high) {
    let i = low, j = high + 1; // 左右扫描指针
    let v = arr[low]; // 切分元素
    while (true) {
        // 从low+1...high左扫描
        while (arr[++i] < v) if (i === high) break; // 左指针扫描，如果左边都比切分元素小，而且扫描到了尽头，就结束；如果左边有大于切分元素的元素，退出while循环
        while (v < arr[--j]) if (j === low) break; // 右指针扫描，如果右边都比切分元素大，而且扫描到了尽头，就结束；如果右边右小于切分元素的元素，退出while循环
        if (i >= j) break; // 左指针大于等于右指针，终止
        exch(arr, i, j); // 交换，将小值放到左边，大值放到右边
    }
    exch(arr, low, j); // 将v = arr[j]放入正确的位置
    return j; // 最后的结果是 arr[low...j - 1] <= arr[j] <= arr[j + 1...high]
}
function quickSort(arr, low, high) {
    if (high <= low) return;
    let j = partition(a, low, high); // 切分
    quickSort(arr, low, j - 1); // 将左边排序
    quickSort(arr, j + 1, high); // 将右边排序
}
console.time('quickSort')
mergeSort(g, 0, g.length - 1);
console.timeEnd('quickSort')
```

## 尾递归

> 为了解决递归时`调用栈溢出`的问题，除了把递归函数改为迭代的形式外，改为`尾递归`的形式也可以解决（但需要此语言/执行环境对尾递归做过优化）

> 认识`尾递归`之前先认识`尾调用`

```js
const fn1 = (a) => {
    let b = a + 1;
    return b;
}
const fn2 = (x) => {
    let y = x + 1;
    return fn1(y); // line A
}
const result = fn2(1); // line B
```

没有对`尾调用`做优化的时候，调用栈情况：

x = 1; y = 2; line B(fn2) ==> a = 2; b = 3; line A(fn1); x = 1; y = 2; line B(fn2) ==> x = 1; y = 2; line B(fn2)

对`尾调用`做优化的时候，调用栈情况：

x = 1; y = 2; line B(fn2) ==> a = 2; b = 3; line B(fn1)

> 区别就在于对`尾调用`做了优化时，调用栈的大小明显减小了很多，fn1返回值只需要返回给`line B`即可

达到尾调用的条件：

- 必须是在return后面调用函数。直接调用而没有return的时候不是一个尾递归
- 除了函数调用，不能有其他副作用：条件判断||或&&、运算操作+ - * /等

> 使用迭代的形式代替`递归`，如果是尾递归，直接协议循环，只要返回值是函数，就一直调用即可；但如果不是尾递归就麻烦点，就是拿个栈来模拟递归的过程