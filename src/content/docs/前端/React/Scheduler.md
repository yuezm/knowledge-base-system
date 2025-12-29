---
title: Scheduler
description: Scheduler
---

Scheduler 是 React 核心模块，负责调度 React 的更新，其包含如下

1. 以 MessageChannel 触发更新任务
2. 限制单帧任务执行时间

## 为什么是 MessageChannel

Scheduler 中，是存在护回退机制的，在不支持新 API 时，按照优先级逐级回退，setImmediate（Web 中没有该 API） -> MessageChannel -> setTimeout。那么为什么不用其他的 API 呢

1. setTimeout：触发机制不稳定，受到阻塞后，setTimeout 触发会不稳定；setTimeout 实现的时候，存在最小延迟，通常位 4ms
2. requestIdleCallback：在空闲时执行，执行时机不可靠
3. requestAnimationFrame：每一帧执行，即与渲染绑定，而 Scheduler 可能需要更加短的时间调度
4. Scheduler API：浏览器的支持较差
5. Promise 等其他微任务：由于微任务特性，宏任务结束后，需要清空微任务队列，如果 Scheduler 使用微任务，则会陷入循环当中

MessageChannel 具有如下优势

1. 实时性，当 port.postMessage 时，立刻创建宏任务，无默认延迟
2. 自我控制何时让出线程，更具有灵活性
3. 浏览器支持较好
