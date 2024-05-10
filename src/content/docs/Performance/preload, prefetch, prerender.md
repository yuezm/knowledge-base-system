---
title: preload, prefetch, prerender
description: preload, prefetch, prerender
---

HTML5 引入了 _preload_ 和 _prefetch_ 方式，通过预先获取资源来快速加载

```html
<link href="" rel="preload" as="" /> <!-- 当元素rel为preload时，as为必填属性 -->
<link href="" rel="prefetch />
```

preload：预加载。表示当前资源本页面会使用到，浏览器立即请求该内容，但是无需执行，等到需要的时候再去执行。用于获取必要但是无需即可执行的资源，如 Font

prefetch：预获取。表示当前资源本页面不会使用到，会在下一次导航/页面加载时使用的资源，浏览器在空闲时可以先请求资源，优先级低于 preload

Chrome 提供一种新的加速方式：预渲染（prerender）。不仅会预先获取资源，还会在后台预先渲染，不过兼容性一般

```html
<link rel="prerender" href="/next-page/" />
```

不仅如此，Chrome 推出了新的预渲染 Speculation Rules API，通过该 API 来告诉 Chrome 可以预渲染哪些页面

当你输入 URL 时，Chrome 会对你输入的 URL 进行预测，可以通过 _chrome://predictors/_ 来查看预测情况，简单描述如下

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/c14d0754eb003d1ea9cceea599f2e1c27e05aa4866e447bbad0f872c21c7dc34.png)

1. 绿色：大概率访问该页面，Chrome 还未等你访问，已经开始渲染页面了
2. 黄色：可能访问该页面，但不确定，Chrome 预取该页面的资源，但不渲染
3. 灰色：啥都不干

在 Web 中，可以通过 scripts 来进行设置，兼容新拉跨

```html
<script type="speculationrules">
  {
    "prefetch": [
      {
        "source": "list",
        "urls": ["next.html", "next17.html"]
      }
    ],
    "prerender": [
      {
        "source": "list",
        "urls": ["next.html", "next17.html"]
      }
    ]
  }
</script>
```

prefetch：表示可能访问该页面，Chrome 可以获取该资源，但不渲染
prerender：表示会访问该页面，Chrome 可以获取该资源，并预先渲染

目前浏览器只能支持同站站点的预渲染，例如 `https://1.conardli.com` 可以预 `https://17.conardli.com` 上的页面。注意如果是非同源的情况，需要预渲染的页面必须包括一个 `Supports-Loading-Mode: credentialed-prerender Header`。

[https://developer.chrome.com/docs/web-platform/prerender-pages](https://developer.chrome.com/docs/web-platform/prerender-pages)
