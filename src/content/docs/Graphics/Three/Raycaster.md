---
title: Raycaster
description: Raycaster
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

通过射线检测物体

## API

### Raycaster

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

## 参考

- [Raycaster](https://threejs.org/docs/index.html#api/en/core/Raycaster)
