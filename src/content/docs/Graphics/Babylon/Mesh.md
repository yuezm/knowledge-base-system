---
title: Mesh
description: Mesh
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### MeshBuilder

#### CreateGround（地面）

```ts
const ground = BABYLON.MeshBuilder.CreateGround(); // 地面
```

#### CreateBox（立方体）

```ts
const box = BABYLON.MeshBuilder.CreateBox(); // 立方体
```

#### CreateSphere（球体）

```ts
const sphere = BABYLON.MeshBuilder.CreateSphere(); // 球体
```

### 变换

#### 平移

```ts
box.position; // 直接设置位置
box.translate(); // 变换
```

#### 旋转

```ts
box.rotation.y = BABYLON.Tools.ToRadians(45); // 直接赋值，按照自身坐标轴旋转
box.rotate(new BABYLON.Vector3(0, 0, 1), Math.PI / 4); // 按照自身坐标轴旋转

// 指定公共的坐标系旋转
box2.rotateAround(
  new BABYLON.Vector3(-4, 0, 0),
  new BABYLON.Vector3(0, 0, 1),
  Math.PI / 2
);
```

#### 缩放

```ts
box.scaling; // 直接赋值
```

## 参考

- [DeepDive mesh](https://doc.babylonjs.com/features/featuresDeepDive/mesh)
