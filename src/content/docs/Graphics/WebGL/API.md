---
title: API
description: API
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## 初始化

```ts
const canvas = document.createElement("canvas");
const gl = canvas.getContext("webgl2");
```

## 画布

```ts
// 设置画布
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
```

## 缓冲区

### 创建缓冲区

```ts
const buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

gl.bufferData(gl.ARRAY_BUFFER, $顶点数据, gl.STATIC_DRAW);
```

**为什么需要 gl.bindBuffer？**

1. gl.createBuffer：告诉 GPU 需要开辟一块区域来存储数据
2. gl.ARRAY_BUFFER 表示了 WebGL 中 GPU 的一个插槽，gl.bindBuffer 的意思是将 buffer 挂载到这个插槽
3. 当调用 gl.bufferData 向这个插槽注入数据时，其实也就是向 buffer 注入数据，通过总线将数据从 CPU 拷贝到 GPU 存储

**为什么需要这么设计？**

1. 性能优化：避免频繁的传递数据
2. 解耦：将数据和插槽解耦，插槽和数据（Buffer）可以任意匹配

### VAO

VAO（Vertex Attribute Object）解决频繁调用 bindBuffer、vertexAttribPointer 带来的开销。VAO 记录了所有的配置状态，在后续使用时，可以一键激活（可以想象成一键预设）

```ts
const vao = gl.createVertexArray(); // 创建 VAO

// 绑定 VAO（后续操作会记录到当前 VAO）
gl.bindVertexArray(vao);

// 所有的 gl.bindBuffer(gl.ARRAY_BUFFER, ...)
// 所有的 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ...)
// 所有的 gl.vertexAttribPointer(...)
// 所有的 gl.enableVertexAttribArray(...)

// 解绑 VAO（配置完成）
gl.bindVertexArray(null);
```

### 清空缓冲区

```ts
gl.clearColor(0, 0, 0, 0); // 清除缓冲时，设置的颜色
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
```

- gl.COLOR_BUFFER_BIT：表示颜色缓冲区，也就是存储像素颜色值的缓冲区。
- gl.DEPTH_BUFFER_BIT：表示深度缓冲区，它用于存储每个像素的深度信息，在进行深度测试时会用到。
- gl.STENCIL_BUFFER_BIT：表示模板缓冲区，可用于实现一些特殊的渲染效果，如遮罩

## 绘制

```ts
gl.drawArrays(mode, first, count):void; // 该函数按照 顶点缓冲 区里顶点的顺序来绘制图元
gl.drawElements(mode, count, type, offset):void; // 此函数借助 索引缓冲区 来指定要使用的顶点
```

| 枚举值            | 类型   | 特点                                                             | 应用场景                              |
| ----------------- | ------ | ---------------------------------------------------------------- | ------------------------------------- |
| gl.POINTS         | 点     | 每个顶点绘制为一个点                                             | 用于绘制离散点 散点图、星空、调试标记 |
| gl.LINES          | 线     | 每两个顶点组成一条独立线段，线段相互独立                         | 网格线、物体轮廓                      |
| gl.LINE_STRIP     | 线     | 新顶点与前一顶点组成线段，形成折线                               | 连续的折线 折线图、路径               |
| gl.LINE_LOOP      | 线     | 类似 gl.LINE_STRIP，最后连接首尾顶点形成封闭环                   | 封闭的折线                            |
| gl.TRIANGLES      | 三角形 | 每三个顶点组成一个三角形，三角形相互独立，顶点数据相对冗余，     | 不相连的多边形或物体                  |
| gl.TRIANGLE_STRIP | 三角形 | 从第三个顶点开始，每个新顶点和前两个顶点组成新三角形             | 绘制圆柱体侧面、地形等                |
| gl.TRIANGLE_FAN   | 三角形 | 第一个顶点为公共顶点，新顶点和第一个顶点及前一个顶点组成新三角形 | 绘制扇形、圆形等                      |

## 缓冲帧

WebGL 可以存在多个缓冲帧，可分为默认缓冲帧（画布）和自定义缓冲帧。自定义缓冲帧可以将输出另外存储起来

