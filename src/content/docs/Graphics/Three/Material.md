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
});
```

### MeshNormalMaterial

不考虑光源，根据法线着色

```js
const material = new THREE.MeshNormalMaterial();
```




## 参考
