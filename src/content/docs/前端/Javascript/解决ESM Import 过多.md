---
title: 解决ESM Import 过多
description: 解决ESM Import 过多
status: active
---

当一个模块 import 过多模块时，导致 import 语句臃肿，可采取如下优化

## re-import

将 export 的模块统一到一起。例如存在 a,b 两个模块

```ts
// main.js
import A from "a";
import B from "b";
```

可以如此优化

```ts
// common.js
import A from "a";
import B from "b";

export { A, B };
```

```ts
// main.js
import { A, B } from "common";
```

从统一入口导出后，可能会导致如下问题，需要在 package.json 配置 sideEffects

1. 可能导致循环引用
2. 可能导致无法正常 tree shaking

## webpack require.context

在 webpack 中，可以使用 _require.context_ 批量加载模块，用于加载同类型的资源还是很不错的

```ts
const loadModules = require.context("./components", false, /\.js$/);
```

## webpack ProvidePlugin

通过配置 webpack ProvidePlugin，使得模块可以直接全局使用（外部引入，不用 import）。如果是在 Typescript 中使用，需要配置全局类型

```js
new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
});
```

## import typescript 类型

如果某个类型使用过多，可以配置为全局类型，避免重复 import
