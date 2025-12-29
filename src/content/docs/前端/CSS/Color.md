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

## 参考

- [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
- [backdrop-filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter)
