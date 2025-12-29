---
title: Javascript运行时
description: Javascript运行时
---

## Node.js

Node.js 是 Ryan dahl 在 2009 年创建的，基于 V8 引擎和 Libuv 构建的 JavaScript 运行时。有如下特点

优点

1. 高性能（事件驱动，异步 I/O）
2. 庞大的生态圈级丰富的三方库
3. 跨平台

缺点

1. 单线程：由于主线程是单线程，无法承接 CPU 密集型任务（可以借助 child_process 和 worker threads ）
2. 回调函数编程：回调低于
3. 安全性：Node.js 默认给了很多权限，包含 fs，net，child_process 等

[Nodejs 简介](/jsruntime/nodejs/nodejs-特性/)

## Deno

Deno 是一个 Javascript 和 Typescript 的运行时，由 Ryan Dahl 创建，基于 V8 引擎和 Rust 语言构建。旨在解决 Node.js 中的问题，例如安全性，性能等等

优点

1. 安全：Deno 默认禁止了 fs，net，child_process 等权限，需要手动开启
2. 开箱即用的工具
3. 更优雅的模块管理方式，且一定程度的兼容 NPM
4. 跨平台，甚至可以在浏览器中运行

缺点

1. 生态圈和三方库无法和 Node.js 比较

[Deno 官网](https://docs.deno.com/)

## Bun.js

Bun 是 2021 年发布的，由 Zig 编写高性能 JavaScript 运行时

优点

1. 性能极高：由 Zig 编写；Bun 使用 JavaScriptCore Engine 来运行 JavaScript
2. 开箱即用：提供了打包、转译、安装和运行 JavaScript & TypeScript 项目的功能，官方称其为 "all-in-one JavaScript runtime"
3. 跨平台（最近也支持了 Windows）

缺点

1. 生态圈较小

[Bun 官网](https://bun.sh/)

## Winter.js

Winter 是一个用 Rust 实现的 Javascript runtime

优点

1. 高性能：Rust 编写的内核，使用 SpiderMonkey 运行 Javascript
2. 兼容其他运行时：兼容 WinterCG 规范，兼容 Cloudflare API
3. Web 框架支持
4. Web Assembly 支持
5. 跨平台：它可以运行在任何支持 WebAssembly 的平台上

[https://github.com/wasmerio/winterjs](https://github.com/wasmerio/winterjs)
