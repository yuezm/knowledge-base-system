---
title: File System API
description: File System API
---

## File System Access API

#### FileSystemFileHandle

继承自 FileSystemHandle，通过 `window.showOpenFilePicker()` 选择文件后获得该句柄

```js
const [fileHandle] = await window.showOpenFilePicker();
const file = await fileHandle.getFile();
```

#### FileSystemDirectoryHandle

继承自 FileSystemHandle，通过 `window.showDirectoryPicker()` 选择文件夹后获得该句柄

```js
const directoryHandle = await window.showDirectoryPicker();
const entries = await directoryHandle.entries();

for await (const [name, handle] of entries) {
  console.log(name, handle.kind);
  // 根据 handle.kind 判断是文件还是文件夹，再调用 directoryHandle.getFileHandle() 或者 directoryHandle.getDirectoryHandle() 获取子文件或文件夹句柄
}
```

## OPFS

OPFS(origin private file system) 提供了页面源专属的存储端点，需要注意的是在文件系统系统中不可见（例如在 Windows 的文件夹中不可见）

1. OPFS 提供源存储机制（其他源无法访问），受到浏览器存储配额限制，通过 `navigator.storage.estimate()` 来获取配额
2. OPFS 文件不需要权限特提示和安全提示
3. OPFS 文件系统是持久化的，关闭页面后文件不会丢失，但对用户不可见
4. OPFS 文件系统是提供异步 API 和同步 API（Worker 可使用），可以创建、删除、重命名文件和文件夹

### 创建文件（夹）

```js
const opfsRoot = await navigator.storage.getDirectory();

// create: true，当文件不存在时，则会自动创建
const fileHandle = await opfsRoot.getFileHandle("first file", { create: true });

const directoryHandle = await opfsRoot.getDirectoryHandle("my first folder", {
  create: true,
});
```

### 写入文件

```js
const writable = await fileHandle.createWritable();

writable.write("hello world");

// 向流中指定位置写入数据
writableStream.write({ type: "write", position, data });

// 将文件当前的指针更新到指定的偏移位置
writableStream.write({ type: "seek", position });

// 调整文件至指定字节长度
writableStream.write({ type: "truncate", size });

await writable.close();
```

### 删除文件（夹）

```js
opfsRoot.removeEntry("first file");
```

### 读取文件

根基 FileSystemFileHandle 和 FileSystemDirectoryHandle 提供的 API，可以读取文件和文件夹中的内容，例如

```js
const file = await fileHandle.getFile();
const text = await file.text();
```

## 参考

- [File System API ](https://developer.mozilla.org/zh-CN/docs/Web/API/File_System_API)
