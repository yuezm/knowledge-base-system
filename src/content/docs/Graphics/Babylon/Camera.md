---
title: Camera
description: Camera
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### FreeCamera

自由视角相机

```ts
const camera = new BABYLON.FreeCamera(); // 自由相机
```

### ArcRotateCamera

该相机总是朝向一个指定的目标位置，且可以进行旋转，旋转中心为目标位置

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/9c536949383f3a33f139dd89e271fe515091eb1e5b411f4ec5ca690fda64c28d.png)

```ts
const arcRotateCamera = new BABYLON.ArcRotateCamera(
  name: string,
  alpha: number,  // 绕着竖轴旋转
  beta: number,  // 绕着水平轴旋转
  radius: number, // 里目标的距离
  target: Vector3,  // 目标
  scene?: Scene,
  setActiveOnSceneIfNoneActive?: boolean
);

camera.parent = mesh; //跟随mesh变换
camera.lockedTarget = mesh; // 锁定mesh，此时无法变换alpha,beta，可以修改radius
```

### FollowCamera

跟随目标移动

```ts
const camera = new BABYLON.FollowCamera(
  name: string,
  position: Vector3,
  scene?: Scene,
  lockedTarget?: Nullable<AbstractMesh>
);
```

## 参考

- [DeepDive Camera](https://doc.babylonjs.com/features/featuresDeepDive/cameras)
- [Camera#constructor](https://doc.babylonjs.com/typedoc/classes/BABYLON.Camera#constructor)
