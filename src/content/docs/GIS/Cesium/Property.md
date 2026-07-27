---
title: Property
description: Property
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: active
---

Property 允许 Cesium 处理动态数据，特别是和时间相关的，Property 能根据不同的时间来返回不同值

## API

### Property

抽象类，有如下实现

#### CompositeProperty

用于组合多个 Property 实例，可以根据条件或时间选择使用其中的一个 Property 的值

#### ConstantProperty

表示一个恒定不变的值，无论何时查询都会返回同一个值

#### SampledProperty

存储了一系列在特定时间点的样本值，可以根据时间插值来获取这些样本之间的值

#### TimeIntervalCollectionProperty

用于存储一系列时间间隔和对应的值，可以指定在不同时间间隔内使用的值。

TimeIntervalCollectionProperty 和 SampledProperty 差不多，主要区别就是 SampledProperty 是按照每一时刻修改 Property 的，实现效果是平滑的变化；而 TimeIntervalCollectionProperty 是按照每个时间段来修改 Property 的，单独每一个时间段内属性值是不变的，实现效果是跳跃式的变化

#### MaterialProperty

材质属性

#### PositionProperty

抽象类，位置属性

##### CompositePositionProperty

##### ConstantPositionProperty

##### SampledPositionProperty

##### TimeIntervalCollectionPositionProperty

#### ReferenceProperty

连接到其他属性。例如多个实体共享一个属性

#### CallbackProperty

允许通过回调函数来动态生成值，该函数在每次请求值时都会被调用

## 参考

- [Property](https://cesium.com/learn/cesiumjs/ref-doc/Property.html)
