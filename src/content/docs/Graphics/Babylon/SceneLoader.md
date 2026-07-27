---
title: SceneLoader
description: SceneLoader
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: stub
---

## API

## SceneLoader

### ImportMeshAsync

加载 .babylon, .gltf, .glb

```ts
// 当加载.babylon时，name必须和导出的mesh名称保持一致
BABYLON.SceneLoader.ImportMeshAsync(name, rootUrl, sceneFilename);
```

## 参考

- [loadingFileTypes](https://doc.babylonjs.com/features/featuresDeepDive/importers/loadingFileTypes)