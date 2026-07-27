---
title: Camera
description: Camera
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: active
---

## API

### Camera

#### 位置

```ts
camera.position: Cartesian3;
camera.positionCartographic: Cartographic;

camera.positionWC: Cartesian3; // 在世界坐标系下的相机位置
camera.range: number; 距离目标的距离
```

#### 朝向

1. `camera.direction` 或者 `camera.directionWC` 来描述
2. 以类似于欧拉角来描述，相机默认自身竖直，俯视的看向正北方
   - heading：相对于正北方向的旋转，默认值为 0（正北），顺时针值递增
   - pitch：相对于水面的倾斜，向下倾斜为负，默认值为-90（俯视）
   - roll：绕自身轴向的旋转，顺时针为正，默认为 0

#### 移动相机

```ts
// 聚焦某个实体或实体集合
viewer.flyTo(target, {
  offset: {
    heading: number, 
    pitch: number, 
    roll: number
  }
});

camera.setView;

camera.lookAt;

camera.lookAtTransform;

camera.flyTo({
  destination: Cartesian3 | Rectangle,
  orientation: object, // 描述相机的朝向，例如 {heading, pitch, roll} 或者 { direction, up }
});

camera.flyToBoundingSphere;
```

### ScreenSpaceCameraController

鼠标对相机的控制

```ts
viewer.screenSpaceCameraController.enableInputs: boolean;
viewer.screenSpaceCameraController.enableTranslate: boolean;
viewer.screenSpaceCameraController.enableZoom: boolean;

viewer.screenSpaceCameraController.maximumZoomDistance: boolean;
viewer.screenSpaceCameraController.minimumZoomDistance: boolean;

// 修改鼠标的默认行为
viewer.scene.screenSpaceCameraController.zoomEventTypes = [
  CameraEventType.WHEEL,
  CameraEventType.PINCH,
];
viewer.scene.screenSpaceCameraController.lookEventTypes;
viewer.scene.screenSpaceCameraController.rotateEventTypes;
viewer.scene.screenSpaceCameraController.translateEventTypes;

```

## 参考

- [Camera](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html)
- [ScreenSpaceCameraController](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html?)
