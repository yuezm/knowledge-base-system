---
title: Number
description: Number
---

# Double

ECMAScript 数字全部为 **64 位双精度浮点数（Double）**，且算术运算都按照双精度运算标准。但位运算不是，位运算按**32 位有符号整型计算**，如果当前数字不符合，则会转换为**大端存储的，32 位整型**，即 ECMAScript 中位运算最大值为 `2^31-1`，最小值为`-2^31`

```typescript
2: 10进制
0x2: 16进制
0o2: 8进制
0b10: 2进制

// 进制转换
Object.prototype.toString(radix: number);
Number.parseInt(value: string, radix: number); 
```


```typescript
符号位(1)   指数位(11)     指数位表示值   	位数位(52)    表示值
*           0            -1024         	 0            0       // 全部为0时表示为0
0           [1, 2^11-1)  [-1023,1023]    *            正数
1           [1, 2^11-1)  [-1023,1023]    *            负数
0           2^11-1       1024         	 0            正无穷
1           2^11-1       1024         	 0            负无穷
*           2^11-1       1024         	 非0           NaN

------------------------ 非规约数 ------------------------
*           0            -1024        非0          非规约数
```


则对于双精度来说
**最大的数值**：指数位等于1023，尾数位为全为1，原则是为 `2^1024-1`，但1024时已经为无穷大了，所以这个计算无法算出有效值
**最大安全整数**：`2^53-1` 尾数位最大长度为52，则当指数为52时，尾数每增加1，都可精确提现，当指数为52，且尾数全部为1时 ==> `2^53-1#`



## Bigint


ES2020 增加了对`2^53-1`数的支持，对于javascript数字精度来说，最大且可完整表示的数为`2^53-1`，超过之后会损失精度，所以在ES2020添加了对大数的支持


1. 不能使用 Math对象的方法
2. 不能和number混合运算，两者必须转为同种类型，**但BigInt转number会丢失精度**
```typescript
const n = BigInt(12); // BigInt需要输入数字、数字字符串、布尔
const m = 12n;


typeof n == 'bigint'
```

### 计算

以下操作符可以和 BigInt 一起使用： +、*、-、**、% 。除 >>> （无符号右移）之外的 位操作 也可以支持，为了支持 asm.js，BigInt不支持 + 的单目运算（但可以支持 -）

```typescript
1n + 2n
1n * 2n
1n - 2n
1n / 2n
1n % 2n

1n & 2n
```

### 比较

BigInt 和 number 严格不相等，但非严格可以相等（但请不要如此比较，不同类型还是不要比较）
```typescript
1n == 1   // true
1n === 1  // false
```

### 条件运算

BigInt 在条件判断，和number表现一致，例如 Boolean，if...

### 转换

```typescript
Number(1n)     // BigInt ==> number
1n.toString()  // BigInt ==> string
Boolean(1n)    // BigInt ==> boolean

1n.valueOf()   // 本身

// !!!! 切记
JSON.stringify(1n); // TypeError，但可以手动实现

BigInt.prototype.toJSON = function(){
  
}
```
