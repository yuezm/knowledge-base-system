---
title: Light
description: Light
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### HemisphericLight

半球灯光，模拟环境光

```ts
const light = new BABYLON.HemisphericLight(
  name: string,
  direction: Vector3,
  scene?: Scene
);

light.diffuse = BABYLON.Color3.White(); // 漫反射颜色
light.intensity = 0.5; // 光线强度

// 修改光源方向，半球的光源的direction指的不是光源的入射方向，而是物体的漫反射方向
light.direction = new BABYLON.Vec3(0, 1, 0);
```

### PointLight

点光源

```ts
const light = new BABYLON.PointLight(
  name: string,
  position: Vector3,
  scene?: Scene
);
```

### SpotLight

聚光灯，类似于路灯

```ts
const light = new BABYLON.SpotLight(
  name: string,
  position: Vector3,
  direction: Vector3,
  angle: number,
  exponent: number,
  scene?: Scene
);

// 修改光源位置
light.position = new BABYLON.Vec3(0, 0, 0); 
```

### DirectionalLight

直射光源，类似于太阳光
  
```ts
const light = new BABYLON.DirectionalLight(
  name: string,
  direction: Vector3,
  scene?: Scene
);

// 修改光源方向，直射光源的direction指的是光源的入射方向
light.direction = new BABYLON.Vec3(0, 1, 0);

// 修改光源位置
light.position = new BABYLON.Vec3(0, 0, 0); 
```

## 参考

- [DeepDive lights](https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction)
- [Light#constructor](https://doc.babylonjs.com/typedoc/classes/BABYLON.Light#constructor)
