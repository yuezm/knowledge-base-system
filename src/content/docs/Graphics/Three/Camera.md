---
title: Camera
description: Camera
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: active
---

## 姿态方向

| 方式     | 长度   | 形式               | 是否能表示任意 3D 旋转 | 描述                       |
| -------- | ------ | ------------------ | ---------------------- | -------------------------- |
| 欧拉角   | 3      | `(roll,pitch,yaw)` | 是                     | 直观，但存在万向锁         |
| 四元素   | 4      | `[x,y,z,w]`        | 是                     | 不直观，差值计算简单       |
| 旋转矩阵 | 9      | 3×3 矩阵           | 是                     | 用于变换                   |
| 轴角     | 3 或 4 |                    | 是                     |                            |
| 方向向量 | 3      | `(x,y,z)`          | 否                     | 只能表示朝向，不能表示旋转 |

- 欧拉角存在“**万向节锁**”，当一个角度到达 $90^°$时，无法单独表示两外两个角度
- 四元素以超球面来描述旋转，即 $x^2 + y^2 + z^2 + w^2 = 1$，任意两个点之间都存在一个最短路径，所以好计算差值

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

## 其他

### 动态相机跟随

```ts
// 获取跟随物体的方向
const quaternion = mesh.getWorldQuaternion(new THREE.Quaternion());
const carDirection = new THREE.Vector3(1, 0, 0);
carDirection.applyQuaternion(quaternion);

// 相机放在跟随在前进方向之后
const targetCameraPos = new THREE.Vector3()
  .copy(mesh.position)
  .add(carDirection.multiplyScalar(-10)) // 后方偏移距离
  .add(new THREE.Vector3(0, 5, 0)); // 高度偏移

this.camera.position.lerp(targetCameraPos, 0.01);

this.camera.lookAt(mesh.position);
```

## 参考

- [PerspectiveCamera](https://threejs.org/docs/index.html?q=Camera#api/en/cameras/PerspectiveCamera)
