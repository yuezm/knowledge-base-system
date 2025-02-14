---
title: Scene
description: Scene
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

Scene 是一个三维容器，保存了所需要渲染的对戏。例如灯光，网格，粒子等等，每一次渲染其实就是遍历 Scene 中的对象，然后给它再渲染出来

## API

### Scene

```ts
const scene = new THREE.Scene();
renderer.render(scene, camera);
```

#### 属性

```ts
scene.background = envMap; // 环境贴图
```

### Fog

```ts
// 线性雾
scene.fog = new THREE.Fog(0xcccccc, 10, 15);

// 指数雾，雾的浓度随着距离增加而指数级增大
scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
```

## 参考

- [Scene](https://threejs.org/docs/index.html#api/en/scenes/Scene)