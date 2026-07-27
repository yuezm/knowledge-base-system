---
title: Particle
description: Particle
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: active
---

粒子系统是小图像的集合，来模拟复杂的物理运动。例如火，烟，水等等

## API

使用粒子系统时，请先设置可执行动画 `viewer.clock.shouldAnimate = true;`

### ParticleSystem

```ts
const particleSystem = viewer.scene.primitives.add(
  new Cesium.ParticleSystem({
    image: "path/image.png",

    //设置发射出的图像大小
    imageSize: new Cesium.Cartesian2(10, 10),
    // 也可以按照指定区间随机生成
    // minimumImageSize: new Cesium.Cartesian2(10, 10),
    // maximumImageSize: new Cesium.Cartesian2(60, 60),

    // 4x4变换矩阵，将粒子系统从模型转换为世界坐标，控制粒子系统的位置，如果需要跟随某个物体，则可以设置此属性来跟随
    modelMatrix: entity.computeModelMatrix(
      viewer.clock.startTime,
      new Cesium.Matrix4()
    ),

    //startColor endColor，代替color使得粒子的颜色在粒子的生命过程中会在这两种颜色之间平滑地混合。
    startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
    endColor: Cesium.Color.WHITE.withAlpha(0.0),

    //设置粒子图发射之后的最小/最大速度(以米/秒为单位),值越大，尾巴飘的越高
    minimumSpeed: 1.0,
    maximumSpeed: 4.0,

    //startScale endScale，代替scale设置粒子在生命周期内显示的初始和结束尺寸，
    //也是动态混合的作用。 值越大，初始时粒子图的大小越大
    startScale: 1.0,
    endScale: 5.0,

    //每秒发射的粒子数。数值越大，越浓密
    emissionRate: 5.0,

    //粒子系统生命周期内，按照指定周期，爆发一定数量的粒子。三个参数（time，minimum，maximum）
    bursts: [
      new Cesium.ParticleBurst({
        time: 5.0,
        minimum: 10,
        maximum: 100,
      }),
    ],

    //粒子系统会发射多久粒子，以秒为单位。默认为最大值
    lifetime: 16.0,

    // 粒子系统的粒子发射器；包括四种发射器：圆形、锥体、球体、长方体
    emitter: new Cesium.CircleEmitter(2.0),

    //4x4变换矩阵，用于在粒子系统中，粒子发射器的位置和朝向，比modelMatrix更加精细
    emitterModelMatrix: entity.computeModelMatrix(
      viewer.clock.startTime,
      new Cesium.Matrix4()
    ),

    // 一组强制回调。回调被传递一个粒子和上次的差值，每帧都要调用的回调函数来更新粒子。此updateCallback作用是用来改变粒子系统在每一个时间步长的属性，可以强制改变粒子系统的颜色、大小等值。在updateCallback更改gravity重力参数，值越大，烟雾离模型越近的地方飘的越高，可能出现负值，此时烟雾会向下方飘。
    updateCallback: applyGravity,
  })
);
```

### ParticleEmitter

#### BoxEmitter

定义了个盒型，将粒子随机地放置在盒子里的随机一个位置，并且具有从盒子中心发出的初始速度，然后沿着盒子的 6 个面的法向量向外运动

#### CircleEmitter

定义了一个圆形，在圆形面中的随意一个位置发射具有沿着 z 矢量的初始速度的粒子

#### ConeEmitter

定义了一个的锥体，在锥体顶点产生粒子，并向锥体内随机一个方向运动

#### SphereEmitter

定义了一个球体，在球体内随机产生粒子，并沿着球心向外运动

## 参考

- [ParticleSystem](https://cesium.com/learn/cesiumjs/ref-doc/ParticleSystem.html)
