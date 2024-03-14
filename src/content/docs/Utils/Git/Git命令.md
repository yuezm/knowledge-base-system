---
title: Git
description: Git
---

## git command

### diff

```shell
git diff # 输出工作区和暂存区的区别 【工作区 -- 暂存区】
git diff --cache # 展示暂存区与最近版本的不同 【暂存区 -- 最近版本】
git diff HEAD # 【 工作区 - 暂存区 - 最近版本 】的不同
git diff <commit-id> <commit-id> # 两个版本最近的不同
```

### branch

```shell
git branch # 所有本地分支
git branch -vv # 与本地分关联的远程分支
git branch -r # 所有远程分支
git branch -a # 所有分支

git branch -m <branch-name> # 重命名

git branch -u origin/branch-name # 本地分支关联远程分支
```

### remote

```shell
git remote # 展示所有远程仓库

git remote set-url origin <URL> # 修改远程仓库地址

git remote add origin <remote-url> # 增加远程仓库地址

git remote show origin # 查看本地分支和远程分支对应的关系

git remote prune origin # 清理本地分支，如果远程分支被删除，则本地也删除
```

### stash

```shell
git stash # 存储当前修改
git stash -u # 保存当前状态，包含 untracked

git stash list
git stash apply <stash@{n}> # 取指定的某个记录
git stash pop # 取得最后一个记录
git stash drop # 删除最后一条记录
git stash clear # 删除全部
```

### push

```shell
git push origin --delete <remote-branch-name> # 删除远程分支

git push --set-upstream origin feature/<remote-branch-name> # 根据分支创建远程分支并关联
```

### checkout

```shell
git checkout <branch-name> # 切换分支，如果 <branch-name> 和文件名相同，则需要加入 --
git checkout -b <branch-name> # 创建分支并切换分支

git checkout - # 快速切换上一个分支
git checkout <stash@{n}> -- <file-path> # 从某个stash拿个文件出来修改
```

### ls-files

```shell
git ls-files -t # 展示已追踪的文件
git ls-files --others  # 展示未追踪的文件（未追踪文件不等于忽略哈，可能是新建的）
```

### status

```shell
git status --ignored # 展示忽略的文件
git ls-files --others -i --exclude-standard # 展示忽略的文件
```

### clean

```shell
# 使用clean命令后，删除的文件无法找回
# 不会影响tracked的文件的改动，只会删除untracked的文件
# 如果不指定文件文件名，则清空所有工作的untracked文件
git clean <file-name> -f # 强制删除未追踪文件

# 如果不指定目录名称，则清空所有工作的untracked目录
git clean <directory-name> -df # 强制删除未追踪目录

git clean -X -f # 删除 .gitignore 记录的文件
```

### bundle

```shell
git bundle create <file> <branch-name> # 将某个分支导出为文件
```

### clone

```shell
git clone repo.bundle <repo-dir> -b <branch-name> # 将某个文件导入为一个分支
```

### commit

```shell
git commit --amend # 修改上一个commit描述，如果暂存区存在改动，则也会添加到上一个commit
```

### blame

```shell
git blame <file-name> # 查看某段代码谁写的
```

### gc

```git
git gc # 清除git无效引用，例如分支，commit等等，且会压缩文件，以达节省空间
git gc --auto // 让git自动决定是否进行回收
```

### config

```bash
git config --global user.name # 设置全局用户名
```

## 常用的操作

### 查看已删除的文件提交

```shell
# 模糊查找
git log --all --full-history -- "**/thefile.*"

# 精确查找
git log --all --full-history -- <path-to-file>
git log --diff-filter=D --summary | grep <file_name> | awk '{print $4; exit}' | xargs git log --all --

# 查看所有删除文件
git log --diff-filter=D --summary | grep delete

# 查看产出文件是谁提交的
git log --diff-filter=D --summary | grep -C 10 <file_name>
```
