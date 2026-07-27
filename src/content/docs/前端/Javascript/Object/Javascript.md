---
title: Javascript
description: Javascript
status: active
---

# 数据结构


## typeof

javascript 在最初的时候，用32位为一个数据单元，且使用1-3位来表示一个数据的类型，例如

```typescript
000 ==> object
1   ==> 31位有符号整数
010 ===> double
100 ==> string
110 ==> boolean

-2^30 ==> undefined
全部0 ==> null
```

所以在进行前三位判断时，null前三位也是0，所以 `typeof null === 'object'`

ES2020后

```typescript
typeof 1         === 'number';
typeof '1'       === 'string';
typeof fasle     === 'boolean';
typeof undefined === 'undefined';
typeof null      === 'object';
typeof Symbol()  === 'symbol'
typeof Bigint    === 'bigint'

typeof {}        === 'object';
type Function    === 'function';
```
## 
## Event

### dispatchEvent
自动触发事件
```typescript
const event = document.createEvent('MouseEvent');
event.initEvent('click');
element.dispatchEvent(event);
```


## javascript 分号补起
分号自动插入规则

1. 分号仅仅在 '}' 前、一行结束、程序结束时插入；
2. **程序仅在无法解析时才会自动插入分号**，此条规则可能出现解析歧义;
```typescript
let a;
function b() {
  console.log(&#39;b&#39;);
}
function f() {
  console.log(&#39;f&#39;);
}

a = b
(f()); // 此时是不会添加分号的，因为可以正常执行，但有无分号有歧义
```

3. for 语句中'()'分号无法省略


## 运算

### 位运算

Javacript 进行位运算时，会把数字转换为**32位有符号整数**，最大的正数为`2^31-1`，最小的负数为`-2^31`，任何超过的数，超过该值的时候，会被截断，且可能**出现符号问题**

```typescript
&
|
^
~
>>
>>>
 <<
```

### 数学运算

```
+
-
*
/
%
```

## 表达式

### 判断表达式

**===**：严格判断相等

**==**：非严格判断相等
A == B

   1. 如果A、B类型相等，则直接进行比较；否则
   2. 如果A、B其中包含 null、undefined，则 null == undefined，与其他全部不相等；否则
   3. 如果A、B其中为对象，则先转换为基本数据类型；否则
   4. 如果A、B包含数字，则先转换为数字比较
   5. 如果A、B包含布尔值，则先转换为数字比较

_**Object.is**：_和 === 不太相同，主要区别在于 判断 +0、-0、NaN上
```
Object.is(NaN, NaN); // true
Object.is(+0, -0); // false
```
