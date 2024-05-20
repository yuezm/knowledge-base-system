---
title: Sprite
description: Sprite
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### Sprite

使用精灵图

```ts
const sprite = new BABYLON.Sprite(
  name: string,
  manager: ISpriteManager
);

// 属性设置
sprite.width = 1;
sprite.height = 1;
sprite.position = new BABYLON.Vector3(1, 1, 1);
```

### SpriteManager

加载精灵图

```ts
const spriteManager = new BABYLON.SpriteManager(
  name: string,
  imgUrl: string,
  capacity: number,
  cellSize: any,
  scene: Scene,
  epsilon?: number,
  samplingMode?: number,
  fromPacked?: boolean,
  spriteJSON?: any | null
);
```

## 参考

[DeepDive sprite](https://doc.babylonjs.com/features/featuresDeepDive/sprites/sprite_manager)
