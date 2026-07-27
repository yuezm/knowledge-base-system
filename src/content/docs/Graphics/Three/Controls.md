---
title: Controls
description: Controls
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: active
---

## API

### OrbitControls

[OrbitControls](https://threejs.org/docs/index.html#examples/en/controls/OrbitControls) 轨道控制器，接收鼠标事件来控制视角

```js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const orbitControls = new OrbitControls(camera, renderer.domElement);

// 参数配置
orbitControls.enableRotate = true; // 是否可旋转
orbitControls.autoRotate = true; // 自动旋转
orbitControls.enableDamping = true; // 设置惯性
orbitControls.dampingFactor = 0.01; // 设置阻尼

// 设置初始的相机位置
camera.position.set(0, 20, 100);
controls.update();

function animate() {
  requestAnimationFrame(animate);

  // 更新
  orbitControls.update();

  renderer.render(scene, camera);
}
```

## 参考

- [Controls](https://threejs.org/docs/index.html?q=Controls#api/en/extras/Controls)
