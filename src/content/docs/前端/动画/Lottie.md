---
title: Lottie 动画
description: Lottie 动画
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

Lottie 是 Airbnb 开源的一种动画格式，具有如下特点

1. 文件体积较小，Lottie 以 JSON 存储关键帧，路径，形状，颜色等等信息，而不是逐帧存储位图信息
2. 多平台兼容且渲染效率高，支持多个平台，例如 Web，IOS，Android 等等
3. 动画质量较高，动画基于矢量图形，能适配不同分辨率
4. 支持复杂动画，能实现诸如形状渐变，路径动画，遮罩等等
5. 支持交互控制，可以控制动画的播放，暂停，停止等等操作

## 指引

1. 创建并导出动画，可以使用如下方式导出动画

   1. 借助 https://lottiefiles.com/ 自己创建并下载 JSON
   2. 使用 AE 做好动画，用 Bodymovin 导出

2. Lottie 加载动画

```ts
import { useEffect, useRef } from "react";
import * as Lottie from "lottie";

import data from "../Lottie Lego.json";

Lottie.loadAnimation({
  container: $DOM,
  renderer: "svg",
  loop: true,
  autoplay: true,
  // path: $URL,
  animationData: data,
});
```
