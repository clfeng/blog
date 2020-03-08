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

