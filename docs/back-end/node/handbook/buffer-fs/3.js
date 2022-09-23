// 单向链表的实现
class LinkedNode {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.size = 0; // 记录链表长度，防止插入时的index越界
        this.head = null;
    }
    add(index, data) {
        let node;
        if (typeof data === 'undefined') { // 不传index的情况
            this.head = new LinkedNode(index, this.head);
        } else {
            if (index > this.size) { throw Error('index越界!') }
            if (index === 0) { // 从头部插入
                this.head = new LinkedNode(data, this.head);
            } else { // 从中间插入
                let preNode = this.getNode(index - 1);
                node = new LinkedNode(data, preNode.next);
                preNode.next = node;
            }
        }
        this.size++;
    }
    getNode(index) {
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
    reverse() {
        const reverse = (head) => {
            if (head === null || head.next === null) { return head; } // 终止条件
            let newHead = reverse(head.next);
            head.next.next = head;
            head.next = null;
            return newHead;
        }

        this.head = reverse(this.head);
    }
}

let ll = new LinkedList();
ll.add(0, 100);
ll.add(1, 200);
ll.add(2, 300);
ll.reverse();
console.dir(ll, { depth: 1000 });