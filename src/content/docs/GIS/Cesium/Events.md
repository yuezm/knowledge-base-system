---
title: Events
description: Events
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### 鼠标事件

```ts
// 由 ScreenSpaceEventHandler 进行监听
const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

// 事件类型由 ScreenSpaceEventType 维护，包含了移动端事件
handler.setInputAction(() => {}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

### Entity 事件

```ts
// 监听实体属性或者子属性的变化
entity.definitionChanged.addEventListener(() => {});

// 监听位置属性的变化
entity.position.definitionChanged.addEventListener(() => {});
```

### 相机事件

```ts
// 通过 screenSpaceCameraController 来对相机的操作进行设置
// 只能鼠标中键和双指头能缩放地图
viewer.scene.screenSpaceCameraController.zoomEventTypes = [
  CameraEventType.WHEEL,
  CameraEventType.PINCH,
];

// camera出现变化，例如移动，改变视角，缩放
viewer.camera.changed;
viewer.camera.moveEnd;
viewer.camera.moveStart;
```

对于缩放，并不是每次缩放都会触发 changed 事件，而是当缩放结束后，会将视角的变化值和 percentageChanged（ [0, 1]，默认 0.5） 进行比对，如果变化值大于 percentageChanged，才会触发 changed 事件。如果你想更加精确的监听事件，可以将 camera.percentageChanged 设置小一点

### 场景事件

```ts
// 场景和模型数据更新前触发，例如可以处理基于时间的动画数据
scene.preUpdate;
// 所有场景和模型数据更新完毕
scene.postUpdate;

// 渲染前，此时还可以更改渲染状态，例如物体的材质等等
scene.preRender;
// 渲染后，此时可以做一些统计，清理工作
scene.postRender;

scene.terrainProviderChanged;

// 场景模式切换，例如从3D切换到2D
scene.morphStart;
scene.morphComplete;

scene.renderError;
```

### Imagery 事件

```ts
ImageryProvider.errorEvent;
```

### Terrain 事件

```ts
Terrain.errorEvent;
Terrain.readyEvent;
```
