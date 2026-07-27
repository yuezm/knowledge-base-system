---
title: Helper
description: Helper
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: stub
---

## API

### AxesHelper

坐标辅助

```js
const axes = new THREE.AxesHelper(10); // 设置线段长度

scene.add(axes);
```

### VertexNormalsHelper

法向量辅助器

```ts
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";

const vertexHelper = new THREE.VertexNormalsHelper(mesh1, 2, 0xff);
scene.add(vertexHelper);
```
