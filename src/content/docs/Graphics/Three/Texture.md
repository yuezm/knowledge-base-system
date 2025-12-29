---
title: 纹理
description: 纹理
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### TextureLoader

```js
const uv = new THREE.TextureLoader().load($URL);

const mat1 = new THREE.MeshBasicMaterial({
  map: uv,
});
```
