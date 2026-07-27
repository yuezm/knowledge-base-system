---
title: Renderer
description: Renderer
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: active
---

渲染器

## API

### WebGLRenderer

以 WebGL 渲染场景

```ts
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 抗锯齿
});

renderer.setSize(window.innerWidth, window.innerHeight); // 适应画布大小
document.body.appendChild(renderer.domElement); // 插入HTML

renderer.render(scene, camera); // 渲染至canvas
```

#### shadowMap

```ts
renderer.shadowMap.enabled = true; // 开启阴影
```

## 参考

- [WebGLRenderer](https://threejs.org/docs/index.html?q=Render#api/en/renderers/WebGLRenderer)
