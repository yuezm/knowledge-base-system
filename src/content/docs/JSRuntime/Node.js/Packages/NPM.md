---
title: NPM
description: NPM
---

## npm link

我们可以使用 npm i xx 下载一个依赖包，那么当我们**依赖包也处于开发阶段**怎么办

1. 可以使用git地址进行引入
2. 可以使用 npm link，npm link 对项目进行链接，可以在另一个项目内使用

**进入需要链接的项目内**

```shell
npm link # yarn link
```

执行link命令时，根据package.json的name进行标记，切记，如果存在命名空间的，如@xx/yy，package也必须加上

**进入开发项目内**

```shell
npm link xx
```
## 
## 
## 参数

### [--unsafe-perm](https://docs.npmjs.com/cli/v6/using-npm/config#unsafe-perm)

**默认值：**当root权限运行时为false，其他权限运行时为true

当unsafe-perm为true时，运行时不允许UID/GID切换（简单来说就说使用当前用户进行操作，不允许切换用户），如果显示设置为false，则以非root用户安装失败
npm当以**root权限**运行时，会将用户切换为`user`配置指定的用户，默认为nobody。但此时如果需要某些权限的话，依赖包下载就可能失败，此时可以直接使用 `--unsafe-perm`指定以root权限运行
