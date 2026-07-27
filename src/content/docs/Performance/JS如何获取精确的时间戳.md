---
title: JS如何获取精确的时间戳
description: JS如何获取精确的时间戳
status: active
---

我们一般通过 `Date.now()` 来获取时间戳，该时间戳的精度是毫秒，那如果想获取微秒级别的时间戳

## 浏览器环境

我们可以使用 `performance.now()` 来获取时间，该 API 具有如下特点

1. 返回的时间是基于 _time origin_ 的相对值，即是从 *time origin*到现在的时间
2. 返回的时间单位是*毫秒*，它的浮点数表示的更加精确的时间，可达到微秒级
3. 返回的时间不是高精度的，各个浏览器做了不同的近似处理

可以使用以下方法获取近似的微秒时间戳

```js
const timestamp = performance.timeOrigin * 1000 + performance.now() * 1000;
```

## Node.js 环境

可以使用 `process.hrtime.bigint()` 可以获取纳秒的时间戳，该 API 具有如下特点

1. 返回时间的基准是过去的任意时间，则只能用于计算差值，无法直接计算挂钟时间
2. 返回时间单位是*纳秒*

可以使用以下方法获取近似的微秒时间戳

```js
const baseDateNow = BigInt(Date.now()) * 1000;
const baseHrtime = process.hrtime.bigint();

// 在其他的一个时间点，例如5秒后
setTimeout(() => {
  const timestamp = baseDateNow + (process.hrtime.bigint() - baseHrtime) / 1000;
  console.log(timestamp);
}, 5000);
```
