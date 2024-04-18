---
title: Devtools之Performance
description: Devtools之Performance
---

Chrome Devtools 提供了查看性能的工具 Performance，可以查看如下信息

- 页面加载性能指标
- 网络请求的顺序，耗时等等
- 内存使用情况
- 帧率
- 主线程执行情况
- ......

我们常说的性能，存在诸多影响因素，例如

- 客户端的硬件好坏
- 客户端到服务端的网络好坏
- 服务端的资源
- 前端资源

这几点像木桶效应，存在任何一个短板，都会导致用户体验急剧下滑，我们可以使用 Performance 进行分，并优化页面性能。

## Performance

### 概览

可以查看页面在某一时刻的状态，鼠标 Hover 即可

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/596a22bed667f5bd891603c4446646a35e5e7cbd6c56195a775ead4d3fbc8d62.png)

### Network

常用颜色如下所示，且同颜色下深色表示优先级高，浅色表示优先级低

- 紫色：表示 CSS 请求
- 黄色：表示 Javascript 请求
- 绿色：图片请求
- 蓝色：HTML 请求，AJAX 请求
- 灰色：AJAX 请求

作用

1. 查看请求的发起时间和结束时间，可以用来分析资源请求分配时间是否合理
2. 查看资源的网络请求时间和以及前端解析时间，用于分析资源大小是否合理

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/ae977733922f021ab46c1d92bf648a5af3e1e5564ac18a8696acf5f3dc3d8d0d.png)

还可以在 Devtools 的 Network 下查看一个请求的耗时细分
![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/aa2bc355265d22c4cf23f389b6eaebb1bff3ee25c68ad39f87bffc5dab4dec98.png)

### Frames

此处可以查看每一帧的耗时和间隔，用于判断渲染是否流畅，是否被什么阻塞了

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/003dea4edaa85c7d054e9e827a8771e81904ea2f9063107c670520de5d1a43fd.png)

查看帧数

### Timings

查看 Web 性能指标

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/c20b9756a4ff75b7a277d9e5917ecfb76ca111ff52b33f1e98568bc89dee2654.png)

### 线程面板

记录了主线程和 worker 线程的执行栈（火焰图），可以分析调用栈是否合理。例如可以分析在某一帧的时候，是否因为 Javascript 线程执行时间过久，从而堵塞了 GUI 线程

内部常用的颜色标注如下

- 蓝色：Loading 或 Parsing
- 黄色：Scripting
- 紫色：Rendering
- 绿色：Painting
- 灰色：System
- 空闲：Idle

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/060e6fccedf20d3b11c16dc585c2b94f09b2a72978a7aff96392825459632e7f.png)

### Summary

总的显示线程面板，可以分析具体是哪一块比较耗时，例如可以根据 Rendering 耗时情况，判断是否存在不合理的重排

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/4b0378617d95004371afb36848139cde6a26968edd0d58fb82143e3f82f82e15.png)

### Memory

记录内存使用情况。例如可以从内存的曲线判断是否存在内存泄漏

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/0521dda6a99b0a31c698497b256fc072fcbe86d83693767d53dab0157d120e8a.png)

## Performance monitor

可以实时监测页面的状态，可通过 Devtools 命令面板开启

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/48630672d00145ec712adc6185e32135879f5b766658b81256cdaf80aaea30f3.png)

## 举个例子

```js
for (let i = 0; i < 1000; i++) {
  div.className = "div";
  div.style.left = Math.random() * (width - 100) + "px";
  div.style.top = Math.random() * (height - 100) + "px";

  document.body.appendChild(div);
}
});


setInterval(function interval() {
  const divList = document.querySelectorAll(".div");

  divList.forEach((div) => {
    // const top = parseFloat(div.style.top) - 1;
    const top = div.offsetTop - 1; // 使用 layout API

    div.style.top = (top < 0 ? height : top) + "px";
  });
}, 50);
```

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/acad954136a3760fc6fc8e9367f7c5f45f95ff8e5c278d225d1d0cd51e94f246.png)
![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/6790db1f5e2c1d8163033c3df29ba1190ed1015a74d2a76f1fe482a93c82e655.png)

可以据 Performance 分析

1. 此次任务主要消耗在 Rendering（重排），占用绝大部分，即代码中必然存在不合理的重排
2. 主线程阻塞，阻塞时间约为 800ms，阻塞原因为 interval 函数调用过久，原因是获取 offsetTop 造成 layout
