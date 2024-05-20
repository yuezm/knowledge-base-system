---
title: AssetsManager
description: AssetsManager
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

静态资源管理

### AssetsManager

```ts
const assetsManager = new BABYLON.AssetsManager(scene?: Scene);

const binaryTask = assetsManager.addBinaryFileTask(taskName: string, url: string);

// 成功回调
binaryTask.onSuccess = function (task) {
};
```
