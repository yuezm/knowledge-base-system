---
title: Animation
description: Animation
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

动画就是描述一个物体的属性，连续变化的过程。Performer 存在属性变化，在每一个 Frame 上都存在不同的属性，而帧之间会用插值使得动画平滑，连贯起来后就是 Animation

1. Performer：动画表演者，可以是一个 mesh，light，camera
2. Frame：动画帧，此动画帧和 Scene 帧是不一样的
3. Animation：动画，描述的一个属性的变化
4. Scripted Performer
5. Performance
6. Clip
7. Cartoon

Babylon 有两种动画

1. 使用 Animation 类来创建动画
2. 使用 scene.onBeforeRenderObservable 来决定每一帧绘制的时候，物体的属性

### Animation

```ts
const animation = new BABYLON.Animation(
  name: string,
  property: string, // 对象的属性，例如 position.x
  frames_per_second: number, // 每秒多少帧
  property_type: number, // 属性的数据类型，见如下详情
  loop_mode?: number // 循环类型，见如下详情
);

// 动画设置每帧的属性对应的值
animation.setKeys([
  {
    frame: number, // 帧
    value: number, // 帧对应的值
  }
]);

// Performer 插入动画
target.animations.push(animation);

// 开始动画
scene.beginAnimation(target, from, to, is_loop);

// 指定物体和动画，无需绑定，即可开始动画，且可以同时指定多个动画
const myAnimateAble = scene.beginDirectAnimation(target, animations, from, to, loop);

// 针对动画的操作
myAnimateAble.pause()
myAnimateAble.restart()
myAnimateAble.stop()
myAnimateAble.reset()
```

- property_type：可取如下值

  BABYLON.Animation.ANIMATIONTYPE_COLOR3
  BABYLON.Animation.ANIMATIONTYPE_FLOAT
  BABYLON.Animation.ANIMATIONTYPE_beginDirectAnimation
  BABYLON.Animation.ANIMATIONTYPE_QUATERNION
  BABYLON.Animation.ANIMATIONTYPE_VECTOR2
  BABYLON.Animation.ANIMATIONTYPE_VECTOR3

- loop_mode：可取如下值

  BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE

#### 控制动画

控制属性变化的插值

```ts
BABYLON.Animation.prototype.floatInterpolateFunction = function (
  startValue,
  endValue,
  gradient
) {
  return startValue + (endValue - startValue) * gradient;
};
```

有如下函数

- floatInterpolateFunction
- quaternionInterpolateFunction
- quaternionInterpolateFunctionWithTangents
- vector3InterpolateFunction
- vector3InterpolateFunctionWithTangents
- vector2InterpolateFunction
- vector2InterpolateFunctionWithTangents
- sizeInterpolateFunction
- color3InterpolateFunction
- matrixInterpolateFunction

#### 权重动画

根据设置的权重同时取修改某个物体的属性

```ts
const idleAnim = scenebeginWeightedAnimation(
  target: any,
  from: number,
  to: number,
  weight: number,
  loop?: boolean,
  speedRatio?: number,
  onAnimationEnd?: () => void,
  animatable?: Animatable,
  targetMask?: (target: any) => boolean,
  onAnimationLoop?: () => void,
  isAdditive?: boolean): Animatable;
```

### AnimationGroup

组合动画

```ts
const animationGroup1 = new BABYLON.AnimationGroup(
  name: string,
  scene?: Nullable<Scene>,
  weight?: number,
  playOrder?: number
);

animationGroup1.addTargetedAnimation(animation1, mesh1);

// 组内动画帧数不一致时，可以序列化为一致的帧数
animationGroup1.normalize(0, 100);
```

#### 事件监听

```ts
// 分组动画结束
animationGroup1.onAnimationEndObservable.add(function () {});

// 分组动画，存在一个动画循环
animationGroup1.onAnimationLoopObservable.add(function (targetAnimation) {});

// 分组动画全部循环
animationGroup1.onAnimationGroupLoopObservable.add(function (group) {});
```

### AnimationGroupMask

```ts
// 在分组动画中，可以指定某个动画不执行，或者只执行
const mask1 = new BABYLON.AnimationGroupMask(
  [targetA.name, targetB.name],
  BABYLON.AnimationGroupMaskMode.Include // 可指定包含或者不包含
);

animGroup.mask = mask1;
```

### BVA

在执行动画时，状态都是由 CPU 计算而得，然后在赋值给目标，这种方式是较为消耗性能的，可以先将该动画预计算（pre-computing），存储于于纹理中，然后再顶点着色器中使用，在使用的时候消耗 GPU，从而解放 CPU，这种方式称为 BVA （Baked Texture Animations）[^baked_texture_animations]

但是，仍然存在如下缺点

1. 无法同时混合动画
2. 可能动画不会很顺滑，依靠于预设帧数

## 参考

- [DeepDive animation](https://doc.babylonjs.com/features/featuresDeepDive/animation)

[^baked_texture_animations]: [baked_texture_animations](https://doc.babylonjs.com/features/featuresDeepDive/animation/baked_texture_animations)
