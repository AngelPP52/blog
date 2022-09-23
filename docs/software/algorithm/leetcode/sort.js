function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let arr = Array(10000).fill(0).map((v, i) => random(1, 10000));
let a = arr.slice();
let b = arr.slice();
let c = arr.slice();
let d = arr.slice();
let e = arr.slice();
let f = arr.slice();
let g = arr.slice();


function less(a, i, j) {
    return a[i] < a[j];
}

// 选择排序
function selection(arr) {
    let N = arr.length;
    for (let i = 0; i < N; i++) { // 外循环是
        let minIdx = i; // 记录最小元素的位置
        for (let j = i + 1; j < N; j++) {
            if (less(arr, j, minIdx))
                minIdx = j;
        }
        let temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}
// console.time('selection')
// selection(a);
// console.timeEnd('selection')

function selection2(arr) {
    let N = arr.length;
    for (let i = 0; i < N; i++) {
        let min = i;
        for (let j = i + 1; j < N; j++) {
            if (less(arr, j, min))
                min = j;
        }
        let temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
}
console.time('selection')
selection(b);
console.timeEnd('selection')

// HACK 插入排序
function insertion(arr) {
    let N = arr.length;
    for (let i = 0; i < N; i++) {
        let current; // 将值插入到有序列表时，记录当时指针指向的值，在后续遍历时，将数组往右移动一个位置
        for (let j = 0; j < i + 1; j++) {
            if (arr[i] < arr[j] && typeof current === 'undefined') {
                current = arr[j];
                arr[j] = arr[i];
                continue;
            }
            if (typeof current === 'number') { // 交换位置
                let temp = current;
                current = arr[j];
                arr[j] = temp;
            }
        }
    }
}
// console.time('insertion')
// insertion(c);
// console.timeEnd('insertion')

function insertion2(arr) {
    let N = arr.length;
    for (let i = 1; i < N; i++) {
        for (let j = i; j > 0 && less(arr, j, j - 1); j--) {
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
        }
    }
}

console.time('insertion')
insertion2(d);
console.timeEnd('insertion')

// 希尔排序
function shell(arr) {
    let N = arr.length;
    let h = 1;
    while (h < N / 50) h = 50 * h + 1;
    for (; h >= 1; h = Math.floor(h / 50)) {
        for (let i = h; i < N; i++) {
            for (let j = i; j >= h && less(arr, j, j - h); j -= h) {
                let temp = arr[j];
                arr[j] = arr[j - h];
                arr[j - h] = temp;
            }
        }
    }
}
console.time('shell')
shell(e);
console.timeEnd('shell')

let aux = [];
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
    mergeSort(arr, low, middle);
    mergeSort(arr, middle + 1, high);
    merge(arr, low, middle, high);
}
console.time('mergeSort')
mergeSort(f, 0, f.length - 1);
console.timeEnd('mergeSort')


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
    let j = partition(a, low, high);
    quickSort(arr, low, j - 1);
    quickSort(arr, j + 1, high);
}
console.time('quickSort')
mergeSort(g, 0, g.length - 1);
console.timeEnd('quickSort')