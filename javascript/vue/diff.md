# Vue diff算法

## patch 方法：用于简单对比vnode和oldVnode，看是否只是简单的删除创建还是调用patchVnode进一步对比

1. 有vnode，但是没有oldVnode，则创建新元素

2. 有oldVnode，但是没有vnode，则移除老的元素

3. vnode和oldVnode都存在

   a. 是否是两个相同类型的vnode的对比（满足非真实元素，且sameVnode为true）调用patchVnode进一步对比

   b. 不满足调用patchVnode进行对比的条件，则创建新的元素去替换掉老的元素

   

## patchVnode：用于两个根节点的对比（vnode和oldVnode）

注：关于vnode.text 代表的含义：
```
The .text property is created when a virtual node is created with only a single child that possesses text and only requires document.createTextNode() to be used.

For example: h('h1', {}, 'Hello') will create a virtual node with Hello as its .text property.
```
以上解释来自[snabbdom](https://github.com/snabbdom/snabbdom#text--string) 意思就是：如果vnode只有单孩子节点，并且这个孩子节点为文本节点，便会自动创建 .text属性
1. vnode有文本（就是是否元素本身就只是拿来显示文本的），则根oldVnode文本的对比下，如果不同就更新下

2. vnode没有文本

   a. vnode 有children

   ​	a1. oldVnode有children，则调用updateChild对children进行对比更新

   ​	a2. oldVnode没有children，则将则将vnode的children添加到oldvnode对应的元素上去，同时要将oldVnode的将文本置空

   b. vnode 没有children

   ​	b1. oldVnode 有children，移除oldVnode的children

   ​	b2. oldVnode 没有children，看下oldVnode有没文本有的话要置空

## updateChildren 方法用于两个节点的孩子节点直接的比较（ch 和oldCh）

ch和oldCh各有两个指针，分别指向数组的首位，每次对比对比的都是数组的首位，也就是四个元素直接互相对比

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

