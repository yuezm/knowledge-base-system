---
title: Javscript 属性和方法
description: Javscript 属性和方法
---

#### 

你可以使用 "." 或 "[]" 来访问属性、方法。我们一般会对对象的成员加以区分：成员值为函数的称为方法，值为非函数称为属性，这是按照其他面向对象的语言来称呼的。

但是在 Javascript 中，一个函数其实不会属于某个对象（其实仅仅是一个引用），即该函数不会是某个对象的方法，所以对_方法_这个称呼不是十分严谨，它仅仅是在进行对象_属性访问_的时候，_返回值是函数_罢了《你不知道的 Javascript》。

**有几个注意点**

1. "." 和 "[]" 区别： 
   - "." 一般称为属性访问，且属性名必须满足命名规范；"[]" 一般称为键访问，键名可接受任意的 utf-8/unicode 字符串
   - "." 属性名只能为常量；"[]" 可以为变量
   - "[]" 在 ES6 中可用于计算属性
   - "." 和 "[]" 在 AST 是不一样的，`. => PropertyAccessExpression; [] => ElementAccessExpression`

 
## [[GET]]、[[PUT]]

对象的_获取属性_、_设置属性_操作。这里注意一点，和 Getter、Setter 不一样的是 [[GET]]、[[PUT]] 是针对对象的操作，Getter、Setter 是针对对象的某个属性的。这里提一嘴，[[GET]]和[[PUT]]是 ES5.1 的文档，ES6 文档内是[[GET]]和[[SET]]

由下面代码假装模拟一个[[GET]] 和 [[PUT]]，需要注意的是，[[GET]] 和 [[PUT]]并非只关注本对象，还要_按照原型链往上查找_

```typescript
const obj = {};

const proxy = new Proxy(obj, {
  get() {}, // 假装当成[[GET]]
  set() {}, // 假装当成[[PUT]]
});
```

tips：这里只列举了[[GET]]和[[PUT]]，如果你想知道全部的方法，例如[[Delete]]，请点这里 --> [Algorithms for Object Internal Methods](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-8.12)

## 属性描述符

需要注意的是，属性描述符 `configurable、enumerable、writable` _默认都是 false_

1. 公共属性描述符： `configurable、enumerable`

```typescript
{
  configurable: false, // 该属性无法被改变，无法删除，无法重新设置属性描述，且对无法进行的操作静默失败。ps 严格模式下就会报错哦
  enumerable: false, // 该属性无法被遍历。ps 有些方法还是可以获取到的，例如 Reflect.ownKeys()，Object.getOwnPropertyNames/getOwnPropertySymbols()
}
```

2.  互斥属性描述符，以下两组属性描述符互斥 
   - `get、set`：对获取、设置属性拦截

 
```typescript
{
  get(){},
  set(){},
}
```

- `writable、value`

```typescript
  {
    writable: false, // 该属性无法被修改，如果进行修改则静默错误。ps 严格模式下就会报错哦
    value: xx,
  }
```

## 存在性检测

以下方法对对象的属性、方法进行存在检测：

|  | 是否检测原型 | 是否包含 enumerable=false | 是否包含 symbol |
| --- | --- | --- | --- |
| `in` | 是 | 是 | 是 |
| `Reflect.has` | 是 | 是 | 是 |
| `hasOwnProperty` | 否 | 是 | 是 |


## 迭代

以下方法对对象的迭代

|  | 是否遍历原型 | 是否遍历 enumerable=false | 是否遍历 symbol |
| --- | --- | --- | --- |
| `for...in` | 是 | 否 | 否 |
| `Object.keys()` | 否 | 否 | 否 |
| `getOwnPropertyNames` | 否 | 是 | 否 |
| `getOwnPropertySymbols` | 否 | 是 | 是 |
| `Reflect.ownKeys()` | 否 | 是 | 是 |

