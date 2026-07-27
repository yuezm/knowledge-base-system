---
title: Loader
description: Loader
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: active
---

加载器

## API

### GLTFLoader

加载 GLTF 模型

```ts
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

loader.load(url, (gltf) => {
  scene.add(gltf.scene);
});
```

### DRACOLoader

DRACO 是 Google 开源的 3D 模型压缩算法，用于压缩模型，以减小网络传输。可以使用 DRACOLoader 解压

```ts
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();

// 执行解析器目录
dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");

// 关联gltfloder和dracolodaer
loader.setDracoLoader(dracoLoader);
```

### RGBELoader

加载 HDMR 纹理

```ts
new RGBELoader().load(URL, (envMap) => {
  // 拿贴图做点啥
});
```

### TextureLoader

纹理加载器

```ts
const uv = new THREE.TextureLoader().load(URL);

const mat1 = new THREE.MeshBasicMaterial({
  map: uv,
});
```

### FontLoader

文字加载器，加载一些，内部存储了文字顶点文件

```ts
import { FontLoader } from "three/addons/loaders/FontLoader.js";

const loader = new FontLoader();

const font = loader.load(
  // resource URL
  "fonts/helvetiker_bold.typeface.json",

  // onLoad callback
  function (font) {
    // 此时，就可以使用 TextGeometry 去绘制文字了
  },

  // onProgress callback
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },

  // onError callback
  function (err) {
    console.log("An error happened");
  }
);
```

## 参考

- [Loader](https://threejs.org/docs/index.html?q=Loader#api/en/loaders/Loader)
- [DRACOLoader](https://threejs.org/docs/index.html?q=DRACOLoader#examples/en/loaders/DRACOLoader)
- [GLTFLoader](https://threejs.org/docs/index.html?q=GLTFLoader#examples/en/loaders/GLTFLoader)
