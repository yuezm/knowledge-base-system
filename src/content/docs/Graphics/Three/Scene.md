---
title: Scene
description: Scene
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### background

环境贴图

```js
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

// 使用RGBELoader来加载HDM环境贴图
new RGBELoader().load($url, (envMap) => {
  // 设置环境贴图
  scene.background = envMap;

  // 设置环境贴图后，某个材质的反光
  material.envMap = envMap;
```

### fog

#### Fog

线性雾，雾的强度和距离成线性关系

```js
// 线性雾
scene.fog = new THREE.Fog(0xcccccc, 10, 15);
```

#### FogExp2

指数雾，雾的强度和距离成指数关系

```js
// 指数雾
scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
```
