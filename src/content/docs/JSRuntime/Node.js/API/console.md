---
title: console
description: console
status: active
---

提供一个简单的调试控制台，可以打印一些信息

常用的有

`console.log === console.info === console.debug === console.dirxml`
`console.warn === console.error`
`console.time、console.timeLog、console.timeEnd`
`console.table`

console 是 Console 的实例，Console 传入参数为 `process.stdout、process.stderr`，且将 console 赋值于`global.console`，所以可以直接调用
```typescript
global.console = new Console(process.stdout, process.stderror);

// 或者
global.console = new Console({stdout: process.stdout, stderr: process.stderror});
```

Console其实抛开数据序列化不谈的话，只是一个流的中转，如下代码实现一个非常简单的`console.log`

```typescript
import { Writable } from "stream";

class Console {
  // stdout 和 stderr 都是可写流
  private readonly _stdout: Writable;
  private readonly _stderr: Writable;

  constructor(options: { stdout: Writable, stderr: Writable }) {
    this._stderr = options.stderr;
    this._stdout = options.stdout;
  }

  log(...args: string[]): void {
    for (const arg of args) {
      this._stdout.write(arg);
    }
  }
}

const c = new Console({ stderr: process.stderr, stdout: process.stdout });

c.log('Hello ', 'word', ' !!!');
```
