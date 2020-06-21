# virtual dom 学习
## 历史演进
### MVC

![mvc](./mvc.png)

关键点：通信是单向，View层的信息只发给Controller层；Model层在数据改变之后可以直接点用View的相应api进行视图的更新，Controller 负责逻辑的处理，在处理完之后调用Model层的相应接口更新相应的数据

现实例子理解：用户对页面进行一个点击操作，从而出发了对应的函数（Controller层），函数处理的结果便是对某些数据进行了修改（更新Model层），Model层在调用相应的api去更新界面（View）

### MVP

![mvp](./mvp.png)

关键点：相较于MVC模式，MVP模式下，View，Model层不做直接沟通，所有的信息都交由Presenter进行处理与再次分发。在这种模式下Presenter会变得非常复杂。

现实例子理解：用户对页面（View）进行一个点击操作，从而出发了对应的函数（Presenter层），函数处理的结果便是对某些数据进行了修改（更新Model层），Model层在更新完数据之后，知道需要进行更新哪部分的视图，于是将指令分发给Presenter，Presenter再调用View相应的额api去更新页面（View）

### MVVM

![mvvm](./mvvm.png)

关键点：和MVP模式很像，Presenter部分变成了ViewModel，所以本质上ViewModel在处理着Presenter的工作，只是在实现上ViewModel的方式更加的智能，内部实现了一种双向数据绑定的机制，从而做到Model层的数据发生变化的时候，自动触发ViewModel层，然后ViewModel层在将对应的数据直接映射成为View。同样视图层的改变也会自动触发ViewModel层，ViewModel也会自动将对应的视图变化映射层对应的数据，并更新model层的数据



上面提到的一点就是ViewModel内部实现的双向数据绑定，其能够自动的Model层的映射成为相应的View，那么怎么高效的更新？

一般而言，model层会有大量的数据，这些数据共同映射出了一个完整的页面，而每次用户的操作，触发相应的处理逻辑之后，并不会修改映射出该页面的所有数据，显然如果只有部分的数据更新了（对应页面的某个小的部分），而我们且重新渲染了整个页面，这样太低效了。因此我们期望能做到，只修改变动数据所映射到的那小块的视图。要怎么做到？virtual dom是一种比较高效的方式。





## snabbdom

### patch方法：

*function* patch (*oldVnode*: VNode | Element, *vnode*: VNode): VNode 对比两个vnode并进行更新

具体逻辑：

1. 如果oldVnode是Element 则根据Element创建对应的vnode节点
2. 用sameVnode(oldVnode, vnode)判断是否是同一个vnode，满足就调用patchVnode(oldVnode, vnode, insertedVnodeQueue) 进行详细的对比更新
3. 不满足sameVnode(oldVnode, vnode)则根据vnode创建新的元素，替换掉老的元素



### patchVnode 方法

*function* patchVnode (*oldVnode*: VNode, *vnode*: VNode, *insertedVnodeQueue*: VNodeQueue)

1. isUndef(vnode.text)即vnode不是文本节点

   a. isDef(oldCh) && isDef(ch)且oldCh !== ch调用updateChildren(elm, oldCh, ch, insertedVnodeQueue)进行子节点的对比更新

   b. isUndef(oldCh) &&  isDef(ch)时：如果oldVnode.text定义了则置空一下，然后根据ch创建相应的子vnode

   c. isUndef(ch) && isDef(oldCh)时：则移除oldCh对应的子节点

   d. isUndef(oldCh) && isUndef(ch)时，如果oldVnode.text存在则置空一下

2. isDef(vnode.text) 

   a. 如果isDef(oldCh), 则把oldCh对应的vnode给移除掉

   b. isUndef(oldCh), 则将vnode.text 赋值给oldVnode.text

### updateChildren 方法

*function* updateChildren (*parentElm*: Node,  *oldCh*: VNode[], *newCh*: VNode[], *insertedVnodeQueue*: VNodeQueue)

整个对比通过一层while循环进行

相关的变量定义：

```
let oldStartIdx = 0 // 指向需要进行对比的oldCh的头部
let newStartIdx = 0 // 指向需要进行对比的ch的头部
let oldEndIdx = oldCh.length - 1 // 指向需要进行对比的oldCh的尾部
let oldStartVnode = oldCh[0]
let oldEndVnode = oldCh[oldEndIdx]
let newEndIdx = newCh.length - 1 // 指向需要进行对比的ch的尾部
let newStartVnode = newCh[0]
let newEndVnode = newCh[newEndIdx]
let oldKeyToIdx: KeyToIndexMap | undefined
let idxInOld: number
let elmToMove: VNode
let before: any
```



整个对比逻辑：

