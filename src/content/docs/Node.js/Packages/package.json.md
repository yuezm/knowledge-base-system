---
title: package.json
description: package.json
---

## 常用字段

```
name: 

version: 

dependencies:

devDependencies:

peerDependencies:

optionDependencies:

scripts:

workspaces:

license:
```

### scripts

script 接收传参，例如执行 `npm run xx args1 args2`来传参

```
scripts:{
  "g": "node g.js $*" // 接收命令行的传参
}
```


#### 声明周期

- prexx：在xx命令前执行
- postxx：在xx命令后执行


## 非常用字段

```javascript
unpkg: 开启CDN，如果未指定该字段，则以 main 的属性为准，否则以 unpkg 属性为准

types：typescript 入口字段

browserslist：设置项目的浏览器兼容情况

module：针对ES6模块的入口

browser：提供浏览器入口

esnext：使用 es 模块化规范，stage 4 特性的源代码

es2015：Angular 定义的未转码的 es6 源码

sideEffects：webpack相关字段，表示是否存在副作用

source：rollup打包工具入口

umd:main：umd入口
```


## 版本管理

npm 将版本分为  **主版本.次版本.补丁号（X.Y.Z）**，例如 1.0.0

主版本（major）：包做了重大变更，不向下兼容
次版本（minor）：添加、废弃功能，向下兼容  
补丁号（patch）：bug修复，向下兼容

### 版本号特点

1. 版本只允许升，不允许降
2. 主版本为0起始的，一般为测试、开发版本；正式版本一般从 1.0.0 开始
### 标签
有时候为了语义，还会在版本后添加**标签**，例如** vue@3.0.0-alpha.0**，常用的标签有

```
dev: 开发版本

alpha: 阿尔法版本，内测或测试人员使用
beta: 贝塔版本，较alpha有较大改进，但还是处理内侧阶段
gamma: 伽马版本，较beta有较大改进

trial: 试用版本
experimental: 试验版本

stable: 稳定版本
csp: 内容安全版本
latest: 最新版本

next: 下个版本
```
可以使用  `npm dist-tag package-name` 查看某个包的标签
### 管理


```shell
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]

// major 增加一个主版本
// minor 增加一个次版本
// patch 增加一个补丁号
// premajor 增加主版本及先行版本，举个栗子 0.0.1 ==> 1.0.0-0
```

```
^: 不允许修改最左边的非0版本，语义理解为 兼容的版本 
	
  对于主版本大于0的来说 ^1.0.0: >=1.0.0  <2.0.0-0
  对于次版本大于0的来说 ^0.1.0: >=0.1.0  <0.2.0-0
  对于补丁号大于0的来说 ^0.0.1: >=0.0.1  <0.0.2-0
	

~: 主版本号一致、次版本号一致，语义理解为 相似的版本

-: 精确指定范围，例如 2-3: >=2.0.0 <=3.0.0

<、<=

>、>=

=

||: 以或者关系连接版本，例如 " 1.x || >=2.5"

*、x、省略: 可以表示在此值的任意范围，例如 1.x ==> >=1.0.0 <2.0.0-0、1.2.x ==> <=1.2.0 <2.0.0-0
```

