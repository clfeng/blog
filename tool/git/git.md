# git 学习
1. 学习资料 [pro git](https://git-scm.com/book/zh/v2)

在进行提交操作时，Git 会保存一个提交对象（commit object）。知道了 Git 保存数据的方式，我们可以很自
然的想到——该提交对象会包含一个指向暂存内容快照的指针。 但不仅仅是这样，该提交对象还包含了作者的姓
名和邮箱、提交时输入的信息以及指向它的父对象的指针。首次提交产生的提交对象没有父对象，普通提交操作
产生的提交对象有一个父对象，而由多个分支合并产生的提交对象有多个父对象
为了更加形象地说明，我们假设现在有一个工作目录，里面包含了三个将要被暂存和提交的文件。 暂存操作会
为每一个文件计算校验和（使用我们在 起步 中提到的 SHA-1 哈希算法），然后会把当前版本的文件快照保存到
Git 仓库中（Git 使用 blob 对象来保存它们），最终将校验和加入到暂存区域等待提交：
```
$ git add README test.rb LICENSE
$ git commit -m 'The initial commit of my project'
```
当使用 git commit 进行提交操作时，Git 会先计算每一个子目录（本例中只有项目根目录）的校验和，然后在
Git 仓库中这些校验和保存为树对象。 随后，Git 便会创建一个提交对象，它除了包含上面提到的那些信息外，
还包含指向这个树对象（项目根目录）的指针。如此一来，Git 就可以在需要的时候重现此次保存的快照。
现在，Git 仓库中有五个对象：三个 blob 对象（保存着文件快照）、一个树对象（记录着目录结构和 blob 对象
索引）以及一个提交对象（包含着指向前述树对象的指针和所有提交信息）。


远程仓库名：origin
远程跟踪分支是远程分支状态的引用。 它们是你不能移动的本地引用，当你做任何网络通信操作时，它们会自
动移动。 远程跟踪分支像是你上次连接到远程仓库时，那些分支所处状态的书签。
git ls-remote [remote] 来显式地获得远程引用的完整列表
git remote show [remote] 获得远程分支的更多信息

基于远程跟踪分支创建自己的本地分支
git checkout -b serverfix origin/serverfix
将远程跟踪分支的相关工作更改何如到当前所在的分支
git merge origin/serverfix
跟踪分支：从一个远程跟踪分支检出一个本地分支会自动创建所谓的“跟踪分支”。跟踪分支是与远程分支有直接关系的本地分支。
修改正在跟踪的上游分支： git branch -u origin/serverfix
git branch -vv 可查看个个分支正在跟踪的远程分支
先抓取所有的远程仓库: git fetch --all
然后看最新的的落后与领先: git branch -vv
删除远程分支：git push origin --delete serverfix

做一次rebase
git checkout experiment
git rebase master
git checkout master
git merge experiment
git rebase [basebranch] [topicbranch]


变基的风险
1. 不要对在你的仓库外有副本的分支执行变基


## todo
git指令的相关介绍，找一个认真看完，如git push,git pull


理解checkout，reset
|树|用途|
|--|--|
|HEAD|上一次提交的快照，下一次提交的父结点|
|Index|预期的下一次提交的快照|
|Working|Directory 沙盒|

分支切换的过程：
切换分支或克隆的过程也类似。 当检出一个分支时，它会修改 HEAD 指向新的分支引用，将 索引 填充为该次提
交的快照，然后将 索引 的内容复制到 工作目录 中。

reset 操作所做的事情
第 1 步： reset 做的第一件事是移动 HEAD 的指向。
无论你调用了何种形式的带有一个提交的 reset，它首先都会尝试这样做。 使用 reset --soft，仅仅是停留在第一步
第 2 步：更新索引（--mixed）
注：也就是说将HEAD所指向的内容更新到Index区域中去
git reset HEAD~ 本身也就是相当于是 git reset --mixed HEAD~
该命令会在这里停下

第 3 步：更新工作目录（--hard）
reset 要做的的第三件事情就是让工作目录看起来像索引。
git reset --hard HEAD~


# Git push
git push的一般形式为 git push <远程主机名> <本地分支名>  <远程分支名> ，例如 git push origin master：refs/for/master ，即是将本地的master分支推送到远程主机origin上的对应master分支， origin 是远程主机名，第一个master是本地分支名，第二个master是远程分支名。

## 1.1 git push origin master
如果远程分支被省略，如上则表示将本地分支推送到与之存在追踪关系的远程分支（通常两者同名），如果该远程分支不存在，则会被新建

## 1.2 git push origin ：refs/for/master 
如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支，等同于 git push origin --delete master

## 1.3 git push origin
如果当前分支与远程分支存在追踪关系，则本地分支和远程分支都可以省略，将当前分支推送到origin主机的对应分支 

## 1.4 git push
如果当前分支只有一个远程分支，那么主机名都可以省略，形如 git push，可以使用git branch -r ，查看远程的分支名

## 1.5 git push 的其他命令
这几个常见的用法已足以满足我们日常开发的使用了，还有几个扩展的用法，如下：
（1） git push -u origin master 如果当前分支与多个主机存在追踪关系，则可以使用 -u 参数指定一个默认主机，这样后面就可以不加任何参数使用git push，不带任何参数的git push，默认只推送当前分支，这叫做simple方式，还有一种matching方式，会推送所有有对应的远程分支的本地分支， Git 2.0之前默认使用matching，现在改为simple方式如果想更改设置，可以使用git config命令。git config --global push.default matching OR git config --global push.default simple；可以使用git config -l 查看配置
（2） git push --all origin 当遇到这种情况就是不管是否存在对应的远程分支，将本地的所有分支都推送到远程主机，这时需要 -all 选项
（3） git push --force origin git push的时候需要本地先git pull更新到跟服务器版本一致，如果本地版本库比远程服务器上的低，那么一般会提示你git pull更新，如果一定要提交，那么可以使用这个命令。
（4） git push origin --tags //git push 的时候不会推送分支，如果一定要推送标签的话那么可以使用这个命令

1.6 关于 refs/for
// refs/for 的意义在于我们提交代码到服务器之后是需要经过code review 之后才能进行merge的，而refs/heads 不需要

