---
title: Camera
description: Camera
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### PerspectiveCamera

透视相机 --> [透视投影](/graphics/%E5%9B%BE%E5%BD%A2%E5%AD%A6/#projection%E6%8A%95%E5%BD%B1)

```js
// 根据透视投影规则（近点，远点，画布长宽比，视角），设置相机的视锥体
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
```

#### 属性

```js
// 位置
camera.position.set(x, y, z);

camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 10;

camera.position.setX(10);
camera.position.setY(10);
camera.position.setZ(10);

// aspect 画布长宽比
camera.aspect = window.innerWidth / window.innerHeight;
```

#### 方法

```js
camera.updateProjectionMatrix(); // 更新相机的投影矩阵
```

### OrthographicCamera

正交相机 --> [正交投影](/graphics/%E5%9B%BE%E5%BD%A2%E5%AD%A6/#projection%E6%8A%95%E5%BD%B1)

```js
// 根据正交投影规则，左，右，上，下 的范围 及距离画布的距离，设置相机的视锥体
const camera = new THREE.OrthographicCamera(
  width / -2,
  width / 2,
  height / 2,
  height / -2,
  1,
  1000
);
```

## 参考

- [PerspectiveCamera](https://threejs.org/docs/index.html?q=Camera#api/en/cameras/PerspectiveCamera)
