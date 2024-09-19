---
title: GUI
description: GUI
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### GUI

```js
import GUI from "three/examples/jsm/libs/lil-gui.module.min";

const events = {
  // 注册事件
  Full() {
    console.log("2");
  },
};

const gui = new GUI();
```

#### 分组

```js
const folder = gui.addFolder("立方体位置");

folder
  .add(mesh.position, "x")
  .max(10)
  .min(1)
  .step(1)
  .name("mesh position x")
  .onFinishChange(() => {});
```

#### 按钮

```js
// 按钮
gui.add(events, "Full").onChange(() => {});
```

#### 滑块

```js
gui
  .add(mesh.position, "x")
  .max(10)
  .min(1)
  .step(1)
  .name("mesh position x")
  .onFinishChange(() => {});
```

#### 开关

```js
gui.add(mesh.material, "wireframe").name("是否仅绘制线框");
```

#### 下拉选择

```js
gui.add(mesh.position, "x", [1, 2, 3]);
```

#### 颜色选择

```js
gui
  .addColor(
    {
      meshColor: "#fff",
    },
    "meshColor"
  )
  .onChange((v) => {
    material.color = new THREE.Color(v);
  });
```
