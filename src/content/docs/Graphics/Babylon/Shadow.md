---
title: Shadow
description: Shadow
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### ShadowGenerator

```ts
const shadowGenerator = new ShadowGenerator(
  mapSize: number,
  light: IShadowLight,
  usefullFloatFirst?: boolean,
  camera?: Nullable<Camera>,
  useRedTextureType?: boolean
);

shadowGenerator.addShadowCaster(
  mesh: AbstractMesh,
  includeDescendants?: boolean, // 是否添加后代，默认为 true
);

// 物体设置接收阴影
mesh.receiveShadows = true;
```

## 参考

[ShadowGenerator](https://doc.babylonjs.com/typedoc/classes/BABYLON.ShadowGenerator)
