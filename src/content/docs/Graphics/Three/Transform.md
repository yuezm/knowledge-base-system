---
title: 变换
description: 变换
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## 移动

### 顶点移动

```js
const box = new THREE.BoxGeometry(1, 1, 1);

box1.translate(); // 修改几何体的顶点位置
```

### 物体移动

当设置 Object3D 物体位置时，以其**父元素的位置**来定位子元素的位置，如果没有父元素，则是世界坐标。即假使设置了父元素的位置，子元素位置随之改变

```js
const mesh = new THREE.Mesh(box, material);

// 修改3D物体的位置
mesh.position.x = 1;
mesh.position.y = 1;
mesh.position.z = 1;

// 修改3D物体的位置
mesh.position.set(2, 0, 0);

mesh.position.setX();
mesh.position.setY();
mesh.position.setZ();
```

## 旋转

### 顶点旋转

```js
const box = new THREE.BoxGeometry(1, 1, 1);

// 沿着自身的轴旋转
box.rotateX();
box.rotateY();
box.rotateZ();
```

### 物体旋转

```js
const mesh = new THREE.Mesh(box, material);

// 以XYZ轴顺序旋转
cube.rotation = new THREE.Euler(0, 0, 0);

// 沿着自身的轴旋转
mesh.rotation.x = Math.PI / 4;
mesh.rotation.y = Math.PI / 4;
mesh.rotation.z = Math.PI / 4;

// 沿着自身的轴旋转
mesh.rotateX(Math.PI / 4);
mesh.rotateY(Math.PI / 4);
mesh.rotateZ(Math.PI / 4);

// 沿着自身指定的轴旋转
mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);

// 沿着世界指定轴旋转
mesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);
```

## 缩放

### 顶点缩放

```js
const box = new THREE.BoxGeometry(1, 1, 1);

// x,y,z 方向缩放
box.scale(1, 1, 1);
```

### 物体缩放

```js
const mesh = new THREE.Mesh(box, material);

// x,y,z 方向缩放
mesh.scale.set(1, 1, 1);
```
