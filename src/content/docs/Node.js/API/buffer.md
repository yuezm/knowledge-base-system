---
title: buffer
description: buffer
---

在引入 TypedArray 之前，javascript 没有操作内存的 API，node.js 实现了 Buffer，在 TypedArray 后，Buffer 以更优化的方式实现了 Uint8Array

Buffer 虽然是 TypedArray 的实例，但是还是和 TypedArray 存在些许差别

1. ArrayBuffer#slice() 会创建切片的拷贝，而 Buffer#slice() 是在现有的 Buffer 上创建而不拷贝
```typescript
const buf1 = Buffer.alloc(10).fill(1);
const buf2 = buf1.slice(); // buf2 此时改变后，buf1也会改变，因为公用内存
```

2. Buffer 对象的内存是被拷贝到 TypedArray，而不是共享
```typescript
const buf1 = Buffer.alloc(10).fill(1);
const uint8Array = new Uint8Array(buf1) //uint8Array 此时改变后，buf1不变
```

3. Buffer 对象的内存是被解释为不同元素的数组，而不是目标类型的字节数组。 也就是说， 
```typescript
const buf = Buffer.from([1, 2, 3, 4]);
const uint32Array = new Uint32Array(buf) // 会创建一个带有 4 个元素 [1, 2, 3, 4] 的 Uint32Array，而不是带有单个元素 [0x1020304] 或 [0x4030201] 的 Uint32Array
```

## buffer特点

1. 分配好了之后，无法更改大小
2. Buffer 内存不受 V8 内存大小限制、
```typescript
// coed.js
new Array(1024).fill(1); // 

node --max-old-space-size=1 code.js // 内存超出


Buffer.alloc(1024).fill(1);

node --max-old-space-size=1 code.js // 不报错
```

3. 由于存储的是 "无符号 8 位整型"，则 Buffer 存储的数值从 [0,255] 之间

## 创建 buffer

```typescript
Buffer.alloc(size: number, fill?: string | Buffer | number, encoding?: BufferEncoding): Buffer 
// 不会使用内部的Buffer池，而是开辟新的内存，且开启后将其以fill初始化

Buffer.allocUnsafe(size: number):Buffer; 
// allocUnsafe当size<Buffer.poolSize一半的时候，采用内部的Buffer池（Buffer模块会预分配一个内存大小为Buffer.poolSize的Buffer实例，以便快速分配内存）

Buffer.allocUnsafeSlow(size: number):Buffer; 
// buffer.poolSize默认为8kb，则当allocUnsafe为4kb内的时，可以从Buffer池切割出来，以垃圾回收机制因过多的创建独立的Buffer而过度使用，以改善性能
// 使用allocUnsafeSlow 可以分配一个非内存池的Buffer

Buffer.from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Buffer;
```

## 常用方法

```typescript
Buffer.compare(buf1: Uint8Array, buf2: Uint8Array): number; // buf之间比较，等价于 buf1.compare(buf2)

buf.compare(otherBuffer: Uint8Array,targetStart?: number,targetEnd?: number,sourceStart?: number,sourceEnd?: number): number;
// target 排序 buf 前，则返回 1
// target 排在 buf 后，则返回 -1
// 相等，则返回 0

buf.copy(targetBuffer: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number; // 拷贝，将buf拷贝到targetBuffer

buf.equals(otherBuffer: Uint8Array): boolean; // 比较是否相等，仅是比较字节是否相等而非内存地址

buf.fill(value: string | Uint8Array | number, offset?: number, end?: number, encoding?: BufferEncoding): this; // 填充

buf.includes(value: string | number | Buffer, byteOffset?: number, encoding?: BufferEncoding): boolean;

buf.indexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;
buf.lastIndexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;
```

## 常用属性

```typescript
buffer.constants.MAX_LENGTH、buffer.kMaxLength // Buffer最大长度，创建Buffer时，超过此长度则报错， ERR_INVALID_OPT_VALUE

buffer.constants.MAX_STRING_LENGTH、buffer.kStringMaxLength // 单个字符串允许的最大长度，取决于js引擎

Buffer.poolSize // Buffer初始化Buffer池的大小，该值可进行修改
```

## 编码

'ascii' - 仅适用于 7 位 ASCII 数据。此编码速度很快，如果设置则会剥离高位。

'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8。

'utf16le' - 2 或 4 个字节，小端序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。

'ucs2' - 'utf16le' 的别名。

'base64' - Base64 编码。当从字符串创建 Buffer 时，此编码也会正确地接受 RFC 4648 第 5 节中指定的 “URL 和文件名安全字母”。

'latin1' - 一种将 Buffer 编码成单字节编码字符串的方法（由 RFC 1345 中的 IANA 定义，第 63 页，作为 Latin-1 的补充块和 C0/C1 控制码）。

'binary' - 'latin1' 的别名。

'hex' - 将每个字节编码成两个十六进制的字符

## 内存分配方式

V8 会预先申请一段内存**（8KB）**，后续开辟的 Buffer 大小存在如下情况

1.  Buffer 大小 >** 4KB**：V8 向操作系统额外申请内存 
2.  Buffer 大小 < **4KB**：又会分为如下情况 
   - 剩余的内存能放置：不会额外申请内存，直接使用
   - 剩余内存不能放置：额外申请内存（8KB），放置于新的内存

思考题：为什么 Stream API 使用 Buffer

node.js 是一个高 I/O 的服务器，所以他可能涉及到很多 I/O 操作，例如文件 I/O、网络 I/O 等等。在文件操作或者网络传输时，可能遇到很多的文件类型，例如图片文件、音乐文件...，对于这些文件，使用二进制是最好的，因为无需关心他的编码方式，而 Buffer 完美符合