1. sameVnode(oldStartVnode, newStartVnode)时，调用patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)进行对比更新，oldStartIdx、newStartIdx指针均后移
2. sameVnode(oldEndVnode, newEndVnode)时，调用patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)进行对比更新，oldEndIdx、newEndIdx均前移
3. sameVnode(oldStartVnode, newEndVnode)时，patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)进行对比更新，同时将oldStartVnode对应的元素节点移动到当前oldEndVnode节点对应的元素节点后面去。oldStartIdx前移，newStartIdx后移。
4. sameVnode(oldEndVnode, newStartVnode)时，调用patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)进行对比更新，同时将oldStartVnode对应的元素节点移动到oldEndVnode对应的额元素节点的后面去。oldEndIdx迁移，newStartIdx后移
5. 以前的情况都不满足（ch中各个节点的位置不是简单的不变，移动到最前，移动到最的情况）：尝试在剩余的oldCh中去找是否存在和newStartVnode key相同的vnode，如果找不到的说明newStartVnode是个全新的vnode则创建新的元素，能找到（将找到的vnode赋值给elmToMove）则说明是由老的vnode变化过来的。那么就对比下elmToMove.sel !== newStartVnode.sel，如果元素的tag都不不同了，那么创建新元素吧。如果相同，这用patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)进行对比更新。然后将elmToMove对应的元素移动到newStartVnode对应元素的前面，同时需要将elmToMove节点在oldCh中的对应的位置上的元素置空下，因为该oldVnode已经被移走了。到此newStartVnode便处理完了，所以newStartId前移下
6. 最后，如过oldStartIdx > oldEndIdx，说明ch的vnode要比oldCh的元素多，所以为剩余的ch中的vnode创建相应的元素，并往文档上添加；否则说明oldCh比ch的vnode多，则需要将剩余的oldCh中的vnode对应的元素节点从页面上移除掉

## vue diff 算法

**注**: vue关于virtual dom一块的内容的实现基本都是参考snabbdom的实现的，snabbdom可以说是最简洁的实现，代码看起来更为的清晰，而vue则在snabbdom的基础之上，根据框架的特定，修改了某些步骤的判断逻辑，但是大体的逻辑结构与对比算法是一致的；以下先列出其不同之处，然后作为了解，也会对vue的diff算法进行阅读并用文字进行描述其主要逻辑（**建议关注不同点就好了，vue diff算法部分是我自己拿来做笔记的哈**）

**不同点：**

vnode的定义：

snabbdom的vnode定义非常简洁，而vue的vnode定义多了很多的内容，想isStatic自定，组件相关的内容，如isAsyncPlaceholder等

1. patch 方法：

a. snabbdom的patch方法要求传入的oldVnode和vnode都是存在的，但是vue的patch方法，oldVnode和vnode都是可选的，内部逻辑需要考虑不存在的情况。

b. vue还传入了如hydrating，removeOnly等额外的参数，这些都是vue框架特殊的地方

2. patchVnode 方法：

   a. 对于isDef(vnode.text)情况下，snabbdom回去判断下oldCh是否存在，存在则移除。而vue则比较粗暴，直接将进行dom操作，将vnode对应的元素的文本复制为vnode.tex

   b. 在函数的头部多了很多如isStatic，isAsyncPlaceholder的相关判断等

3. updateChildren方法（对比算法逻辑基本一致）

   a. vnode.key 为undefined的场景下也会尝试着从oldCh中去找到和newStartVnode满足sameVnode添加的oldVnode，当然，vue的sameVnode又自己的判断逻辑，但也是会对key进行对比，key相等作为首要条件。而这里vnode.key 为undefined还去找的是因为oldCh也会存在key为undefined的vnode（用户就没定义vnode的key的场景）。



patch 方法：
用于简单对比vnode和oldVnode，看是否只是简单的删除创建还是调用patchVnode进一步对比

1. 有vnode，但是没有oldVnode，则创建新元素

2. 有oldVnode，但是没有vnode，则移除老的元素

3. vnode和oldVnode都存在

   a. 是否是两个相同类型的vnode的对比（满足非真实元素，且sameVnode为true）调用patchVnode进一步对比

   b. 不满足调用patchVnode进行对比的条件，则创建新的元素去替换掉老的元素

   

patchVnode：用于两个根节点的对比（vnode和oldVnode）

