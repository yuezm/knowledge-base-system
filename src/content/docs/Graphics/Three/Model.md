---
title: 模型
description: 模型
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: stub
---

Web 常用的模型为 GLTF 和 GLB，使用 [GLTFLoader](/graphics/three/loader/#gltfloader) 加载模型，模型加载完成后，添加到场景中。如果使用了 DRACO 压缩，需要使用 [DRACOLoader](/graphics/three/loader/#dracoloader) 解压。

## API

## 其他

### 获取模型的尺寸

```ts
const box = new THREE.Box3().setFromObject(model.scene); // 也可以传入mesh
const size = box.getSize(new THREE.Vector3()); // 获取了尺寸
```

## 参考
