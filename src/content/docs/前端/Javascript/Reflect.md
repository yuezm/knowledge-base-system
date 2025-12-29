---
title: Reflect
description: Reflect
---

Reflect 提供给 Javascript 元编程的能力，即使用 ECMAScript 中定义的一系列基本 API 来操作对象。例如

```js
const obj = {};

obj.a = 1; // 底层调用的也是[[SET]
console.log(obj.a); // 底层调用的也是[[GET]
```

## API

各个 API 对应的对象基本方法

| Reflect 方法             | ECMAScript API        |
| ------------------------ | --------------------- |
| getPrototypeOf           | [[GetPrototypeOf]]    |
| setPrototypeOf           | [[SetPrototypeOf]]    |
| isExtensible             | [[IsExtensible]]      |
| preventExtensions        | [[PreventExtensions]] |
| getOwnPropertyDescriptor | [[GetOwnProperty]]    |
| defineProperty           | [[DefineOwnProperty]] |
| has                      | [[HasProperty]]       |
| get                      | [[Get]]               |
| set                      | [[Set]]               |
| deleteProperty           | [[Delete]]            |
| ownKeys                  | [[OwnPropertyKeys]]   |
| apply                    | [[Call]]              |
| construct                | [[Construct]]         |

好处

1. 提供给 Javascript 元编程的能力

坏处

1. 使用 Reflect 提供的方法和调用对象的方法得到的结果不一致，可能会导致一些问题。因为对象的方法是在 ECMAScript API 上层定义的，包含了一些额外的逻辑，而 Reflect 提供的方法则是直接调用 ECMAScript API，没有这些额外的逻辑。

```js
const obj = {
  age: 12,
  [Symbol.for("name")]: "name",
};

console.log(Object.keys(obj)); // 只输出字符串keys
console.log(Reflect.ownKeys(obj)); // 输出字符串keys和symbol keys
```

## 参考

- [MDN Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
