---
title: Color
description: Color
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### 颜色空间

颜色空间（Color management），Three 将色彩空间分为如下。例如在设置纹理，输出到显示设备时，可以指定颜色空间

```ts
THREE.NoColorSpace;
THREE.LinearSRGBColorSpace; // 颜色值是线性分布的，即颜色值直接与物理光强成正比
THREE.SRGBColorSpace; // 由于人眼的感知特性，颜色和光线强度是不成正比的，通常需要进行伽马修正，用于非物理准确的渲染，例如显示器
THREE.DisplayP3ColorSpace; // 用于需要更宽广色域的场景，以支持更鲜艳的颜色表现
THREE.LinearDisplayP3ColorSpace;
```

## 参考

- [Color management](https://threejs.org/docs/#manual/zh/introduction/Color-management)
