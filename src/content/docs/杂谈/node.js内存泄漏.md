---
title: node.js内存泄漏
description: node.js内存泄漏
---

## 删除文件缓存致使内存泄漏

依据 CommonJS 规范，node.js 会对已加载的模块进行缓存，例如查看 `require.cache` 可以查看当前缓存，在文件缓存后，如果再次 require，则直接读取缓存

```typescript
{
  [absolute_path]: Module // 缓存形式大致如下，以文件的绝对路径为key，文件Module为value
}
```

所以，有些骚操作就是**将缓存删除，以重新加载文件**（模拟热更新），但是删除文件存在个问题，如下演示

```typescript
// main.js

require("./test");

delete require.cache[require.resolve("./test")]; // 将子文件从缓存删除

console.log(require.cache);

require("./test"); // 重新加载文件，以避开缓存
```

查看 console，确实已经删除了 test 的缓存，但是 main 的 Module 的 children 属性还保留了 test 的 Module，并没有被删除

```typescript
{
	[main absolute path]: {
    children: [
      test_module // 它并没有删除
    ]
  }
}
```

而 require 再次加载时，就会导致** children 存在两条记录**，所以删除依赖模块时，应该删除父模块的记录，如下所示

```typescript
const ab_path = require.resolve("./test");
const mod = require.cache[ab_path];

mod.parent.children.splice(mod.parent.children.indexOf(mod), 1);
delete require.cache[ab_path];
```
