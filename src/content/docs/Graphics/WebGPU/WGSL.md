---
title: WGSL
description: WGSL
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## 数据结构

### 基本类型

```wgsl
boolean // 布尔值
u32 // 无符号32位整型
i32 // 32位整型
f16 // 16 位浮点型
f32 // 32位浮点型
```

### Vec（向量）

```wgsl
// vec?<type>
vec2<u32> // 2 维向量
vec3<i32> // 3 维向量
```

#### 初始化

```wgsl
var v1:  vec2<i32> = vec2<i32>(1, 2);
var v2 = vec2<i32>(1, 2);
var v3 = vec2<i32>(); // 默认为0

// 从其他向量初始化
var v4: vec3<i32> = vec3<i32>(v3, 3);

// 缩写，<i32> ==> i，<f32> ==> f，<u32> ==> u，<f16> ==> h
var v5 = vec4<f32>(1, 2, 3, 4);
var v6 = vec4f(1, 2, 3, 4);
```

#### 访问

```wgsl
var v1 = vec4<i32>(1, 2, 3, 4);

v1.x  // x,y,z,w
v1.r  // r,g,b,a
v1[0] // 还可以以索引形式访问，以0起始

// 访问多个元素
var v2: vec2<i32> = v1.xy
```

#### 计算

按照向量的规则进行加，减，乘，除

### Matrix 矩阵

```wgsl
mat2x2<f32>; // 2*2 矩阵
mat3x3<f32>; // 3*3 矩阵
mat4x4<f32>; // 4*4 矩阵
```

#### 初始化

矩阵初始化数据传递为从左到右，**一列一列**输入，即 `mat2x2<f32>(1, 1 0, 0)` = $\begin{bmatrix}
1 & 0 \\
1 & 0 \\
\end{bmatrix}$

```wgsl
mat2x2<f32>(1, 1 0, 0);
mat3x3<f32>();
mat4x4<f32>();

// 缩写，规则和vec保持一致
mat4x4f();
```

#### 访问

```wgsl
var mat1 = mat4x4<f32>();

var vec1: vec4f = mat1[0];
```

#### 计算

按照矩阵的规则进行加，减，乘，除

### Arrays（数组）

```wgsl
array<f32, 5>;   // 长度位5，数据类型为f32的数组
array<vec4f, 6>; // 长度位6，数据类型为vec4f的数组
```

#### 初始化

```wgsl
let arr1 = array<f32>(1.0, 2.0);
let arr2 = array<vec4f>(vec4f(1.0), vec4f(2.0));
```

### Struct（结构体）

```wgsl
struct Stuff {
  color: vec4f,
  size: f32,
  verts: array<vec3f>,
};
```

### Function（函数）

```wgsl
fn add(a: f32, b: f32) -> f32 {
  return a + b;
}
```

## 关键字

内置变量

| Predeclared Name | Stage  | Direction | Type      |
| ---------------- | ------ | --------- | --------- |
| vertex_index     | vertex | input     | u32       |
| instance_index   | vertex | input     | u32       |
| position         | vertex | output    | vec4<f32> |

| Predeclared Name | Stage    | Direction | Type      |
| ---------------- | -------- | --------- | --------- |
| position         | fragment | input     | vec4<f32> |
| front_facing     | fragment | input     | bool      |
| frag_depth       | fragment | output    | f32       |
| sample_index     | fragment | input     | u32       |
| sample_mask      | fragment | input     | u32       |
| sample_mask      | fragment | output    | u32       |

| Predeclared Name       | Stage   | Direction | Type      |
| ---------------------- | ------- | --------- | --------- |
| local_invocation_id    | compute | input     | vec3<u32> |
| local_invocation_index | compute | input     | u32       |
| global_invocation_id   | compute | input     | vec3<u32> |
| workgroup_id           | compute | input     | vec3<u32> |
| num_workgroups         | compute | input     | vec3<u32> |

```wgsl
arrayLength(); // 内置方法，返回数组长度
```

