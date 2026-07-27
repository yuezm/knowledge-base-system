---
title: QA
description: QA
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: stub
---

## 如何绘制文字

1. 使用 [FontLoader](/graphics/three/loader/#fontloader) + [TextGeometry](/graphics/three/geometory/#textgeometry)，可以使用工具 [Facetype.js](https://gero3.github.io/facetype.js/) 转换字体文件

   能展示已经定义的文字；但是无法处理文本的一些特性，例如字间距，换行等等

2. 使用 Canvas 2D 绘制文字，转换为图片后，再做为纹理

   可以根据字体文件渲染文字；但是需要消耗一定的性能，且 Canvas 生成的乃是像素图，在镜头靠近的时候，可能会存在锯齿

3. 预处理字体文件为纹理，使用文字时，计算该文字距边缘的距离
4. 使用 CSS3DRenderer
5. 使用 HTML + CSS

   实现简单，可以根据字体文件渲染文字；但是悬浮于场景之上，不受控制，例如无法被其他物体遮挡

6. 使用三方库，例如 [Troika Three Text](https://www.npmjs.com/package/troika-three-text)

   troika-three-text 易用，性能较高
