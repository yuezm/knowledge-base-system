---
title: Unicode
description: Unicode
---

# Unicode

Unicode 是一种字符集，它为世界上所有字符提供唯一的编码。例如 \u6211，表示在 Unicode 字符集中，6211 表示的就是中文“我”

## 编码

Unicode 只是规定了字符集，但是并未规定如何存储，这些表示如何存储就称为编码，编码分为 3 种：UTF-8、UTF-16、UTF-32。

## UTF-8、UTF-16、UTF-32

- UTF-8：是一种变长的编码方式，它使用 1-4 个字节来表示一个字符，值和字节序无关。是 Web 中常见的编码
- UTF-16：是一种变长的编码方式，它使用 2-4 个字节来表示一个字符，值和字节序有关
- UTF-32：是一种定长的编码方式，它使用 4 个字节来表示一个字符，值和字节序有关

[BOM（字节序）](/cs/encoding/bom/)

### 为什么 UTF-8 没有字节序的问题

因为 UTF-8 是定了顺序的。举个例子，110xxxxx 10xxxxxx 和 10xxxxxx 110xxxxx 是没有区别的，按照 UTF-8 的规则，110xxxxx 一定是头，10xxxxxx 一定是尾，所以字节序无关。

```txt
1字节：0xxxxxxx
2字节：110xxxxx 10xxxxxx
3字节：1110xxxx 10xxxxxx 10xxxxxx
4字节：11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

### 为什么 ES6 需要添加 Unicode 支持

1. 支持全球化和国际化
2. 支持特殊表情和特殊字符
3. 修正某些 API 当字符超过 \uFFFF 范围时，会出现错误

```js
"𠮷".charCodeAt(0).toString(16); // d842，这个是错误的值
"𠮷".codePointAt(0).toString(16); // 20bb7
```

## 参考

[关于 unicode：为什么 UTF-8 字符串没有字节顺序问题？](https://www.codenong.com/40563829/)  
[刨根究底字符编码之十一——UTF-8 编码方式与字节序标记 BOM](https://zhuanlan.zhihu.com/p/27222802)
