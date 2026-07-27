---
title: Web截图
description: Web截图
status: active
---

## 纯前端实现

整体思路是，编辑所有的 DOM 节点，将其转换为 SVG 或者 Canvas

### SVG

将 DOM 转化为 SVG，后续将 SVG 绘制于 Canvas 中，再导出图片（关键是处理样式，文字，图片）

### Canvas

关键是处理样式，文字，图片

1.  将 DOM 绘制于 Canvas 中
2.  处理样式：处理层级关系，处理文档流等等
3.  处理字体、图片（跨域）、滚动等问题
4.  Canvas 导出图片

### MediaDevices API

使用 MediaDevices 截取屏幕

1. 使用 MediaDevices 捕捉屏幕流
2. 获取屏幕截图，传递给 Canvas
3. Canvas 导出图片

## 前后端联动

### 无头浏览器

使用无头浏览器渲染出页面，调用截图 API
