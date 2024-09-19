---
title: Three
description: Three
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

Three.js 是一个 Javascript 库，用于在网页上创建和显示 3D 图形。它使用 WebGL 来渲染图形，并提供了一组易于使用的 API 来创建和操作 3D 对象、材质、灯光和相机等。

WebGL 的整体渲染逻辑如下

1. 模型准备: 准备模型的顶点，发现，材质，纹理等
2. 变换
   1. 模型变换
   2. 视图变换（相机变换）
   3. 投影变换
3. 顶点着色器
4. 片元着色器
5. 光栅化
6. 帧缓存
7. 后处理
8. 渲染

Three.js 可以对此流程进行简化，例如

1. 提供了默认着色器，可根据材质选择
2. 提供了多种灯光
3. 提供了相机
