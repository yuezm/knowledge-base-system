---
title: Bigint
description: Bigint
status: active
---

在 Javascript 中，最大的整数 `Number.MIN_SAFE_INTEGER` 值为 9007199254740991，如果一个数大于 `Number.MIN_SAFE_INTEGER` 时，是无法正确表示和正确计算的。为了解决这个问题，可以引用其他的库，例如 [bignumber.js](https://www.npmjs.com/package/bignumber.js)

Javascript 也提供个新的数据类型 `BigInt`，用于表示**大的整数**

## 初始化

```js
const a = 1234n;
const b = BigInt(1234);
const c = BigInt("1234");

// 其他进制
const d = BigInt("0x1234");
const e = BigInt("0o1234");
const f = BigInt("0b1010");
```

## 类型判断

```ts
// Typescript
const a: bigint = 1234n;
```

```js
typeof 1234n === "bigint";

Number.isBigInt(1234n) === true;

Object.prototype.toString.call(1234n) === "[object BigInt]";
```

## 计算

Bigint **无法和普通数字混合计算**，**不能使用 Math** 对象的方法

### 算数

支持数字的算数运算，` +, -, *, /, %, **, +=, -=`，但是在除法上，会失去精度

```js
4n / 3n === 1n; // 直接取整
```

### 位运算

支持大部分的位运算，`>>, <<, &, |, ^, ~`，但不支持无符号右移 `>>>`

### 其他

支持递增，递减 `++, --`，支持单符号减法 `-`，但不支持单符号加法 `+`

```js
const a = 1234n;
-a; // 不报错
+a; // 报错
```

[dont-break-asmjs](https://github.com/tc39/proposal-bigint/blob/master/ADVANCED.md#dont-break-asmjs)

## 转换

### 转换字符串

```js
1234n.toString();
```

### 转换为 Number

此举会丢失精度

```js
Number(1234n);
```

### JSON.stringify

需要手动指出如何序列化 BigInt

```js
BigInt.prototype.toJSON = function () {
  return { $$bigint: this.toString() };
};

JSON.stringify({ n: 1234n }); // {"n":{"$$bigint":"1234"}}

JSON.parse('{"n":{"$$bigint":"1234"}}', function reviver(key, value) {
  if (value && typeof value === "object" && "$$bigint" in value) {
    return BigInt(value.$$bigint);
  }
  return value;
});
```

## 比较

```js
1234n == 1234; // true
1234n !== 1234; // false
Object.is(1234n, 1234); // false
Object.is(0n, -0n); // true，零值处理和Number不同

1234n > 123; // true
1234n < 12345; // true
```

对于条件判断时，BigInt 和 Number 是一致的，例如 0 和 0n 都表示 false,1 和 1n 都表示 true
