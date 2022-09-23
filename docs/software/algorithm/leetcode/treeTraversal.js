// 非递归 - 先序遍历
function preTraversal(node) {
    let currentNode = node;
    while(currentNode){
        // visit node
        if(!currentNode.visited){
            currentNode.visited = true;
            console.log(currentNode.v);
        }
        if(currentNode.left && !currentNode.left.visited){
            currentNode.left.parent = currentNode;
            currentNode = currentNode.left;
        }else if(currentNode.right && !currentNode.right.visited){
            currentNode.right.parent = currentNode;
            currentNode = currentNode.right;
        }else {
            currentNode = currentNode.parent;
        }
    }
}

// 非递归 - 后序遍历
function postTraversal(node) {
    let currentNode = node;
    while(currentNode){
        // visit node
        if(currentNode.left && !currentNode.left.visited){
            currentNode.left.parent = currentNode;
            currentNode = currentNode.left;
        }else if(currentNode.right && !currentNode.right.visited){
            currentNode.right.parent = currentNode;
            currentNode = currentNode.right;
        }else {
            if(!currentNode.visited){
                currentNode.visited = true;
                console.log(currentNode.v);
            }
            currentNode = currentNode.parent;
        }
    }
}

// 非递归 - 中序遍历
function inorderTraversal(node) {
    let currentNode = node;
    while(currentNode){
        // visit node
        if(currentNode.left && !currentNode.left.visited){
            currentNode.left.parent = currentNode; // 如果是正常的tree node，这一步其实可以省略
            currentNode = currentNode.left;
        }else if(currentNode.right && !currentNode.right.visited){
            currentNode.right.parent = currentNode;
            currentNode = currentNode.right;
        }else {
            if(!currentNode.visited){
                currentNode.visited = true;
                console.log(currentNode.v);
            }
            currentNode = currentNode.parent;
            if(currentNode && !currentNode.visited){
                currentNode.visited = true;
                console.log(currentNode.v);
            }
        }
    }
}

let root = {v:1, left: {v: 2, left: {v: 3}, right: {v:4}}, right: {v:5,left:{v:6},right:{v:7}}}
postTraversal(root);