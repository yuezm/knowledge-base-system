---
title: Model
description: Model
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

WebGL 常用模型为 glTF 和 gl

## API

### glTF

glTF（GL Transition Format）是一种针对 GL（OpenGL，webGL） 的数据传递，支持纹理，动画，材质。是 Web 导入模型的通用文件格式。glTF 一般指的是 glTF JSON，是一种 JSON 的数据格式，glB（glTF Binary） 是 glTF 的压缩后二进制格式

```ts
new Cesium.ModelGraphics({
  show?: Property | boolean
  uri?: Property | string | Resource,
});
```

也可以使用 Entity 来管理

```ts
new Cesium.Entity({
  model: {
    uri: url,
  },
});
```

### glB
