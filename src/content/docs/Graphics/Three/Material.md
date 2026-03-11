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

```js
const material = new THREE.MeshStandardMaterial();
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

## 色彩空间

色彩空间是一种数学模型，用值来表示颜色。THREE 将色彩空间分为如下

```js
THREE.NoColorSpace;
THREE.LinearSRGBColorSpace; // 颜色值是线性分布的，即颜色值直接与物理光强成正比
THREE.SRGBColorSpace; // 由于人眼的感知特性，颜色和光线强度是不成正比的，通常需要进行伽马修正，用于非物理准确的渲染，例如显示器
THREE.DisplayP3ColorSpace; // 用于需要更宽广色域的场景，以支持更鲜艳的颜色表现
THREE.LinearDisplayP3ColorSpace;
```

## 参考

- [Material](https://threejs.org/docs/index.html#Material)
