---
title: Git 原理
description: Git 原理
status: active
---

Git 是一个分布式的版本管理系统，Git 存储区域分为如下

1. 远程仓库(Remote repository)
2. 本地仓库(Local repository)
3. 暂存区(Index)
4. 工作目录(Working directory)

抛开远程仓库，Git 是如何在本地存储的呢？先介绍几个概念

## Git 存储的数据结构

Git 数据存储与 `.git` 文件内，可以使用 `git init` 在一个新的文件夹中初始化一个 Git 仓库，此时 `.git` 文件夹内会包含如下文件

- `objects`: git 对象存储目录
- `refs`: git 引用存储目录
- `HEAD`: 指向当前分支的引用
- ...

从 `git push` 来了解 Git 存储的数据结构

### Git objects

Git objects 保存如下信息

1. git blob object: 存储文件了文件的具体信息
2. git tree object: 存储一次快照的文件结构及文件信息
3. git commit object: 存储一次提交信息

举个例子来说

```bash
# 在新项目中添加 2 个文件 `a.js`，`test/b.js`
git add a.js
git add test/b.js
git commit -m"第一次提交"

# 对 a.js，添加一行代码，const a = 1;
git add a.js
git commit -m"第二次提交"
```

此时 `.git/objects` 文件夹下会新增一些文件，用记事本打开会发现是乱码，可以使用 `git cat-file` 去查看每个文件的内容

#### Git commit object

```bash
git log # 使用git log 查看刚刚的提交，可以得到如下信息
###
commit 25e92cd7065af3b62175e51002a1cccb1606be64 (HEAD -> master)
Author: --
Date:   --

    第二次提交

commit e174c657372e578247bb8d68c58cda553ad7c2c0
Author: --
Date:   --

    第一次提交
###
```

```bash
git cat-file -p 25e92cd7065af3b62175e51002a1cccb1606be64 # 使用 git cat-file 查看该文件
###
tree 96f023320009a6c7f62c0e4dd4ff67988b7f88ef
parent e174c657372e578247bb8d68c58cda553ad7c2c0
author --
committer --

第二次提交
```

可以看到 git commit object 保存了包含如下信息

- 对应的 git tree object 的 id
- parent commit id，借此可以向上回溯，查找以前的提交
- 提交作者信息
- 提交信息

#### Git tree object

```bash
git cat-file -p 96f023320009a6c7f62c0e4dd4ff67988b7f88ef # 查看第二次提交的 tree object
###
100644 blob 6d3cec7eeef8f0b277aa69f33d8b455486af3e84    a.js
040000 tree 02297868a17b237dcec74d750e7d06b44c312f1d    test # 同样查看 02297868a...，包含如下信息
   100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391    b.js
###

```

可以看到 git tree object 保存了如下信息

1. 文件的目录结构
2. 每个文件的文件类型（例如 100644 表示的 normal file），文件名，文件对应的 git blob object

还可以对比下第一次提交的 tree object 和第二次提交的 tree object

```bash
git cat-file -p b44c41490a8ff0a0b8058bed8e0bae628d0bdb75 # 查看第一次提交的 tree object
###
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391    a.js
040000 tree 02297868a17b237dcec74d750e7d06b44c312f1d    test
###
```

可以发现针对没有修改的文件 `test/b.js` 它的 git object id 是没有变化的，而 `a.js` 对应的 git object id 发生了变化

#### Git blob object

```bash
git cat-file -p 6d3cec7eeef8f0b277aa69f33d8b455486af3e84 # 查看blob object
###
const a = 1;%
###
```

可以看到 git blob object 保存了文件的具体内容

综上所述，我们可以通过一个 commit id 来找到对应的 tree object，进而找到对应的 blob object

### Git refs

Git refs 保存了如下信息

1. git branch head: 分支的指针(commit id)
2. git tag head: 标签的指针(commit id)

举个例子来说

```bash
git checkout -b dev #创建新的dev分支
# 修改 a.js 的内容为 const a = 2;
git add a.js
git commit -m"第三次提交"
git tag v1.0.0
```

可以看到在 `refs/headers` 目录下新增了一个 dev 文件，打开 dev 文件，可以看到记录了当前分支的 commit id

```txt
// refs/headers/dev
1f731ac32652e1cc7db038d1fbfe304095a13f82
```

可以看到在 `refs/tags` 目录下新增了一个 dev 文件，打开 1.0.0 文件，可以看到记录了当前分支的 commit id

