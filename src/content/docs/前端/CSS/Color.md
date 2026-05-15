---
title: Color
description: Color
---

## API

### 颜色

CSS 能如下表示颜色

```css
/* 关键字 */
color: red;
color: currentColor;
color: transparent;

/* 十六进制 */
color: #ff0000;
color: #f00;

/* rgb，rgba */
color: rgb(255, 0, 0);
color: rgb(100%, 0%, 0%);

/* hsl */
color: hsl(0, 100%, 50%);
color: hsla(0, 100%, 50%, 0.5);

/* 还有其他的颜色空间，但是很少用 */
color: lab();
color: lch();

/* color 语法，表示使用 display-p3颜色空间，RGB分别为0.8、0.2、0.1，透明度为1 */
color(display-p3 0.8 0.2 0.1 / 1);

/* color-mix，混个多个颜色 */
color: color-mix(in srgb, #34c9eb 20%, white);

```

### filter

将模糊或颜色偏移等图形效果应用于元素

```css
filter: blur(5px);
```

### backdrop-filter

为一个元素后面区域添加图形效果（如模糊或颜色偏移）。因为它适用于元素背后的所有元素，为了看到效果，必须使**元素或其背景至少部分透明**。

```css
backdrop-filter: blur(2px);
```

## 色彩模型

常用模型如下，RGB、HLS、YUV 模型

1. RGB: 以三个颜色分量 Red、Blue、Green 来合成颜色，是一种**加色模型**。常用于发光的设备中，例如显示器

2. HLS: 以色相、亮度、对比度来描述颜色。符合人类对于颜色的直观认知
   - Hue: 色相，用 0~360°来表示色轮上的颜色
   - Lightness: 亮度，控制颜色明暗。0%时为黑色，100%时为白色，50%时颜色最纯
   - Saturation: 饱和度，颜色鲜艳程度。0%时灰色，100%时最纯的颜色

3. YUV:以灰度值、蓝色投影分量、红色投影分量来描述颜色。常用于**视频压缩**和黑白电视机兼容
   - Y（Luma）: 灰度值，如果只有 Y 则图像是黑白的
   - U（Chroma Blue）:蓝色投影分量
   - V (Chroma Red): 红色投影分量

## 参考

- [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
- [backdrop-filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter)
