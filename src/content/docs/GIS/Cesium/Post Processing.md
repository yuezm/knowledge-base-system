---
title: Post Processing
description: Post Processing
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

对场景后期的处理，实际上是传入 Fragment Shader，对片元进行处理

## API

### PostProcessStageCollection

负责管理 PostProcessStage 和 PostProcessStageComposite，初始化时挂在于`scene.postProcessStages;`

### PostProcessStage

```ts
scene.postProcessStages.add(
  new Cesium.PostProcessStage({
    // 指定片元着色器
    fragmentShader: fs,

    // 对片元着色器传值
    uniforms: {},
  })
);
```

### PostProcessStageComposite

按照既定顺序进行场景处理

```ts
scene.postProcessStages.add(new Cesium.PostProcessStageComposite({
    inputPreviousStageTexture : false,
    stages : [
         new Cesium.PostProcessStage({
            fragmentShader : fs,
        }),

        new Cesium.PostProcessStage({
            fragmentShader : fs,
        }),

        // 也支持传入其他的 PostProcessStageComposite
    ]
});
```

### PostProcessStageLibrary

预设了场景处理的方案，例如 `Cesium.PostProcessStageLibrary.createBlackAndWhiteStage()`

## 参考

- [PostProcessStage](https://cesium.com/learn/cesiumjs/ref-doc/PostProcessStage.html)
- [PostProcessStageComposite](https://cesium.com/learn/cesiumjs/ref-doc/PostProcessStageComposite.html)
- [PostProcessStageLibrary](https://cesium.com/learn/cesiumjs/ref-doc/PostProcessStageLibrary.html?)