注：关于vnode.text 代表的含义：
```
The .text property is created when a virtual node is created with only a single child that possesses text and only requires document.createTextNode() to be used.

For example: h('h1', {}, 'Hello') will create a virtual node with Hello as its .text property.
```
以上解释来自[snabbdom](https://github.com/snabbdom/snabbdom#text--string) 意思就是：如果vnode只有单孩子节点，并且这个孩子节点为文本节点，便会自动创建 .text属性
1. vnode有文本（就是是否元素本身就只是拿来显示文本的），则跟oldVnode文本的对比下，如果不同就更新下

2. vnode没有文本

   a. vnode 有children

   ​	a1. oldVnode有children，则调用updateChild对children进行对比更新

   ​	a2. oldVnode没有children，则将则将vnode的children添加到oldvnode对应的元素上去，同时要将oldVnode的将文本置空

   b. vnode 没有children

   ​	b1. oldVnode 有children，移除oldVnode的children

   ​	b2. oldVnode 没有children，看下oldVnode有没文本有的话要置空

updateChildren 方法用于两个节点的孩子节点直接的比较（ch 和oldCh）

ch和oldCh各有两个指针，分别指向数组的首尾，每次对比对比的都是数组的首位，也就是四个元素直接互相对比

ch对应的指针为newStartVnode，newEndVnode；

oldCh对应的指针为oldStartVnode，oldEndVnode；

在满足(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx)条件时，进行以下操作

1. oldStart 为undefined指针后移

2. endStart为undefined指针前移

3. sameVnode(oldStartVnode, newStartVnode) 时，进行patchVnode后newStartVnode，oldStartVnode指针都后移

4. sameVnode(oldEndVnode, newEndVnode)时，进行patchVnode后oldEndVnode, newEndVnode指针都前移

5. sameVnode(oldStartVnode, newEndVnode)时，进行patchVnode后需要将oldStartVnode对应的元素移动到oldEndVnode对应的元素的后面，然后oldStartVnode指针前移，newEndVnode指针后移

6. sameVnode(oldEndVnode, newStartVnode)时，进行patchVnode后需要将oldEndVnode对应的元素移动的到oldStartVnode对应元素的前面，然后oldEndVnode指针前移，newStartVnode指针后移

7. 以上条件都不满足：根据newStartVnode的key在剩余的oldCh中能否找到（newStartVnode，newEndVnode限定范围）：

   a. 找不到，创建新元素

   b. 能找到，找到的vnode定义为vnodeToMove

   ​	b1. 满足sameVnode(vnodeToMove, newStartVnode)条件，则进行patchVnode，之后vnodeToMove将对应的元素移动到oldStartVnode对应元素的前面，同时要将oldCh中与vnodeToMove相对应的位置置undefined（这也是为什么会有循环的1、2步骤）

   ​	b2. 不满足sameVnode(vnodeToMove, newStartVnode)条件，则根据创建新的元素，插入oldStartVnode对应元素的前面

   做完b1 和 b2 之后将newStartVnode的指针前移

跳出循环之后：

1. oldStartIdx > oldEndIdx 时（ch的元素比较多），则根据newStartVnode，newEndVnode创建新的元素添加都兄弟元素的最后去
2. newStartIdx > newEndIdx时（oldCh的元素比较多），则根据oldStartVnode，oldEndVnode将已经无用的元素删除掉



### 尝试手写一下diff算法

基于snabbdom的diff算法来写，这个比较纯粹

```
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
```





### 其他关于diff算法需要关注的点

1. 时间复杂度方面：

   a. 如果不采用diff算法，没有key的话，[时间复杂度为O(n^3)](https://www.zhihu.com/question/66851503)

   b. 使用了之后其时间复杂度变成了O(n)

   简单证明下时间复杂度为什么是O(n):

   假设oldDomTree的节点数为n1，newDomTree的节点数为n2，则有：

   n1 = a1 + a2 + a3 + ... + an  (ai代表树的第i层存在ai个节点)
   n2 = b1 + b2 + b3 + ... + bn

   通过对比的方式，我们知道ai 跟 bi 会组成一个while循环的对比，且循环执行的次数是 min(ai, bi);

   那么最后的时间复杂的为 min(a1, b1) + min(a2, b2) + min(a3, b3) + ... + min(ai, bi)  <= min(n1, n2) 所以时间复杂度为O(n)

2. 为什么是通过执行newStartVnode，newEndVnode，oldStartVnode，oldEndVnode对进行对比，而不是每次在ch中取一个元素，然后在oldCh中去寻找对应的值？因为这样的话时间复杂度会变成O(n^2);

   证明也比较简单，就是假设数的某一层中oldCh长度为n1 ，ch为n2。这n1 中取一项，然后到 ch中去寻找相同项的期望值为 n2 / 2，然后在乘以 n1项，最后为(n1 * n2) / 2，所以时间复杂度为 O(n^2)

## 参考资料

https://juejin.im/post/5a3c7677f265da430406cd54

https://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html