---
title: Material
description: Material
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### StandardMaterial

标准材质

```ts
const material = new BABYLON.StandardMaterial(name: string, scene?: Scene);

// 漫反射
material.diffuseColor = BABYLON.Color3.Green();
// 高光
material.specularColor = BABYLON.Color3.Green();
// 环境色
material.ambientColor = BABYLON.Color3.Green();

// 设置mesh的材质
mesh.material = material;
```

### Texture

纹理

```ts
// ambientTexture
// specularTexture
const texture = new BABYLON.Texture(
  url: Nullable<string>,
  sceneOrEngine?: Nullable<Scene | ThinEngine>
);

// 指定材质使用纹理
material.diffuseTexture = texture;
```

#### CubeTexture

立方体纹理

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/30b37f208332bebe7058ff9e5699b2ede9919b4169d5de26b114e68a18b65d91.png)

```ts
// rootUrl 设置为 "textures/box" 时，会加载 box_px.jpg	box_nx.jpg box_py.jpg box_ny.jpg box_pz.jpg box_nz.jpg
const cubeTexture = new BABYLON.CubeTexture(
  rootUrl: string,
  sceneOrEngine: Scene | ThinEngine,
  ....
);

// 也可以指定多面体的每个面的UV坐标系，指定起始点和终点的位置
const box = BABYLON.MeshBuilder.CreateBox("box", {
  ...
  faceUV: [
    new BABYLON.Vector4(0.5, 0, 0.75, 1),
    new BABYLON.Vector4(0, 0, 0.25, 1),
    new BABYLON.Vector4(0.25, 0, 0.5, 1),
    new BABYLON.Vector4(0.75, 0, 1, 1),
  ],
});

material.diffuseTexture = cubeTexture;
box.material = material;
```

## 参考

- [DeepDive skybox](https://doc.babylonjs.com/features/featuresDeepDive/environment/skybox)
