---
title: Addons
description: Addons
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### 水波纹效果

```ts
import { Water } from "three/addons/objects/Water.js";

// 平面来展示水纹
const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

// 使用three插件
const water = new Water(waterGeometry, {
  textureWidth: 512,
  textureHeight: 512,
  waterNormals: new THREE.TextureLoader().load(
    "textures/waternormals.jpg",
    function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }
  ),
  sunDirection: new THREE.Vector3(),
  sunColor: 0xffffff,
  waterColor: 0x001e0f,
  distortionScale: 3.7,
  fog: scene.fog !== undefined,
});
```
