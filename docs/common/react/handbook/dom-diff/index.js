/**
 * DOM-Diff入口（这里应该关心两两节点之间的对比。所有DOM相关等操作，尽量都在这里面做）
 * 
 * @param {*} parentDOM 根节点（真实DOM）
 * @param {*} oldVDOM 旧节点
 * @param {*} newVDOM 新节点
 */
function compareTowVDOM(parentDOM, oldVDOM, newVDOM) {
    if (oldVDOM === null || newVDOM === null) { // 存在空节点
        if (oldVDOM === null && newVDOM !== null) { // 老节点是空节点
            let dom = createDOM(newVDOM);
            parentDOM.appendChild(dom);
            newVDOM.dom = dom;
        } else if (oldVDOM !== null && newVDOM === null) { // 新节点是空节点
            parentDOM.removeChild(oldVDOM.dom);
            let classInstance = oldVDOM.dom.classInstance;
            if (classInstance && classInstance.componentWillUnmount) {
                classInstance.componentWillUnmount();
            }
        } else if (oldVDOM === null && newVDOM === null) { // 均是空节点
            // 啥都不做
        }
    } else { // 都不是空节点
        if (typeof newVDOM === 'string' || typeof newVDOM === 'number') { // 如果新节点是文本节点，直接替换
            // 删除老节点
            parentDOM.removeChild(oldVDOM.dom);
            let classInstance = oldVDOM.dom.classInstance;
            if (classInstance && classInstance.componentWillUnmount) {
                classInstance.componentWillUnmount();
            }

            // 添加文本节点
            let dom = createDOM(newVDOM);
            parentDOM.appendChild(dom);
        } else {
            if (oldVDOM.type !== newVDOM.type) { // 类型不一致
                // 删除老节点
                parentDOM.removeChild(oldVDOM.dom);
                let classInstance = oldVDOM.dom.classInstance;
                if (classInstance && classInstance.componentWillUnmount) {
                    classInstance.componentWillUnmount();
                }

                // 添加新节点
                let dom = createDOM(newVDOM);
                parentDOM.appendChild(dom);
                newVDOM.dom = dom;
            } else { // 类型一样
                updateElement(oldVDOM, newVDOM);
            }
        }
    }
    return newVDOM;
}


/**
 * 新老节点类型一样，根据新的VDOM更新老的真实DOM
 * 
 * @param {*} parentDOM 根节点（真实DOM）
 * @param {*} oldVDOM 旧节点
 * @param {*} newVDOM 新节点
 */
function updateElement(oldVDOM, newVDOM) {
    let dom = newVDOM.dom = oldVDOM.dom;
    if (oldVDOM.type === 'string') { // 普通节点
        updateChildren(dom, oldVDOM.children, newVDOM.children);
        updateProps(dom, newVDOM.props);
    } else if (typeof oldVDOM.type === 'function') { // 组件节点
        let classInstance = oldVDOM.dom.classInstance;
        if (classInstance) {
            if (classInstance.componentWillReceiveProps) {
                classInstance.componentWillReceiveProps()
            }
            classInstance.$updater.emitUpdate(newVDOM.props);
        }
    }
}

/**
 * 更新孩子（这里应该关心孩子的比对，增删孩子等情况）
 * 
 * @param {*} dom 老的真实dom
 * @param {*} oldChildren 老节点孩子
 * @param {*} newChildren 新节点孩子
 */
function updateChildren(dom, oldChildren, newChildren) {
    // 依次比对
    // 不是数组封装成数组
    let oldChildrenArray = oldChildren && Array.isArray(oldChildren) ? oldChildren : [oldChildren];
    let newChildrenArray = newChildren && Array.isArray(newChildren) ? newChildren : [newChildren];

    // todo...
    let count = Math.min(oldChildrenArray.length, newChildrenArray.length);
    for (let index = 0; index < count; index++) {
        compareTowVDOM(dom, oldChildrenArray[index], newChildrenArray[index])
    }
}

/**
 * 更新真实DOM的属性
 * 
 * @param {*} dom 真实DOM
 * @param {*} props 新节点的属性
 */
function updateProps(dom, props) {
    for (let key in props) {
        if (key === 'children') { continue } // 不处理孩子
        else if (key === 'style') { // 样式
            let style = newProps[key];
            for (let attr in style)
                dom.style[attr] = style[attr];
        } else if (key.startsWith('on')) { // 事件
            addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
        } else {
            dom[key] = newProps[key];
        }
    }
}