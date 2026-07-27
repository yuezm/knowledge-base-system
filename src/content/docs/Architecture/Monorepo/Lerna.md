---
title: Lerna
description: Lerna
status: active
---

## 安装

```shell
npm i -g lerna
```

## 常用操作

```shell
lerna init  # 初始化
# --independent


lerna create < name > [loc] # 创建新的包

lerna add [@version] [--dev] [--exact] # 增加本地或者远程package做为当前项目packages里面的依赖
# --dev 只是开发依赖
# --exact 版本确定，定死

lerna bootstrap #类似于 npm i

lerna list # 列出所有包

lerna import #导入已经存在的包

lerna run # 运行scripts

lerna exec # 运行任意命令在每个包

lerna link # 软连接

lerna clean # 删除 node_modules

lerna changed # 列出下个 lerna publish 的改变


lerna publish # 发版 打tag，推git，推npm
```
