---
title: Camera
description: Camera
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### FreeCamera

自由视角相机

```ts
const camera = new BABYLON.FreeCamera(); // 自由相机
```

### ArcRotateCamera

该相机总是朝向一个指定的目标位置，且可以进行旋转，旋转中心为目标位置

```ts
const camera = new BABYLON.ArcRotateCamera(); // 圆弧旋转相机
```

## 参考

- [DeepDive Camera](https://doc.babylonjs.com/features/featuresDeepDive/cameras)
- [Camera#constructor]https://doc.babylonjs.com/typedoc/classes/BABYLON.Camera#constructor
