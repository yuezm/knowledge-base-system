---
title: Promise
description: Promise
status: active
---

what: Promise 是一个新的 API，是一个新的异步任务解决方案
why:

1. Promise 内部状态扭转后，不会再回溯，以保证结果不变
2. Promise 可以链式调用，以链式替代异步函数嵌套
3. Promise 可以配合新 API 实现同步方式调用异步函数

how:

1. Promise 内部维护三个状态，Pending、Fulfilled、Rejected，状态只能由 Pending -> Fulfilled 或者 Pending -> Rejected
2. Promise 内部还维护了 then 或者 catch 注册的任务队列
3. 在 执行 then 或者 catch 时，返回一个新的 Promise

defect:

1. Promise 开始之后无法中途暂停，只有等他执行完毕
2. Promise 内部可以看做一个沙箱，内部报错堆栈信息不友好
3. Promise 如果是 Pending 的话，你无法知道它到底是再向哪个状态变化，到底是靠近 Fulfilled 还是 Rejected
4. Promise 如果不执行回调则不会有返回值（可以用次特性来终止 Promise）

# API

# 考题

## 链式操作

1. async...await
2. reduce
3. for
