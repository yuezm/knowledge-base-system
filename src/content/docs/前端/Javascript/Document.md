---
title: Document
description: Document
---

文档根 DOM 对象

## API

### 全屏和退出全屏

```js
// 将 element 元素全屏，例如 document.body.requestFullscreen()
const promise = element.requestFullscreen();

// 退出全屏
const promise = document.exitFullscreen();

// 事件， fullscreenchange 和 fullscreenerror 事件
document.addEventListener("fullscreenchange", () => {});
document.addEventListener("fullscreenerror", () => {});
```
