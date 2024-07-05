---
title: Entity
description: Entity
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

Entity API 是 Cesium.js 提供的上层 API，旨在数据驱动，简单易懂。相对来说 Primitive API 则是较为底层的 API，适合具有图形学了解的人使用

## API

### Entity

在构造函数内，传入对应的图形属性，即可创建一个 Entity 实例

```ts
new Entity({
  id?: string;
  name?: string;
  availability:	TimeIntervalCollection;
  show:	boolean;
  description:	Property | string;
  position:	PositionProperty | Cartesian3;
  orientation:	Property | Quaternion;
  viewFrom:	Property | Cartesian3;
  parent:	Entity;
  billboard:	BillboardGraphics;
  box:	BoxGraphics;
  corridor:	CorridorGraphics;
  cylinder:	CylinderGraphics;
  ellipse:	EllipseGraphics;
  ellipsoid:	EllipsoidGraphics;
  label:	LabelGraphicsz;
  model:	ModelGraphics;
  tileset:	Cesium3DTilesetGraphics;
  path:	PathGraphics;
  plane:	PlaneGraphics;
  point:	PointGraphics;
  polygon:	PolygonGraphics;
  polyline:	PolylineGraphics;
  properties:	PropertyBag;
  polylineVolume:	PolylineVolumeGraphics;
  rectangle:	RectangleGraphics;
  wall:	WallGraphics;
});
```

### EntityCollection

使用 EntityCollection 来管理 Entity，EntityCollection 初始化时挂载 Viewer.entities 属性上

### BillboardGraphics

广告牌（二维 icon）

```ts
new BillboardGraphics({
  width: Property | number;
  height: Property | number;

  image: Property | string | HTMLCanvasElement;

  // 在某个深度外禁用深度测试，当设置为0是，始终进行深度测试，当设置为Number.POSITIVE_INFINITY时，不进行深度测试
  disableDepthTestDistance?: Property | number;

  // 表示在多少距离内显示该物体
  distanceDisplayCondition?: Property | DistanceDisplayCondition;

  // 基于地心笛卡尔坐标系的偏移
  eyeOffset?: Property | Cartesian3;

  // 像素偏移，基于屏幕坐标的便宜
  pixelOffset?: Property | Cartesian2;

  // 设置在某个距离下的，pixelOffset
  pixelOffsetScaleByDistance?: Property | NearFarScalar;

  // 物体的高度基于什么来计算
  // NONE 位置绝对；
  // CLAMP_TO_GROUND 固定在地面；
  // RELATIVE_TO_GROUND 相对于地面
  // CLAMP_TO_TERRAIN 固定在地形
  // RELATIVE_TO_TERRAIN 相对于地形
  // CLAMP_TO_3D_TILE 固定于3D Tile
  // RELATIVE_TO_3D_TILE 相对于3D Tile
  heightReference?: Property | HeightReference;
})

```

### PolylineGraphics

线

```ts
new PolylineGraphics({
  positions?: Property | Cartesian3[];

  width?: Property | number;

  // 描述线条的精细程度
  granularity?: Property | number;

  material?: Property | Color | ImageMaterialProperty | PolylineGlowMaterialProperty | PolylineArrowMaterialProperty;
});
```

## 参考

[]()
