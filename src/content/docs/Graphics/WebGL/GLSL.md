---
title: GLSL
description: GLSL
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## 基础数据类型

## 传递数据

### Uniform

JS 可以向 Vertex Shader、Fragment Shader 传值

```glsl
uniform vec3 u_resolution;
```

```ts
const uResolution = gl.getUniformLocation(program, "u_resolution");
gl.uniform3f(uResolution, 400.0, 400.0, 400.0);
```

### Attribute

JS 只可以向 Vertex Shader 传值；Vertex Shader 可以向 Fragment Shader 传值

```glsl
#version 300 es

in vec3 a_position;

out vec4 v_color; // 线 fragment shader 输出
```

```ts
const positionLoc = gl.getAttribLocation(program, "aPosition");
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
```

## Vertex Shader

```glsl
#version 300 es

in vec4 a_Position;  // 表示通过GPU传递过来的顶点，法线等数据

void main(){
  gl_Position = a_Position; // gl_Position 为顶点着色器的默认输出
}
```

### 内置变量

1. gl_Position：顶点坐标

## Fragment Shader

```glsl
#version 300 es

precision highp float; // 精度

uniform sampler2D u_image0; // 纹理

out vec4 out_color;

void main() {
  out_color = vec4(0, 0, 0, 1);
}
```

### 内置变量

1. gl_FragCoord：表示当前的窗口二位坐标，左下角为原点 (0, 0)，x 轴向右为正方向，y 轴向上为正方向
2. gl_FragColor：导出颜色，也可以直接赋值给他，内置变量，但是 out 语法能导出多个值

## 计算

### ceil

向上取整

```glsl
result = step($x);
```

### step

val 为阈值，x 输出值

1. 如果 输入值 < 阈值，return 0
2. 如果 输入值 >= 阈值，return 1

```glsl
result = step($val, $x);
```

### fract

返回小数部分，不论正负，fract 的返回值为 `[0,1)`

```glsl
result = fract($x);
```

场景

1. 将递增的数，编程周期性的数

### clamp

返回数的整数部分

```glsl
result = clamp($x);
```

### pow

```glsl
result = pow($x, $y); // x^y
```

### mix

插值函数，`result = x * (1 - a) + y * a`

```glsl
result = mix($x, $y, $a)
```

### smoothstep

平滑过渡

1. 如果 x 处于 [edge0, edge1] 时，输出 [0, 1]
2. 如果 x < edge0，则输出 0
3. 如果 x > edge1，则输出 1

```glsl
result = smoothstep($edge0, $edge1, $x);
```

### distance

```glsl
result = distance($x, $y);
```

### length

```glsl
result = length($x);
```

### 三角函数

```glsl
tan($x);
atan($y, $x); // 反正切

sin($x);
asin($x);

cos($x);
acos($x);
```

### normalize

归一化，使得向量的模为 1

```glsl
result = normalize($1);
```

### 加减乘除余

```glsl
// + - * /

result = cross($x, $y); // 叉乘

result = dot($x, $y); // 点乘

result = mod($x, $y);
```
