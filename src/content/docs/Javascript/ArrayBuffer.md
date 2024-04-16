---
title: ArrayBuffer
description: ArrayBuffer
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

ArrayBuffer[^ArrayBuffer]（数组缓冲区）用来表示原始二进制数据的缓冲区（缓冲区可以理解为临时开辟的内存区域）

ArrayBuffer 给 Javascript 提供了操作内存的能力，常用于 文件流，Web3D 等等

## 初始化

```js
new ArrayBuffer(length);
new ArrayBuffer(length, options);

const buf = new ArrayBuffer(10);
```

初始化时，值全部设置为 0

- length：开启的内存大小（字节）
- options（optional）：
  - maxByteLength（optional）：最大能调整的大小（字节），此时才可以使用 `buf.resize(newLength)` 来调整 Buffer 的长度，但是不能超过设置的最大值

> 推荐将 maxByteLength 设置为使用场景下最小的大小。它不应超过 1073741824（1GB），以减少内存溢出风险

ArrayBuffer 仅仅是可以存放二进制数据，但是它本身是不能操作（读写）的，需要通过 DataView[^DataView] 或者 TypedArray[^TypedArray] 来进行操作

## 操作

### DateView

DataView 提供了对 ArrayBuffer 进行读写的方法，且提供了对字节序的控制

#### 初始化

```js
new DataView(buffer);
new DataView(buffer, byteOffset);
new DataView(buffer, byteOffset, byteLength);
```

- buffer：传入的 ArrayBuffer
- byteOffset（optional）：ArrayBuffer 的起始位置
- byteLength（optional）：读取的长度

### set 和 get

DataView 提供了针对各个类型的，如 Int8,UInt8,Int16 等等的方法来读取或者写入 ArrayBuffer，拿 Int16 来举例

```js
dataview.getInt16(byteOffset [, littleEndian])
dataview.setInt16(byteOffset, value [, littleEndian])
```

- byteOffset：起始位置
- value：要写入的值
- littleEndian：true 为小端序；默认为 false 为大端序

```js
const buf = new ArrayBuffer(2); // 此时 buf 存储的值为 [0x00, 0x00]
const view = new DataView(buf);

view.setInt16(0, 16); // 此时 buf 存储的值为 [0x00, 0x10]
view.getInt16(0); // 16
```

### TypedArray

TypedArray 是描述 ArrayBuffer 的类数组视图。TypedArray 没有构造函数，可以理解为 TypedArray 是 Int8Array，Uint8Array，Int16Array，Uint16Array 等等的抽象父类

TypedArray 字节序是**按照平台顺序排列**，且有如下分类

- 无符号整数数组：Uint8Array，Uint16Array，Uint32Array，BigUint64Array
- 有符号整数数组：Int8Array，Int16Array，Int32Array，BigInt64Array
- 浮点数组：Float32Array，Float64Array
- Uint8ClampedArray：它像 Uint8Array 一样以二进制形式存储数字，但是当你存储超出范围的数字时，它会将数字钳制（clamp）到 0 到 255 的范围内，而不是截断最高有效位

#### 初始化

```js
new TypedArray();
new TypedArray(length);
new TypedArray(typedArray);
new TypedArray(object);

new TypedArray(buffer);
new TypedArray(buffer, byteOffset);
new TypedArray(buffer, byteOffset, length);

TypedArray.from();

TypedArray.of();
```

#### length 和 byteLength

```js
const buf = new ArrayBuffer(2);
const int16Buffer = new Int16Array(buf);

int16Buffer.length; // 数组长度，值为1
int16Buffer.byteLength; // 字节数，值为2
```

多个 TypedArray 共享同一个 ArrayBuffer，当其中一个 TypedArray 修改了 ArrayBuffer 的值时，其他 TypedArray 也会受到影响

```js
const buf = new ArrayBuffer(2);

const int8Buffer = new Int8Array(buf);
const int16Buffer = new Int16Array(buf);

int8Buffer[0] = 0; // 相应的 int16Buffer[0]值也会改变
```

## 示例

1. 将大端序的数转换为小端序
2. 将 Int8[] 数据两两组合转换为 Int16[]

## 其他

[^ArrayBuffer]: [MDN ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
[^DataView]: [MDN DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)
[^TypedArray]: [MDN TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
