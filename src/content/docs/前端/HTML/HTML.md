---
title: HTML
description: HTML
status: evergreen
---

## link

## rel

### preload、prefetch

preload、prefetch、defer、async: 都可以异步加载资源

**【preload 和 prefetch 区别】**

1. 语义: preload 为预加载，表示该资源当前界面会使用；prefetch 为预取，表示该资源可能会使用
2. 加载时机: preload 表示立即加载，加载完毕后不会立即解析；prefetch 为预取，是否加载资源由浏览器实现
3. 资源优先级: preload 使用 as 控制优先级*style>script>font>image>audio>video*，如果 as 为空，则认为是 XHR，优先级最低；prefeth 无优先级控制

**不要 preload 和 prefetch 对同一个资源使用，会出现重复加载**；**prealod 虽然会立即加载，但并不会立即执行，而是等到需要的时候才会执行**

如果想立即执行 css

```
<link rel="preload" href="xx" as="style" onload="this.rel='stylesheet'">
```

####

**【preload 和 defer、async 异同】**

1. 下载时机: 都是立即开始下载
2. 执行时机: preload 在使用时才会执行；async 加载完毕后立即执行；defer 在 DOMContentLoaded 前执行完毕
3. 资源类型: preload 可以加载脚本、css、font 等等；async、defer 只能用于脚本
4. 资源优先级: preload 可以控制优先级；async、defer 不可以控制

# script

## async 和 defer 区别

1. 语义: async 为异步加载；defer 为延时加载
2. 执行时机: async 加载完毕后立即执行，且会阻塞 HTML 解析；defer 等待 DOM 解析完毕后执行，**规定在 DOMContentLoaded 前执行完毕**
3. 是否有序: async 无序；defer **规定是有序**
