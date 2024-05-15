---
title: Mesh
description: Mesh
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### Mesh

```ts
// 指定mesh的父级，子mesh跟随父mesh变换
mesh.parent = parentMesh;

// movePOV
// amountForward 表示向前走，前方会随着变换而变换
mesh.movePOV(amountRight: number, amountUp: number, amountForward: number);

// 检测mesh之间是否碰撞
mesh.intersectsMesh(mesh: AbstractMesh | SolidParticle, precise?: boolean, includeDescendants?: boolean);
```

#### MergeMeshes

合并多个mesh为一个mesh

```ts
const meshes = BABYLON.Mesh.MergeMeshes(
  meshes: Array<Mesh>,
  disposeSource?: boolean,
  allow32BitsIndices?: boolean,
  meshSubclass?: Mesh,
  subdivideWithSubMeshes?: boolean,
  multiMultiMaterials?: boolean
);
```

### MeshBuilder

#### CreateLathe

根据设置曲线，和旋转轴，旋转一圈形成图形

```ts
const lathe = BABYLON.MeshBuilder.CreateLathe(
  name: string,
  options: {
    shape: Vector3[];
    radius?: number;
    tessellation?: number;
    clip?: number;
    arc?: number;
    closed?: boolean;
    updatable?: boolean;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    cap?: number;
    invertUV?: boolean;
  },
  scene?: Nullable<Scene>
);
```

#### CreateGround

地面平面

```ts
const ground = BABYLON.MeshBuilder.CreateGround(
  name: string,
  options?: {
    width?: number;
    height?: number;
    subdivisions?: number;
    subdivisionsX?: number;
    subdivisionsY?: number;
    updatable?: boolean;
  },
  scene?: Scene
)
```

#### CreateBox

立方体

```ts
const box = BABYLON.MeshBuilder.CreateBox(
  name: string,
  options?: {
    size?: number;
    width?: number;
    height?: number;
    depth?: number;
    faceUV?: Vector4[];
    faceColors?: Color4[];
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    wrap?: boolean;
    topBaseAt?: number;
    bottomBaseAt?: number;
    updatable?: boolean;
  },
  scene?: Nullable<Scene>
);
```

#### CreateSphere

球体

```ts
const sphere = BABYLON.MeshBuilder.CreateSphere(
  name: string,
  options?: {
    segments?: number;
    diameter?: number;
    diameterX?: number;
    diameterY?: number;
    diameterZ?: number;
    arc?: number;
    slice?: number;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    updatable?: boolean;
  },
  scene?: Nullable<Scene>
);
```

#### CreateCylinder

圆柱体

```ts
const cylinder = BABYLON.MeshBuilder.CreateCylinder(
  name: string,
  options?: {
    height?: number;
    diameterTop?: number;
    diameterBottom?: number;
    diameter?: number;
    tessellation?: number;
    subdivisions?: number;
    arc?: number;
    faceColors?: Color4[];
    faceUV?: Vector4[];
    updatable?: boolean;
    hasRings?: boolean;
    enclose?: boolean;
    cap?: number;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
  },
  scene?: Nullable<Scene>
);
```

#### ExtrudePolygon

多边形

```ts
const polygon = BABYLON.MeshBuilder.ExtrudePolygon(
  name: string,
  options: {
    shape: Vector3[];
    holes?: Vector3[][];
    depth?: number;
    faceUV?: Vector4[];
    faceColors?: Color4[];
    updatable?: boolean;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    wrap?: boolean;
  },
  scene?: Nullable<Scene>,
  earcutInjection?: any
);
```

#### CreateGroundFromHeightMap

根据高度图创建材质，该图的每个像素的值代表了这个点的高度

```ts
const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
  name: string,
  url: string | {
    data: Uint8Array;
    width: number;
    height: number;
  },
  options?: {
    width?: number;
    height?: number;
    subdivisions?: number;
    minHeight?: number;
    maxHeight?: number;
    colorFilter?: Color3;
    alphaFilter?: number;
    updatable?: boolean;
    onReady?: (mesh: GroundMesh, heightBuffer?: Float32Array) => void;
    onError?: (message?: string, exception?: any) => void;
    passHeightBufferInCallback?: boolean;
  },
  scene?: Nullable<Scene>
);
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
