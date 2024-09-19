---
title: Controls
description: Controls
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### OrbitControls

轨道控制器，接收鼠标事件来控制视角

```js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const orbitControls = new OrbitControls(camera, renderer.domElement);

orbitControls.enableRotate = true; // 是否可旋转
orbitControls.autoRotate = true; // 自动旋转

orbitControls.enableDamping = true; // 设置惯性
orbitControls.dampingFactor = 0.01; // 设置阻尼
```

## 参考

- [Controls](https://threejs.org/docs/index.html?q=Controls#api/en/extras/Controls)
