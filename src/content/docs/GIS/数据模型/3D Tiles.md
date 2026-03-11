---
title: 3D 瓦片
description: 3D 瓦片
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

是 Cesium.js 推出的一种 3D 数据标准，目的是在 3D 场景下，提高加载大模型的性能。

在大部分的场景中，用户所看到的都只是部分的模型，而非全部，3D Tiles 在 glTF 的基础上，加入 LOD 的概念，通过定义了数据分层和切片格式，实现了在不同层级下，加载不同精度的模型（瓦片的概念）

## API

### Cesium3DTileset

```ts
await Cesium.Cesium3DTileset.fromUrl($url);
```

## 工具

制作 3D Tiles

- [cesium ion](https://ion.cesium.com/) 可以将 glTF 转换为 3D Tiles
- [3d-tiles-tools](https://github.com/CesiumGS/3d-tiles-tools) Cesium 提供的转换工具

## 参考

- [Cesium 3D Tiles](https://zhuanlan.zhihu.com/p/536068677)
- [Cesium 开发基础篇 - 3D Tiles 介绍及加载](https://zhuanlan.zhihu.com/p/350265716)
