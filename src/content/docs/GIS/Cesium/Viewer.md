---
title: Viewer
description: Viewer
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

```ts
const viewer = new Viewer(container, {
  // 最大帧率
  targetFrameRate: number,

  // 指定按需渲染，而非按照某个帧率渲染。按需渲染是指发生了某些变化，例如相机变化，图层变化，搞成变化，用户操作等等
  requestRenderMode: boolean,

  // 限制两次渲染的时间间隔，如果设置为最大值，则在无变化的时候，不会刷新
  maximumRenderTimeChange: number,
});
```

## 参考

- [Viewer](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions)
