---
title: Scheduler
description: Scheduler
---

根据优先级执行任务

```ts
// 推入任务，并返回 Promise
window.scheduler.postTask(callback, {
  priority?: "user-blocking" | "user-visible" |  "background"，// 默认 user-visible
  signal?: TaskSignal | AbortSignal
  delay?: number // 默认为0
});


// user-visible 优先级和 setTimeout 一致，即谁在前面就先打印谁，user-blocking 比 setTimeout 高
setTimeout(() => {
  console.log('setTimeout');
}, 0);

window.scheduler.postTask(() => { console.log('postTask'); }, { delay: 0 })
```
