---
title: RegExp
description: RegExp
---

## API

### exec
`RegExp.prototype.exec(s: string): null | RegExpExecArray `
```typescript
// RegExp.prototype.exec(s: string): null | RegExpExecArray // 返回匹配的数组，数组存储查找到的第一个值，并存储 input 和 index
// 如果匹配失败，则将reg.lastIndex重置为0
// 如果增加 【全局标识】，则 exec 在匹配成功后，会修改 lastIndex 值，但exec始终只会寻找第一个匹配的字符串 
/a+/g.exec('aba'); // ['a',index: 0,input:'aba'];

const reg = /a+/g;
reg.exec('ab'); // RegExpExecArray
reg.exec('ab'); // null，此时lastIndex重置
```
### test
`RegExp.prototype.test(s: string): boolean; `
```typescript
// 如果匹配失败，则将reg.lastIndex重置为0
// 如果增加 【全局标识】，则 exec 在匹配成功后，会修改 lastIndex 值
/a+/.test('aba'); 

const reg1 = /a+/g;
reg1.test('ab'); // true
reg1.test('ab'); // false
```
### 属性

```typescript
// 属性
RegExp.prototype.unicode 只读、u标识符
RegExp.prototype.sticky 只读、y标识符，为true时，只从lastIndex开始搜索，y优先级较g高
RegExp.prototype.source 只读、正则的模板字符串，不包含//以及后缀标识
RegExp.prototype.multiline 只读、m标识，为true时，多行字符串将被看做多行
RegExp.prototype.lastIndex 读写、下一次匹配的起始下标
RegExp.prototype.ignoreCase 只读、i标识
RegExp.prototype.global 只读、g标识
RegExp.prototype.flags 只读、返回所有标识组成的字符串
RegExp.prototype.dotAll 只读、提案、s修饰符，当s为true时，"." 可以配置换行符、回车符，原来是不行的
```

### 内部方法

```typescript
// 还有些内部方法
RegExp.prototype[@@split](s: string)
RegExp.prototype[@@search](s: string)
RegExp.prototype[@@replace](s: string)
RegExp.prototype[@@match](s: string)  // 比如，该方法为 String.prototype.match内部调用方法
RegExp.prototype[@@matchAll](s: string)
```
### 


