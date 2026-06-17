---
title: tsconfig
description: tsconfig
---

## 配置项

### compilerOptions

```ts
{
  "compilerOptions": {
    // 启用复合项目，用于支持项目引用，例如 monorepo 项目下多个包的引用
    "composite":true,

    // 构建时，自动生成相应的 .d.ts 文件，提供给其他语言使用
    "declaration":true,
  }
}
```

### include

### exclude

### extends

### files

### references

```ts
{
  "references": [
    // 引用其他 tsconfig.json 文件
    { "path": "./tsconfig.json" }
  ]
}
```
