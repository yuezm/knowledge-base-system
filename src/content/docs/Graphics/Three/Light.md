---
title: Light
description: Light
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### Light

灯光抽象父类

### AmbientLight

环境光，无法产生阴影

```ts
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
```

### DirectionalLight

平行光，例如阳光

```ts
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 设置光颜色，强度

directionalLight.position.set(5, 10, 7); // 光源位置
directionalLight.target.set(0, 0, 0); // 光源照射方向

scene.add(directionalLight);
```

### HemisphereLight

半球光，位于场景正上方的光源，可以模拟天空和地面的颜色

```ts
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1); // 设置天空颜色，地面颜色，强度
scene.add(light);
```

### RectAreaLight

矩形区域给，例如明亮窗口或者发光条

```ts
const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height); // 设置光颜色，强度，宽度，高度
rectLight.position.set(5, 5, 0);
rectLight.lookAt(0, 0, 0); // 设置光照射方向
scene.add(rectLight);
```

### SpotLight

聚光灯，锥型的照射范围

```ts
const spotLight = new THREE.SpotLight(0xffffff, 10);
spotLight.position.set(2, 2, 2);

scene.add(spotLight);
```

### PointLight

点光源，向四面八方照射

```ts
const spotLight = new THREE.PointLight(0xffffff, 10);
spotLight.position.set(2, 2, 2);

scene.add(spotLight);
```

## 阴影

根据光源照射的阴影，需要如下步骤

1. 渲染器开启阴影

```ts
// 渲染器
renderer.shadowMap.enabled = true;
```

2. 灯光支持阴影，例如平行光，且开启阴影

```ts
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;

scene.add(directionalLight);
```

3. 物体材质支持阴影，且开启阴影

```ts
// 物体阴影
const box = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(box, material);
mesh.castShadow = true;
```

4. 地面（投射物体）支持阴影，且开启接收阴影

```ts
mesh1.receiveShadow = true; // 在 mesh1 上即可显示 mesh 的阴影
```

### LightShadow

阴影父类，阴影具有如下通用属性

```ts
shadow.radius = 10; // 设置模糊度
shadow.mapSize = new THREE.Vec2(512, 5120); // 贴图分辨率
shadow.bias = 0.0001; // 微调阴影贴图的深度比较值，以解决阴影失真问题（由于小数计算精度问题可能会导致阴影失真）

// shadow.camera 和场景中的 camera 不是一个
// 设置阴影的相机，例如可以设置相机计算阴影的区域，在区域外部，不计算
shadow.camera.far = 30;
```

### DirectionalLightShadow

平行光计算出的阴影

### PointLightShadow

点光源计算出的阴影

### SpotLightShadow

聚光灯光源计算出的阴影

## 参考
