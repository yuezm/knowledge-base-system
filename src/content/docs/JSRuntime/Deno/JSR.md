---
title: JSR
description: JSR
---

Javascript system registry(JSR) 是一个由 deno 提供的，javascript 包管理平台，兼容 npm。官网是 [https://jsr.io/](https://jsr.io/)

JSR 具有如下特点

1. 开源，免费
2. 仅支持 ESM，不支持 commonJS
3. 支持多个运行时，例如 deno，bun，cloudflare 等等。因为它提供的是单纯 ESM 包，而非某个运行时
4. 天然支持 typescript
5. 兼容 NPM 生态

   ```shell
   npx jsr add $package # 下载包，'install' and 'i' 也可以下载包
   npx jsr push $package # 发布包
   ```