```
// refs/tags/1.0.0
1f731ac32652e1cc7db038d1fbfe304095a13f82
```

综上所述，每个分支只是记录了当前分支的 HEAD（commit id），通过 commit id 可以回溯其他信息

### Git index

Git index 保存了在暂存区中每个文件的信息

举个例子来说

```bash
# 修改 a.js 的内容为 const a = 3
git add a.js
git ls-files -s #查看暂存区的文件信息
###
100644 44a9bf569d4ca633458d76d6ac832a43e51083ed 0       a.js
100644 e69de29bb2d1d6434b8b29ae775ad8c2e48c5391 0       test/b.js
###
```

可以看待由于修改了 `a.js`，所以它的 git object id 发生了变化，且通过 id 找到对应的文件内容

## Git 的合并策略

我们采用 `git merge | rebase $branch` 来合并分支，而且 git 是采用逐个文件，逐行去合并的。那么针对每一行，极有可能出现
A,B 分支同文件，同代码行数的代码不一致

举个例子，以在 master 分支合并 dev 分支

在 master 分支中，第 1 行代码为 `const a = 1;`
在 dev 分支中，第 1 行代码为 `const a = 2;`

那么在此时，我们需要一个策略来判断到底该保存谁的结果，这就是**三方合并**

### 三方合并

三方合并的三方指的是 Mine（当前分支 master），Others（合并进来的分支 dev），Base（比较基准）。以 Mine HEAD 和 Others HEAD 去找到他们的公共祖先做为比较基准。

举个例子，还是以在 master 分支合并 dev 分支

假设，我们找到的基础节点中，第一行的代码为 `const a = 1;`

在 master 分支中，代码和基础节点一致；在 dev 分支中，对于 Base 来说是存在变化的，则应该保留 dev 的代码

#### 三方合并冲突

在三方合并中，如果对于 Base，Mine 和 Others 都存在变化，那么此时就会产生冲突，此时就需要人为来处理冲突了

举个例子，还是以在 master 分支合并 dev 分支

假设，我们找到的基础节点中，第一行的代码为 `const a = 0;`

在 master 分支和 dev 分支都对于 Base 来说存在变化，则此时就会出现冲突

### Git merge 策略

git merge 有几种不同的模式，git 会智能的选取某个模式，当然也可以直接指定 git merge -s $策略，常见的如下

### Fast forward

在合并的时候，Mine 未出现任何修改，在合并 Others 时，Mine HEAD 直接指向了 Others 的 HEAD

### Recursive

这应该是我们最经常用到的策略了。我们刚刚提到了三方合并，通过 Mine HEAD 和 Others HEAD 去找到它们的公共祖先，但是在实际应用中，公共祖先可能远不止一个，那么在此时以不同的公共祖先为基准，可能会导致不同的结果

举个例子，还是以在 master 分支合并 dev 分支

在 master 分支中，第 1 行代码为 `const a = 1;`
在 dev 分支中，第 1 行代码为 `const a = 2;`

假设

- CommonAncestor1 的第一行代码是 `const a = 1;`，那么此时应该保留 dev 分支
- CommonAncestor2 的第一行代码是 `const a = 2;`，那么此时应该保留 master 分支
- CommonAncestor1 的第一行代码是 `const a = 3;`，那么此时应该报冲突

所以 git 采取**递归三方合并**策略，当存在多个公共祖先时，先把公共祖先进行一次三方合并，合并出一个虚拟的 Base，然后以这个虚拟的 Base 为基准，再去比较 Mine 和 Others。此时新的 commit 会有点特殊，该 commit 会同时指向两个父 commit

```bash
git cat-file -p 0a888812fe01cee0d2e5571c7d0f27d5f3291448
###
tree 0560d7fcf514e8c5e10d0002a6a275fa6d5a37ec
parent a030f6e4ea6677f825cd3260d477e1c7efb83f4d
parent dabde991ccdd81dc8145e345ba46517339cdfb5c
author --
committer --

Merge branch 'dev'
```

### Ours 或者 Others

Ours 或者 Others 是保留历史记录，但是忽略另一方的文件变更

### Git rebase

Git rebase 时，先找到公共祖先，然后把 Mine 的每一个 commit 去续接（平移）在 Other 之后，由于于父级的 commit 出现变更，则 git rebase 会创建新的 commit 来记录这些提交。可以想象成把 Mine 的 commit 依次取 Others 中重演一次
