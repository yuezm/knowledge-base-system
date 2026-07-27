---
title: NPM
description: NPM
status: active
---

## API

### npm link

我们可以使用 npm i xx 下载一个依赖包，那么当我们**依赖包也处于开发阶段**怎么办

1. 可以使用 git 地址进行引入
2. 可以使用 npm link，npm link 对项目进行链接，可以在另一个项目内使用

**进入需要链接的项目内**

```shell
npm link # yarn link
```

执行 link 命令时，根据 package.json 的 name 进行标记，切记，如果存在命名空间的，如@xx/yy，package 也必须加上

**进入开发项目内**

```shell
npm link xx
```

### npm version

```shell
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]

// major 增加一个主版本
// minor 增加一个次版本
// patch 增加一个补丁号
// premajor 增加主版本及先行版本，举个栗子 0.0.1 ==> 1.0.0-0
```

## 参数

### [--unsafe-perm](https://docs.npmjs.com/cli/v6/using-npm/config#unsafe-perm)

**默认值：**当 root 权限运行时为 false，其他权限运行时为 true

当 unsafe-perm 为 true 时，运行时不允许 UID/GID 切换（简单来说就说使用当前用户进行操作，不允许切换用户），如果显示设置为 false，则以非 root 用户安装失败
npm 当以**root 权限**运行时，会将用户切换为`user`配置指定的用户，默认为 nobody。但此时如果需要某些权限的话，依赖包下载就可能失败，此时可以直接使用 `--unsafe-perm`指定以 root 权限运行
