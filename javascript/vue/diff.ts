type Key = string | number;
type KeyToIndexMap = {[key: string]: number}

interface VNode {
    sel: string | undefined // 相当于tag
    // data: VNodeData | undefined
    children: Array<VNode | string> | undefined
    elm: Node | undefined
    text: string | undefined
    key: Key | undefined
};

function isVnode (vnode: any): vnode is VNode {
    return isDef(vnode.sel);
}

function emptyNodeAt (elm: Node): VNode  { // 不做实现

}

function isDef (s: any): boolean {
    return typeof s !== 'undefined';
}

function isUnDef (s: any): boolean {
    return typeof s === 'undefined';
}

function sameVnode (oldVnode: VNode, newVnode: VNode): boolean {
    return oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key;
}

function addVnodes (parentNode: Node, before: Node | null, vnodes: VNode[], startIdx: number, endIdx: number) {
    for (; startIdx <= endIdx; startIdx++) {
        parentNode.insertBefore(createElm(vnodes[startIdx]), before);
    }
}

function removeVnodes (parentElm: Node, vnodes: VNode[], startIdx: number, endIdx: number) {
    for (; startIdx <= endIdx; startIdx++) {
        parentElm.removeChild(vnodes[startIdx].elm!);
    }
}

function createElm (vnode: VNode): Node { // 这里简化，不做具体实现

}

function createOldKeyToIdx (vnodes: VNode[], startIdx: number, endIdx: number): KeyToIndexMap {
    let map: KeyToIndexMap = {};

    for (; startIdx < endIdx; startIdx++) {
        map[vnodes[startIdx].key] = startIdx;
    }

    return map;

}

// patch 方法用于对oldVnode或一个已经存在的element元素做patch
function patch (oldVnode: VNode | Node, newVnode: VNode): VNode {
    if (!isVnode(oldVnode)) {
        oldVnode = emptyNodeAt(oldVnode); // 基于已有的element去创建对应的vnode
    }

    if (sameVnode(oldVnode as VNode, newVnode)) { // 如果是相同的vnode则交给patchVnode进行处理
        patchVnode(oldVnode, newVnode);
    } else { // vnode 不同，则直接基于newVnode去创建新的元素
        createElm(newVnode); // 创建新的元素

        let oldElm = oldVnode.elm!;
        let parentNode = oldElm.parentNode;
        parentNode.insertBefore(newVnode.elm!, oldElm);
        parentNode.removeChild(oldElm);

        return newVnode;
    }
}

// patchVnode 方法用于新旧两个vnode进行对比，基于新的vnode去更新老的vnode
function patchVnode (oldVnode: VNode, newVnode: VNode ) {
    let elm = newVnode.elm = oldVnode.elm!;

    if (oldVnode === newVnode) {
        return;
    }

    let ch = newVnode.children as VNode[];
    let oldCh = oldVnode.children  as VNode[];

    if (isDef(newVnode.text)) { // newVnode 是文本节点
        if (isDef(oldVnode.text)) { // oldVnode 也是文本节点
            if (newVnode.text !== oldVnode.text) {
                elm.textContent = newVnode.text;
            }
        } else {
            if (isDef(oldCh)) { // oldVnode 存在children的话移除点
                removeVnodes(elm, oldCh, 0, oldCh.length -1);
            }
        }

    } else { // newVnode不是文本节点
        if (isDef(oldVnode.text)) { // 原先的oldVnode只是简单的文本节点
            elm.textContent = '';

            if (isDef(ch)) {
                addVnodes(elm, null, ch, 0, ch.length - 1);
            }
        } else { // oldVnode和newVnode都不是文本

            if (isDef(ch) && isDef(oldCh)) {
                updateChildren(elm, ch, oldCh);
            } else if (isDef(ch)) {
                addVnodes(elm, null, ch, 0, ch.length -1);
            } else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length -1);
            }
        }
    }
}

// updateChildren 方法用于对比两个vnode数组，并通过移动，更新的方法，将newCh上的对应信息更新到oldCh对应的元素上去
function updateChildren (parentElm: Node, oldCh: VNode[], newCh: VNode[]): void { 
    let newStartIdx = 0;
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[newStartIdx];
    let newEndVnode = newCh[newEndIdx];

    let oldStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[oldStartIdx];
    let oldEndVnode = oldCh[oldEndIdx];

    let oldKeyToIdx;
    let idxInOld: number;
    let elmToMove: VNode;

    while( newStartIdx <= newEndIdx || oldStartIdx <= oldEndIdx ) {
        if (newStartVnode === null) { // 关于null 判断跟后续的尝试在已有的oldVnode中去找到可复用的vnode的处理逻辑有有关
            newStartVnode = newCh[++newEndIdx];
        } else if (newEndVnode === null) {
            newEndVnode = newCh[--newEndIdx];            
        } else if (oldStartVnode === null) {
            oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldEndVnode === null) {
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(newStartVnode, oldStartVnode)) {
            patchVnode(newStartVnode, oldStartVnode);
            newStartVnode = newCh[++newEndIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(newEndVnode, oldEndVnode)) {
            patchVnode(newEndVnode, oldEndVnode);
            newEndVnode = newCh[--newEndIdx];
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(newStartVnode, oldEndVnode)) { // 位置发生了改变
            patchVnode(oldEndVnode, newStartVnode);
            parentElm.insertBefore(newStartVnode.elm, oldStartVnode.elm); // 将原先oldEndVnode 对应的元素移动到最前面
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newEndIdx];
        } else if (sameVnode(newEndVnode, oldStartVnode)) {
            patchVnode(newEndVnode, oldStartVnode);
            parentElm.insertBefore(newEndVnode.elm!, oldEndVnode.nextElementSibling);
            newEndVnode = newCh[--newEndIdx];
            oldStartVnode = oldCh[++oldStartIdx];
        } else { // 以上情况都不满足的情况下，尝试在oldCh中找到跟newStartVnode满足sameVnode条件的vnode
            if (!oldKeyToIdx) {
                oldKeyToIdx = createOldKeyToIdx(oldCh, oldStartIdx, oldEndIdx);
            }

            idxInOld = oldKeyToIdx[newStartVnode.key];
            if (isUnDef(idxInOld)) { // 找不到，也就是根本没法复用，直接创建新的元素吧
                parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm!);                
            } else {
                elmToMove = oldCh[idxInOld];
                // if (newStartVnode.sel !== elmToMove.sel) { // key相同，但是元素tag不同，创建新的
                if (!sameVnode(newStartVnode, elmToMove)) {
                    parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm! );
                } else {
                    patchVnode(newStartVnode, elmToMove);
                    parentElm.insertBefore(elmToMove.elm!, oldStartVnode.elm!);
                    oldCh[idxInOld] = null; // 这里导致前面关于null的判断
                }
            }
            newStartVnode = newCh[++newEndIdx];
        }
    }


    if (newStartIdx <= newEndIdx ) { // oldCh 元素的数量较少
        let before = newCh[newEndIdx + 1] === null ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
    }

    if (oldStartIdx <= oldEndIdx) { // newCh 元素的数量较少
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);  
    }
}