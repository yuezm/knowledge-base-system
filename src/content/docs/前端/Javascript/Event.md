---
title: Event
description: Event
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: active
---

## API

### PointerEvent

[PointerEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent) 是统一 PC 端和移动端输入事件。输入可以来自鼠标（MouseEvent）或者移动端的触碰（TouchEvent）

```js
element.addEventListener("pointerdown", (ev) => {}); // 类似于 mousedown
element.addEventListener("pointerup", (ev) => {}); // 类似于 mouseup
element.addEventListener("pointermove", (ev) => {}); // 类似于 mousemove
element.addEventListener("pointerenter", (ev) => {}); // 类似于 mouseenter
element.addEventListener("pointerleave", (ev) => {}); // 类似于 mouseleave
element.addEventListener("pointerover", (ev) => {}); // 类似于 mouseover
element.addEventListener("pointerout", (ev) => {}); // 类似于 mouseout

element.addEventListener("pointercancel", (ev) => {}); // 输入操作被取消
```

1. pointerId：触发事件的 pointer 唯一标识
2. width，height：pointer 的接触面大小
3. pressure：压力值，范围为 `[0, 1]`
4. clientX，clientY：浏览器的可视区域的偏移
5. pageX，pageY：文档的偏移（包含滚动）
6. screenX，screenY：相对屏幕（物理屏幕）左上角的偏移
7. pointerType：设备类型， 'mouse'、'pen'、'touch' 等
8. isPrimary：是否为主 pointer
