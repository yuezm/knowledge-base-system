---
title: Imagery
description: Imagery
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

负责给添加影像图层

## API

### ImageryLayerCollection

ImageryLayerCollection 可以包含多个 ImageryLayer，并进行管理，ImageryLayer 在 ImageryLayerCollection 中的所处的位置（index）决定优先级，可以通过 API 来调整位置

实际开发中，该对象无需自己创建，Cesium.js 会自动创建，并挂载于 `viewer.imageryLayers`

```ts
const ic = new ImageryLayerCollection();

// 添加，删除
ic.add(layer, index);
ic.remove(layer, destroy);

// 降低位置
ic.lower(layer);
ic.lowerToBottom(layer);

// 上升位置
ic.raise(layer);
ic.raiseToTop(layer);
```

### ImageryLayer

单个图层

```ts
new Cesium.ImageryLayer(imageryProvider, options);
```

### ImageryProvider

ImageryProvider 为 ImageryLayer 提供数据，即 ImageryProvider 最大的功能就是根据 x,y,level 去获取指定的 tile image。以下为 Cesium.js 常用的 ImageryProvider

ImageryProvider 是一个抽象类，Cesium 存在如下内部实现

#### WebMapTileServiceImageryProvider

以 WebMapTileServiceImageryProvider 接受 WTMS[^WTMS] 服务

```ts
new WebMapTileServiceImageryProvider({
  url: "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/WMTS",
  layer: "World_Imagery",
  style: "default",
  tileMatrixSetID: "default028mm",
  format: "image/jpeg",
});
```

#### UrlTemplateImageryProvider

以 UrlTemplateImageryProvider 接受 XYZ[^XYZ] 服务

```ts
new UrlTemplateImageryProvider({
  url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
});
```

#### TileMapServiceImageryProvider

TileMapServiceImageryProvider 继承自 UrlTemplateImageryProvider，和 UrlTemplateImageryProvider 坐标系不一致

其余 ImageryProvider 如下所示

```ts
ArcGisMapServerImageryProvider
BingMapsImageryProvider
OpenStreetMapImageryProvider
TileMapServiceImageryProvider
GoogleEarthEnterpriseImageryProvider
GoogleEarthEnterpriseMapsProvider
GridImageryProvider：渲染出每个瓦片的区域，用于开发调试
IonImageryProvider
MapboxImageryProvider
MapboxStyleImageryProvider
SingleTileImageryProvider
TileCoordinatesImageryProvider
WebMapServiceImageryProvider
```

## 参考

- [ImageryLayerCollection](https://cesium.com/learn/ion-sdk/ref-doc/ImageryLayerCollection.html)
- [瓦片地图](/gis/gis数据/tiles/)

[^WTMS]: [WTMS](/gis/gis数据/tiles/#wmts)
[^XYZ]: [XYZ](/gis/gis数据/tiles/#xyz)
