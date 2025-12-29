---
title: Terrain
description: Terrain
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

添加地形

## API

### TerrainData

Cesium.js 中高程定义的 TerrainData[^TerrainData] 常用如下所示

- HeightmapTerrainData[^heightmap]：高度图地形数据（Heightmap）本质上是一个二维数组，其中每个元素代表地图上对应位置的海拔高度
- QuantizedMeshTerrainData[^quantized-mesh]：一种经过优化的地形表示方式，它将地形数据编码为一系列三角形和高度偏移量，以及最小和最大高度等元数据。这种格式通过量化高度值和使用差分编码等技术显著减少了数据量，且数据已经被处理成易渲染的格式，所以渲染开销较小
- GoogleEarthEnterpriseTerrainData：使用 Google Earth Enterprise 服务来提供地形数据

### TerrainProvider

TerrainProvider 是一个抽象类，存在如下实现，它可以提供 TerrainData 数据

#### EllipsoidTerrainProvider

默认地形，提供一个椭球体，且各个地面的高度为 0 的地形数据

#### CesiumTerrainProvider

可以创建 Cesium.js 支持的高程

```ts
Cesium.Ion.defaultAccessToken = terrainConfig.defaultAccessToken;

// Cesium.CesiumTerrainProvider.fromIonAssetId
const provider = Cesium.createWorldTerrainAsync();
```

#### ArcGISTiledElevationTerrainProvider

使用 ArcGIS 的高度图来提供地形

#### GoogleEarthEnterpriseTerrainProvider

使用 Google Earth Enterprise REST API 来提供地形

## 自定义数据

Cesium.js 的提供的地形数据会和 GPS 数据获取的地形高度存在一定误差，此时可以自己生成 Terrain 数据，自己发布服务

- [cesiumlab 工具](http://m.cesiumlab.com/)
- [cesium-terrain-builder](https://github.com/geo-data/cesium-terrain-builder)

## 参考

[^TerrainData]: [TerrainData](https://cesium.com/learn/cesiumjs/ref-doc/TerrainData.html)
[^heightmap]: [heightmap](https://github.com/CesiumGS/cesium/wiki/heightmap-1.0)
[^quantized-mesh]: [quantized-mesh](https://github.com/CesiumGS/quantized-mesh)
