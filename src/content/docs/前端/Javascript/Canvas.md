---
title: Canvas
description: Canvas
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### CanvasRenderingContext2D

#### globalCompositeOperation

数值绘制新形状时，应用合成操作的类型。即设置图形存在重合时，如何绘制

1. "source-over"：这是默认设置，并在现有画布上绘制新图形
2. "source-in"：仅在新形状和目标画布重叠的地方绘制新形状。其他的都是透明的
3. "source-out"：在不与现有画布内容重叠的地方绘制新图形
4. "source-atop"：只在与现有画布内容重叠的地方绘制新图形
5. "destination-over"：在现有画布内容的后面绘制新的图形
6. ...

```js
ctx.globalCompositeOperation = "destination-over";
```
