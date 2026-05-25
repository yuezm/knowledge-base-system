---
title: Material
description: Material
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

材质

## API

### MeshBasicMaterial

基本材质，不受光照影响

```js
const material = new THREE.MeshBasicMaterial({
  color?: ColorRepresentation, // 0x00ff00,
  map?: Texture, // 贴图
  alphaMap?: Texture, // 透明度贴图，黑色为全透明，白色为不透明
  aoMap?: Texture, // 光照贴图，用于模拟环境光的遮挡，使得物体看起来更加立体
  envMap?: Texture, // 环境贴图
  lightMap?: Texture, // 静态的光照贴图
  specularMap?: texture, // 高光贴图

  reflectivity: number, // 设置反射强度，默认为1

  // FrontSide, BackSide, DoubleSide
  side: THREE.DoubleSide, // 显示正面，反面，双面


  // 在支持透明的材质中，可以设置透明度
  transparent: true,
  opacity: 0.1,
});
```

### MeshNormalMaterial

不考虑光源，根据法线着色

```js
const material = new THREE.MeshNormalMaterial();
```

### MeshStandardMaterial

标准材质，PBR（Physically Based Rendering），基于物理的渲染模型，常用于木材，金属，石材

PBR 的两大核心理念

1. 能量守恒 (Energy Conservation)：出射光线的总量不能超过入射光线的总量。这意味着高光越亮，漫反射就必须越暗
2. 微表面模型 (Microfacet Theory)：假设物体表面由无数肉眼看不见的微小镜面组成。表面越粗糙，微镜面的方向越乱，反射光就越分散

参数体系

1. 基础色
2. 粗糙度
3. 金属度
4. 法线
5. 环境光

```ts
new THREE.MeshStandardMaterial({
  color, // 基础颜色
  map， // 颜色贴图
  metalness, // 材质金属度
  metalnessMap, // 金属贴图
  roughness, // 表面粗糙度，0 即为完全光滑
  roughnessMap, // 粗糙度贴图
  normalMap, // 法线贴图

  envMap, // 环境贴图
  emissive, // 自发光颜色
  emissiveMap, // 自发光贴图
  emissiveIntensity, // 自发光强度
});
```

### LineBasicMaterial

线材质

```ts
const lineMat = new THREE.LineBasicMaterial({
  color: 0xffffff,
});
```

### MeshLambertMaterial

Lambert 光照模型，它会根据光线的方向和物体表面的法线来计算漫反射光，能产生比较自然的光照效果，但不会产生镜面反射

### MeshPhongMaterial

基于 Phong 光照模型，镜面反射，漫反射，环境光

### MeshPhysicalMaterial

物理材质，支持更多的物理参数，模拟更多的表面效果

```ts
new THREE.MeshPhysicalMaterial({
  clearcoat, // 清漆强度，0.0 - 1.0
  clearcoatMap， // 控制清漆层强度的纹理
  clearcoatRoughness, // 清漆层本身的粗糙度
  clearcoatRoughnessMap, // 控制清漆层粗糙度的纹理
  transmission, // 透光率
});
```

### ShaderMaterial

自定义 shader 材质

```ts
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: uTime, // 添加自定义 uniform，并在 shader 中声明后即可使用，且会跟随 uTime 变化
  },
  vertexShader: `
  void main() {
    
  }
  `,
  fragmentShader: fragmentShader,
});
```

ShaderMaterial 会自如下动注入信息，但是 RawShaderMaterial 不会

```glsl
uniform mat4 modelMatrix; 模型本地坐标到世界坐标的变换矩阵。
uniform mat4 modelViewMatrix; 模型本地坐标到视图（相机）坐标的变换矩阵 (viewMatrix \* modelMatrix)。
uniform mat4 projectionMatrix; 视图坐标到裁剪空间坐标的变换矩阵。
uniform mat4 viewMatrix;世界坐标到视图坐标的变换矩阵。
uniform mat3 normalMatrix;用于将本地坐标系下的法向量变换到视图坐标系下的法向量的矩阵。它是 modelViewMatrix 左上角 3x3 子矩阵的逆转置矩阵，保证法线在非等比缩放下也能正确变换。

uniform vec3 cameraPosition;: 相机在世界坐标系中的位置。
uniform bool isOrthographic;: 如果当前相机是正交相机，则为 true。

uniform float nearPlane;: (相机为 PerspectiveCamera) 相机近裁剪面距离。
uniform float farPlane;: (相机为 PerspectiveCamera) 相机远裁剪面距离。

// 属于顶点着色器
in vec3 position;: 顶点的本地坐标。
in vec3 normal;: 顶点的本地法线向量 (如果几何体有法线数据)。
in vec2 uv;: 顶点的第一套纹理坐标 (如果几何体有 UV 数据)。
in vec2 uv2;: 顶点的第二套纹理坐标 (如果几何体有第二套 UV 数据，常用于 Lightmap 或 AO map)。
in vec4 color;: 顶点颜色 (如果几何体有顶点颜色数据)。
in vec3 tangent;: 顶点的切线向量 (如果几何体有切线数据，通常用于法线贴图计算)。
in float morphTarget0, morphTarget1, ...;: 变形目标 (Morph Target) 的权重或属性值 (如果几何体有变形目标)。
in vec4 skinIndex;: (用于骨骼动画) 影响顶点的骨骼索引。
in vec4 skinWeight;: (用于骨骼动画) 对应骨骼索引的权重
```

### RawShaderMaterial

自定义 shader 材质，但是 RawShaderMaterial 完全不会注入数据

## 参考

- [Material](https://threejs.org/docs/index.html#Material)
