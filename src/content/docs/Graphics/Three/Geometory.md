---
title: Geometry
description: Geometry
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### BufferGeometry

Geometry 的基础类，用于创建自定义几何体。

```js
const baseGeometry = new THREE.BufferGeometry();

// 顶点位置
const points = new Float32Array([
  0.0,
  0.0,
  1.0, // v0

  1.0,
  1.0,
  1.0, // v1

  2.0,
  3.0,
  1.0, // v2
]);

// 指定集合体顶点数据源，每个顶点包含3个值，总计指定了3个顶点
baseGeometry.setAttribute("position", new THREE.BufferAttribute(points, 3));

// 顶点索引，用于复用顶点，总计指定了6个顶点
const indices = [0, 1, 2, 2, 3, 0];
geometry.setIndex(indices);
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
```

#### groups

将顶点分组，可以设置不同的材质，例如将正方体 6 个面设置为不同的颜色。可以通过 `box.groups` 来查看各个组的信息

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/9492cac9623ec4bb0d904f775e28e84cd26e57c2690cbb3c55529c774dc3294f.png)

```js
// 未指定的时候，所有的使用同一个材质
const cube = new THREE.Mesh(boxGeometry, material);

// 可以指定多个材质，当指定多个材质（数组）时，会自动按照面的索引和材质的索引对齐
const cube = new THREE.Mesh(boxGeometry, [material, material1, material1]);

// 可手动指定，哪个顶点使用哪个材质索引
boxGeometry.addGroup(startIndex, count, materialIndex); // boxGeometry.addGroup(0, 6, 2);
```

### BoxGeometry

长方体，继承自 BufferGeometry

```ts
// w,h,d
const box = new THREE.BoxGeometry(
  width?: number,
  height?: number,
  depth?: number,
  widthSegments?: number,
  heightSegments?: number,
  depthSegments?: number
);
```

### CircleGeometry

圆形，继承自 BufferGeometry

```js
// 半径，分段数（越多越圆滑），起始弧度，弧度长度
const circle = new THREE.CircleGeometry(radius?: number, segments?: number, thetaStart?: number, thetaLength?: number);
```

### ConeGeometry

圆锥体，继承自 BufferGeometry

```js
const cone = new THREE.ConeGeometry(
  radius?: number,
  height?: number,
  radialSegments?: number,
  heightSegments?: number,
  openEnded?: boolean,
  thetaStart?: number,
  thetaLength?: number,
)
```

### CylinderGeometry

圆柱体

```ts
const cylinder = new THREE.CylinderGeometry(
    radiusTop?: number,
    radiusBottom?: number,
    height?: number,
    radialSegments?: number,
    heightSegments?: number,
    openEnded?: boolean,
    thetaStart?: number,
    thetaLength?: number,
)
```

## 法向量

## 参考

- [BufferGeometry](https://threejs.org/docs/index.html?q=Geo#api/en/core/BufferGeometry)
