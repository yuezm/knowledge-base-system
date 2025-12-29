---
title: Engine
description: Engine
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### Engine

```ts
const engine = new BABYLON.Engine(canvasEle, true);
```

#### runRenderLoop

```ts
engine.runRenderLoop(() => {
  scene.render();
});
```

## 参考

- [Engine#constructor](https://doc.babylonjs.com/typedoc/classes/BABYLON.Engine#constructor)
