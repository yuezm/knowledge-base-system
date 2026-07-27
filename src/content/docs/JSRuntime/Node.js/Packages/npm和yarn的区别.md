---
title: npm和yarn的区别
description: npm和yarn的区别
status: active
---

yarn 是由 Google、FaceBook 等联合创建的一个 node.js 包管理器，为了解决 npm 的痛点。那么 npm 是由哪些痛点呢？

在 npm5 之前

1. npm 下载时，不会自动生成 package-lock.json 文件，而是需要手动执行命令 npm shrinkwrap，来生成 npm-shrinkwrap.json
2. npm 不会使用缓存
3. npm 下载很慢，但是 cnpm 不好使，cnpm 下载时，也不会自动生成 package-lock.json

yarn 就是为了解决这些 npm 的痛点

1. yarn 在下载时，自动生成 yarn.lock 文件，且在对 *.lock 文件策略也不尽相同

npm 在 npm5 之后，也会自动生成 package-lock.json 文件，但合并 package.json 和 package-lock.json 策略也不同，以下是策略的发展史

1.  完全依照 package-lock.json 下载，无论 package.json 是否存在更新 
2.  完全按照 package.json 获取新的版本，并更新 package-lock.json 
3.  先进性比对，如果 package-lock.json 锁定版本可以满足 package.json 的语义化版本，则使用 package-lock.json；否则根据 package.json 获取新的版本，并更新 package-lock.json 
4.  yarn 采用缓存策略：yarn 在下载时，会将文件缓存，如果后续再下载相同的版本，则不会继续下载，而是使用缓存 

npm5 后续也增加了缓存机制，甚至可以在离线使用，`--offline`（yarn 也提供），但 npm 缓存机制和 yarn 机制也存在区别

```shell
npm cache * // 存储于 .npm/_cacache、windows存储于 %AppData%/npm-cache

yarn cache * // 可以使用 yarn cache dir 查看缓存位置
```

1.  npm 缓存包是压缩后的；yarn 缓存包是解压后的， 
2.  npm 使用 pacote、cacache 进行管理；yarn 包含包名、版本、HASH 等信息 
3.  yarn 的下载速度很快 

- yarn 采用并发下：npm 对于队列依次下载，即下载完第一个才能下载第二个；yarn 采用并发同步执行所有任务

4. yarn-lock 是一个层级的；package-lock.json 是对层级的，反应了真实的依赖树

## install 流程

1. 发出 npm install 命令
2. 执行项目的 preinstall 钩子
3. 确定依赖，自当前项目开始，深度遍历依赖
4. 获取模块

- 获取模块信息：根据 package-lock.json 或 yarn.lock 信息比对版本，如果版本符合则使用 lock 中的，则使用 lock 信息，否则向远程仓库发起请求，并获得匹配的版本
- 向缓存查询，如果缓存中可以匹配，则使用缓存包；如果无法命中缓存，或缓存包过期，则根据向远程仓库获取的地址，进行下载；下载完成后放入缓存中
- 解压到 node_modules

5.  扁平化 
6.  安装模块，执行模块个生命周期钩子 
7.  执行项目的生命周期钩子 

```
preinstall
install
postinstall
prepublish
preprepare
prepare
postprepare
```