```ts
const fbo = gl.createFramebuffer(); // 创建缓冲帧

gl.bindFramebuffer(gl.FRAMEBUFFER, fbo); // 输出于当前绑定的缓冲帧

gl.bindFramebuffer(gl.FRAMEBUFFER, null); // 输出于画布
```

## 场景

Scene（场景）是多图形的组织形式。Scene 本质是一个树

1. 每次渲染时，由根节点遍历，渲染每个节点
2. 子节点的位置、方向收到附父节点影响，即子节点的矩阵收到父节点矩阵影响

## 纹理

### 创建纹理

```ts
// 创建图片纹理
const texture = gl.createTexture();
gl.activeTexture(gl.TEXTURE0); // 此时就指定了纹理单元，可以指定多个纹理单元
gl.bindTexture(gl.TEXTURE_2D, texture);

// 此时可以生成mipMap
gl.generateMipmap(gl.TEXTURE_2D);

// 设置水平方向，超出的处理
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
// 设置竖直方向，超出的处理
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

// 以下是设置，当纹理的尺寸和需要绘制的图形尺寸不同时，如何处理
// 近处渲染，表示当纹理需要缩小时，如何处理
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
// 远处渲染，表示当纹理需要放大时，如何处理
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
gl.uniform1i(uImage, 0); // 这里的0需要和上面的纹理的单元对应
```

纹理的超出时，有多种处理方式

| 枚举值             | 描述               |
| ------------------ | ------------------ |
| gl.REPEAT          | 重复纹理（默认值） |
| gl.MIRRORED_REPEAT | 镜像重复纹理       |
| gl.CLAMP_TO_EDGE   | 延伸边缘像素       |

纹理的尺寸和需要绘制的图形尺寸不同时，有多种处理方式

| 枚举值                    | 描述                                                                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gl.NEAREST                | 选择最近的像素（速度快，锯齿明显）                                                                                                                                   |
| gl.LINEAR                 | 线性插值，线性过滤模式会对纹理进行双线性插值。当需要从纹理中采样颜色值时，它会选取距离采样点最近的 4 个纹素（纹理像素），并依据采样点到这 4 个纹素的距离进行加权平均 |
| gl.NEAREST_MIPMAP_NEAREST | 选择最合适的贴图，然后从上面找到一个像素                                                                                                                             |
| gl.LINEAR_MIPMAP_NEAREST  | 选择最合适的贴图，然后取出 4 个像素进行混合                                                                                                                          |
| gl.NEAREST_MIPMAP_LINEAR  | (默认值)，选择最合适的两个贴图，从每个上面选择 1 个像素然后混合                                                                                                      |
| gl.LINEAR_MIPMAP_LINEAR   | 三线性过滤。选择最合适的两个贴图，从每个上选择 4 个像素然后混合                                                                                                      |

### 设置 UV

```ts
const uv = [0, 0, 1, 0, 0, 1, 1, 1];
const uvBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);

const aUVCoord = gl.getAttribLocation(program, "a_uvCoord");
gl.enableVertexAttribArray(aUVCoord);
gl.vertexAttribPointer(aUVCoord, 2, gl.FLOAT, false, 0, 0);
```

### 纹理投影

将纹理投影后，在做为别的图形的纹理。有如下场景

1. 真正的投影纹理：从某个虚拟的投影仪，将一张纹理投影到场景中的任意物体上
2. 先渲染到一个 Render To Texture，然后将这个渲染结果做为普通纹理铁道物体上

## 阴影

Shadow Map，场景需要渲染两次

1. 第一次：根据光照，计算出阴影贴图
2. 第二次：根据阴影贴图，计算出每个区域是否有阴影

## 其他

### 处理 devicePixelRatio

devicePixelRatio 是设别像素比，公式为 $devicePixelRatio = 逻辑像素 / 物理像素$。本质上是物理像素和逻辑像素不同，从而导致在高分屏（例如 Retina）模糊。

如何处理

1. 将画布的大小根据 devicePixelRatio 放大，在放大的画布上绘制
2. 浏览器在自动缩放至指定的 CSS 像素大小

边界处理

1. 多个显示器时，可能不同显示器 devicePixelRatio 不同
2. 捕捉屏幕像素时，映射到画布时，需要计算缩放

- [texParameter API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/texParameter)
