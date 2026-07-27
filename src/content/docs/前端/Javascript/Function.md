---
title: Function
description: Function
status: active
---

## call、apply、bind

call、apply、bind 都可以对函数进行 this 改变

### 模拟 call 和 apply

1. 如果 thisArg 为 null、undefined 时，则在 _非严格模式_ 下为 global；_严格模式下为_ undefined
2. call 和 apply 优先级较 new 低

```javascript
function callThis(handler, thisArg, ...args) {
  if (typeof handler !== "function") {
    // 报错了
    throw new TypeError("call must be called on a function");
  }

  if (thisArg === null || thisArg === undefined) {
    thisArg = window;
  } else {
    switch (typeof thisArg) {
      case "symbol":
        thisArg = Symbol.prototype;
        break;
      case "number":
        thisArg = new Number(thisArg);
        break;
      case "bigint":
        thisArg = new BigInt(thisArg);
        break;
      case "boolean":
        thisArg = new Boolean(thisArg);
        break;
      case "string":
        thisArg = new String(thisArg);
    }
  }

  thisArg.handler = handler;
  const ans = thisArg.handler(...args);
  delete thisArg.handler;
  return ans;
}
```

### bind

1. 如果 thisArg 为 null、undefined 时，则在 _非严格模式_ 下为 global；_严格模式下为_ undefined
2. bind 返回为函数，且函数 name 为 `bound ${name}`
3. bind 函数如果被 new 调用，则以 new 为优先

```javascript
function callThis(handler, thisArg, ...args) {
  if (typeof handler !== "function") {
    // 报错了
    throw new TypeError("Bind must be called on a function");
  }

  function run(...args1) {
    // 判断是否为new调用
    if (new.target === run) {
      // 开始new调用了
      const obj = Object.create(null);
      const res = handler.call(obj, ...args, ...args1);

      if (
        (res !== null && typeof res === "object") ||
        typeof res === "function"
      ) {
        return res;
      }
      return obj;
    } else {
      // 普通调用了
      return handler.call(thisArg, ...args, ...args1);
    }
  }

  run.name = `bound ${handler.name}`;

  return run;
}
```