```wgsl
var<uniform> // 参数由unifrom传递而来
@vertex // 顶点着色器
@fragment // 片元着色器
@compute // 计算着色器
@location // 指定缓冲的顶点数据
@builtin // 和内置变量一起使用，如 @builtin(position)
@group // 绑定uniform指定的group
@binding // 绑定unifrom指定的binding
```

## 声明

```wgsl
// 变量声明
let a = 1;
var b = 2;

// 函数声明
fn add(a: f32, b: f32) -> f32 {
  return a + b;
}
```

## Vertex Shader

### 声明

```wgsl
// @vertex 指定为顶点着色器
// main 为入口函数，名称和 vertex.entryPoint 保持一致
// @builtin(position) 返回值和position绑定，做为顶点数据
@vertex fn main() -> @builtin(position): vec4f {
  return vec4f(0, 0, 0, 0);
}
```

### 参数和返回值

多个参数

```wgsl
@vertex
fn main(
  // 这里的@location(n)的n和渲染管线创建vertex时，定义的shaderLocation保持一致
  @location(0) p1: vec3<f32>,
  @location(1) p2: vec3<f32>
) -> @builtin(position) vec4<f32> {
    return vec4<f32>(0, 0, 0, 0);
}
```

参数为结构体

```wgsl
strut Input {
  @location(0) p1: vec3<f32>,
  @location(1) p2: vec3<f32>
}

@vertex
fn main(i: Input) -> @builtin(position) vec4<f32> {
    return vec4<f32>(0, 0, 0, 0);
}
```

返回值为结构体

```wgsl
// 结构体
struct Out {
  // 依旧需要指出返回的顶点数据
  @builtin(position) pos: vec4<f32>,

  // 这里的@location(n)的n，定义的是片元着色器访问参数的序号，和渲染管线无关
  @location(0) originPos: vec3<f32>, // 自定义变量，可以向片元着色器传递数据
  @location(1) color: vec3<f32>, // 自定义变量，可以向片元着色器传递数据
}

@vertex
fn main() -> Out {
  var out: Out;
  out.pos = vec4<f32>(0, 0, 0, 0);
  out.originPos = vec3<f32>(0, 0, 0);
  out.color = vec3<f32>(0, 0, 0);

  return out;
}
```

### Uniform 传值

```wgsl
// @group(0) 指定分组，和 GPUBindGroup 中的 group 序号保持一致
// @binding(0) 指定组内序号，和 GPUBindGroup 中的 binding 序号保持一致
// var<uniform> 声明为uniform 传值
@group(0) @binding(0) var<uniform> S:mat4x4<f32>;

@vertex
fn main() -> @builtin(position) vec4<f32> {
  // 此时就可以使用 uniform 的值了
  return vec4<f32>(0, 0, 0, 0);
}
```

## Fragment Shader

```wgsl
// @fragment 指定片元着色器
// main 位入口函数，与 fragment.entryPoint 保持一致
// @location(0) 指定返回顶点的颜色
@fragment
fn main() -> @location(0) vec4<f32> {
    return vec4<f32>(0, 1 , 0, 1.0);
}
```

### 参数和返回值

多个参数

```
@fragment
fn main(
  @builtin(position) frag_coord: vec4<f32>, // 片元的位置
  @location(0) originPos: vec3<f32>,  // vertex 自定义传值（插值）
  @location(1) color:vec3<f32> // 自定义传值（插值）
) -> @location(0) vec4<f32> {
    return vec4<f32>(0, 1 , 0, 1.0);
}
```

参数为结构体

```
struct Input {
  @builtin(position) frag_coord: vec4<f32>,
  @location(0) originPos: vec3<f32>,
  @location(1) color:vec3<f32>
}

@fragment
fn main(i: Input) -> @location(0) vec4<f32> {
    return vec4<f32>(0, 1 , 0, 1.0);
}
```

返回值为结构体

```wgsl
struct Out {
  @location(0) albedo: vec4f;
}

@fragment
fn main(i: Input) -> Out {
  var out: Out;
  out.albedo = vec4<f32>(0, 1 , 0, 1.0);
  return out;
}
```

## 参考

[WGSL 官网文档](https://www.w3.org/TR/WGSL)
