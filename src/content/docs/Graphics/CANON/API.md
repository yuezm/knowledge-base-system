---
title: API
description: API
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## World

### gravity

重力设置

```ts
World.gravity: Vec3;

const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);
```

### addBody

添加刚体

```ts
World.addBody(body: Body): void

world.addBody(body);
```

### addConstraint

添加约束，例如 PointToPointConstraint（点对点约束）

```ts
World.addConstraint(c: Constraint): void
```

### step

按照设置时间，计算物理世界

```ts
World.step(dt: number, timeSinceLastCalled?: number, maxSubSteps?: number): void

function animate() {
  world.step(1 / 60);
  requestAnimationFrame(animate);
}
```

## Body

### mass

质量

```ts
World.mass: number

world.mass = 10;
```

### position

位置

```ts
World.position: Vec3;

World.position = new CANNON.Vec3(0, 2, -5), // 刚体位置
```

### type

刚体类型，有如下类型

1. DYNAMIC = 1： 受到物理力学影响，可以改变运动，可参与交互
2. KINEMATIC = 4：不受物理学影响，可以改变运动，可参与交互
3. STATIC = 2： 不受物理学影响，不可以改变运动，可参与交互

当创建 Body 时，如果未指定 type，则如果刚体的质量大于 0，则默认为 DYNAMIC，否则为 STATIC

```ts
World.type: BodyType;
```

### shape

刚体形状

```ts
World.shape: Shape;
```

### velocity

速度

## Shape

### Box

盒子（长方体），参数中的长宽高均为实际的一半

```ts
new CANNON.Box(halfExtents: Vec3);
```

### Plane

平面，可认为平面无限长

```ts
new CANNON.Plane();
```

### Cylinder

圆柱

```ts
new Cylinder(radiusTop?: number, radiusBottom?: number, height?: number, numSegments?: number): Cylinder
```

## RaycastVehicle

射线投射车辆，可组成汽车

```ts
// 车身刚体
const chassisBody = new CANNON.Body({
  mass: 10,
  shape: new CANNON.Box(new CANNON.Vec3(1, 0.5, 2)),
  position: new CANNON.Vec3(0, 2, -5),
});

// 整车
const vehicle = new CANNON.RaycastVehicle({
  chassisBody: chassisBody, // 底盘刚体
  // 0表示X，1表示Y，2表示Z
  // indexRightAxis: 2,
  // indexUpAxis: 1,
  // indexForwardAxis: 0,
});

// 轮子参数
const wheelOptions = {
  radius: 0.8, // 车轮半径
  directionLocal: new CANNON.Vec3(0, -1, 0), // 车轮向下方向
  axleLocal: new CANNON.Vec3(0, 0, 1), // 车轴方向（轴心）
  chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),

  suspensionStiffness: 30,
  suspensionRestLength: 1,
  frictionSlip: 5,
  dampingRelaxation: 2.3,
  dampingCompression: 4.4,
  maxSuspensionForce: 100000,
  rollInfluence: 0.01,
  maxSuspensionTravel: 0.3,
  customSlidingRotationalSpeed: -30,
  useCustomSlidingRotationalSpeed: true,
};

// 添加四个车轮
vehicle.addWheel({
  ...wheelOptions,
  chassisConnectionPointLocal: new CANNON.Vec3(-1, 1, 1.5), // 左前轮
});
vehicle.addWheel({
  ...wheelOptions,
  chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 1.5), // 右前轮
});
vehicle.addWheel({
  ...wheelOptions,
  chassisConnectionPointLocal: new CANNON.Vec3(-1, 1, -1.5), // 左后轮
});
vehicle.addWheel({
  ...wheelOptions,
  chassisConnectionPointLocal: new CANNON.Vec3(1, 1, -1.5), // 右后轮
});

for (let i = 0; i < 4; i++) {
  // 车轮形状
  const cylinderShape = new CANNON.Cylinder(
    wheelOptions.radius,
    wheelOptions.radius,
    wheelOptions.radius / 2,
    20
  );

  // 车轮刚体
  const wheelBody = new CANNON.Body({
    type: CANNON.Body.KINEMATIC, // 防止车身和车轮相互计算
    mass: 5,
  });

  // 旋转车轮和车身适配
  const q = new CANNON.Quaternion();
  q.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), -Math.PI / 2);
  const q1 = new CANNON.Quaternion();
  q1.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2);

  const total = q1.clone();
  total.mult(q, total);
  total.normalize();

  wheelBody.addShape(cylinderShape, new CANNON.Vec3(), total);
}
vehicle.addToWorld(world);
```

## CANNON 同步 THREE

```ts
function animate() {
  requestAnimationFrame(animate);

  // 更新物理世界
  world.step(1 / 60);

  // 计算车辆状态 vehicle.updateVehicle(1 / 60);

  // 同步刚体的位置和旋转，chassisMesh 为 THREE 的 Mesh
  chassisMesh.position.copy(chassisBody.position);
  chassisMesh.quaternion.copy(chassisBody.quaternion);

  // 渲染场景
  renderer.render(scene, camera);
}
```
