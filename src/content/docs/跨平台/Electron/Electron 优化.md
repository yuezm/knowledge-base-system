---
title: Electron 优化
description: Electron 优化
status: active
---

## 削减资源

### 代码优化

1. 减少代码体积，如 tree-shaking，代码压缩
2. 代码拆分，按需加载

### 减少渲染

1. 按可视区域渲染，不渲染多余的 DOM 元素，例如虚拟列表

### 使用 webAssembly

使用 webAssembly 代替 JS 进行计算密集型任务

### 图片优化

1. 压缩图片质量
2. 语言图 + 高清大图切换
3. 减少动态图片的帧数和质量，使用 Lottie

### 内存和 CPU 占用

1. 消除代码的内存泄漏问题，例如闭包，DOM 引用等等
2. Electron API 的问题，如系统托盘内存占用问题

## 监控

1. 监控和报警平台
2. 自动化性能测试

## 分析工具

1. electron v8 heapSnapshot
2. devtools memory
3. devtools performance
4. devtools rendering
5. chromium tracing-memory-infra
6. WAP
