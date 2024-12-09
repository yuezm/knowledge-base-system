---
title: Material
description: Material
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

材质

## API

### MeshBasicMaterial

基本材质，不受光照影响

```js
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,

  // FrontSide, BackSide, DoubleSide
  side: THREE.DoubleSide, // 显示正面，反面，双面
});
```

### MeshNormalMaterial

不考虑光源，根据法线着色

```js
const material = new THREE.MeshNormalMaterial();
```

### MeshStandardMaterial

标准材质，根据光源着色

```js
const material = new THREE.MeshStandardMaterial();
```

## 色彩空间

色彩空间是一种数学模型，用值来表示颜色。THREE 将色彩空间分为如下

```js
THREE.NoColorSpace;
THREE.LinearSRGBColorSpace; // 颜色值是线性分布的，即颜色值直接与物理光强成正比
THREE.SRGBColorSpace; // 由于人眼的感知特性，颜色和光线强度是不成正比的，通常需要进行伽马修正，用于非物理准确的渲染，例如显示器
THREE.DisplayP3ColorSpace; // 用于需要更宽广色域的场景，以支持更鲜艳的颜色表现
THREE.LinearDisplayP3ColorSpace;
```
