---
title: Extras
description: Extras
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: active
---

## API

### Curve

描述曲线的抽象类

### CurvePath

描述了曲线的路径

```ts
const curve = new CurvePath<Vector3>();
curve.add(new LineCurve3(new Vector3(0, 0, 0), new Vector3(1, 0, 0)));

curve.getPoint(0.5): Vector3; // // 获取曲线某一个距离的点，一个 Vector3，路径中点

curve.getPoints(12):Vector3[]; // 将曲线分为12段，返回所有的点
```

### CubicBezierCurve / CubicBezierCurve3

贝塞尔曲线

```ts
const curve = new THREE.CubicBezierCurve(
  new THREE.Vector2(-0, 0),
  new THREE.Vector2(-5, 15),
  new THREE.Vector2(20, 15),
  new THREE.Vector2(10, 0)
);
```

### LineCurve / LineCurve3

普通曲线
