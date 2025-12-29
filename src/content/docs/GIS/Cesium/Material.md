---
title: Material
description: Material
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

Material 用于藐描述物体的表面特性，例如漫反射，镜面反射等等

## API

### Material

```ts
new Cesium.Material(options);
```

### MaterialProperty

抽象类，即使 Property 也是 Material，常用的实现如下

#### ColorMaterialProperty

颜色材质

#### CompositeMaterialProperty

组合材质，允许基于时间或者其他变化来切换材质。例如模仿一天内不同时间的光照

#### GridMaterialProperty

网格材质

#### ImageMaterialProperty

贴图材质

#### PolylineGlowMaterialProperty

发光线条

#### PolylineOutlineMaterialProperty

外轮廓线条

#### StripeMaterialProperty:

条纹纹理

## 参考

- [MaterialProperty](https://cesium.com/learn/cesiumjs/ref-doc/MaterialProperty.html?)
