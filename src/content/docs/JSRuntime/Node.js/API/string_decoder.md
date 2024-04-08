---
title: string_decoder
description: string_decoder
---

保留多字节的 UTF-8、UTF16的 Buffer 转换为字符串

Buffer 本身就具有转换为字符串的方法，`buf.toString();`那么 string_decoder有什么好处？

string_decoder 可以将**末尾不完整的字符存储于缓冲内**，以便于下次调用；但Buffer不具备该功能，如下所示

```typescript
const buf = Buffer.from([ 0xf0, 0xa0, 0xae, 0xb6, 0xf0, 0xa0 ]); // 0xf0, 0xa0, 0xae, 0xb6 为特 "𠮶"

buf.toString(); // "𠮶"加一个乱码
sd.write(buf); // "𠮶"

// 还可以继续输入
sd.write(Buffer.from([0xae, 0xb6]); // "𠮶"
```

### `StringDecoder`
```typescript
const sd = new StringDecorder();
```
#### `write(buffer: Buffer): string;`
```typescript
sd.write([]);
```
#### `end(buffer?: Buffer): string;`
```typescript
sd.end([]);
```
end 返回剩余的字符，并调用一次 write
