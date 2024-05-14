---
title: Scene
description: Scene
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

## Scene

```ts
const scene = new BABYLON.Scene(engine);
```

### 事件

所有事件可参考 _Scene#constructor_[^Scene#constructor] 文档

#### 生命周期

```ts
// 渲染前事件
scene.onBeforeRenderObservable.add(() => {});

// 渲染后事件
scene.onAfterRenderObservable.add(() => {});
```

#### 鼠标事件

```ts
// 鼠标的所有事件，包含点击，移动等等
scene.onPointerObservable.add((pointerInfo) => {});

// 点击
scene.onPointerPick = () => {};
scene.onPointerUp = () => {};
scene.onPointerDown = () => {};
scene.onPointerMove = () => {};
```

#### 键盘事件

```ts
scene.onPreKeyboardObservable.add(() => {});
scene.onKeyboardObservable.add(() => {});
```

## 参考

- [DeepDive scene](https://doc.babylonjs.com/features/featuresDeepDive/scene)

[^Scene#constructor]: [Scene#constructor](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene#constructor)
