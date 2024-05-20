---
title: Particle
description: Particle
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### ParticleSystem

```ts
const particleSystem = new BABYLON.ParticleSystem(
  name: string,
  capacity: number,
  sceneOrEngine: Scene | ThinEngine,
  customEffect?: Nullable<Effect>,
  isAnimationSheetEnabled?: boolean,
  epsilon?: number
);

particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
```

## 参考

- [DeepDive particle](https://doc.babylonjs.com/features/featuresDeepDive/particles)
