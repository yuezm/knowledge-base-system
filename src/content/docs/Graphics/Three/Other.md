---
title: 其他
description: 其他
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: active
---

## Raycaster

鼠标拾取检测

```js
const raycaster = new THREE.Raycaster();

// 获取鼠标的坐标（Three 的裁剪坐标系）
const point = new THREE.Vector2();

window.addEventListener("pointermove", onPointerMove);

window.onpointermove = function (event) {
  // 将鼠标的二维坐标转换为三维坐标
  point.x = (event.clientX / window.innerWidth) * 2 - 1;
  point.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

function render() {
  raycaster.setFromCamera(point, camera);

  // 添加需要监听的 Mesh，并获取射线所经过的所有物体
  const intersections = raycaster.intersectObjects([mesh1, mesh2, mesh3]);

  if (intersections.length > 0) {
    intersections[0].object.material.color.set("yellow");
  }
}
```

## 颜色空间

颜色空间（Color management），Three 将色彩空间分为如下。例如在设置纹理，输出到显示设备时，可以指定颜色空间

```ts
THREE.NoColorSpace;
THREE.LinearSRGBColorSpace; // 颜色值是线性分布的，即颜色值直接与物理光强成正比
THREE.SRGBColorSpace; // 由于人眼的感知特性，颜色和光线强度是不成正比的，通常需要进行伽马修正，用于非物理准确的渲染，例如显示器
THREE.DisplayP3ColorSpace; // 用于需要更宽广色域的场景，以支持更鲜艳的颜色表现
THREE.LinearDisplayP3ColorSpace;
```

## 参考

- [Raycaster](https://threejs.org/docs/index.html#api/en/core/Raycaster)
- [Color management](https://threejs.org/docs/#manual/zh/introduction/Color-management)
