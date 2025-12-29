---
title: Puppetter优化
description: Puppetter优化
---

## 
puppetter 其实不会耗特别多的资源，耗资源的是 Chromium

**CPU：**消耗较大的是的CPU，一方面是Chromium需要做大量的渲染计算；其实次Chromium需要解析DOM及其渲染
**内存：**Chromium以多线程方式运行，当并发较大时，占用大量内存

## 优化Chromium启动项

[Chromium 启动参数列表](https://peter.sh/experiments/chromium-command-line-switches/)

1. 如果将Dom解析和渲染放到同一进程，肯定能提升时间（进程上下文切换的时间）。对应的配置是 --single-process
2. 部分功能disable掉，比如GPU、Sandbox、插件等，减少内存的使用和相关计算

...
```typescript
 '--disable-gpu'
 '--disable-dev-shm-usage'
 '--disable-setuid-sandbox'
 '--no-first-run'
 '--no-sandbox'
 '--no-zygote'
 '--single-process'
 '--headless'
```


## 优化Chromium执行流程

**常规流程：**`请求到达->启动Chromium->打开tab页->运行代码->关闭tab页->关闭Chromium->返回数据`

1. 可以预先启动Chromium，减少启动时间消耗
2. 可以启动多个Chromium，每次去连接一个Chromium **此步骤风险极大，请慎重**

## 合理选择无头浏览器与版本

譬如选择 `chromium-headless`


