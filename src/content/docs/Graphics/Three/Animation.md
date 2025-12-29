---
title: 动画
description: 动画
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

## 补间动画

借助补间库，创建补间动画

```js
import Tween from "three/examples/jsm/libs/tween.module";

// 利用 tween，来修改 mesh1 的位置
const tween = new Tween.Tween(mesh1.position);
tween.to({ x: 4 }, 1000);
tween.start();

function render() {
  orbitControls.update();

  renderer.render(scene, camera);

  Tween.update();

  requestAnimationFrame(render);
}
```
