# 知识库路由

> 知识库根目录: `/home/keven/codes/github/knowledge-base-system/src/content/docs/`

## 目录结构

### 📂 一级分类总览

| 分类         | 路径            | 文件数 | 内容                                                  |
| ------------ | --------------- | ------ | ----------------------------------------------------- |
| AI           | `AI/`           | 5      | ML/DL 模型、训练、Transformer                         |
| Architecture | `Architecture/` | 8      | 架构模式、SPA/MPA、微前端、Monorepo、构建、权限、测试 |
| Books        | `Books/`        | 1      | 编程珠玑                                              |
| Browser      | `Browser/`      | 3      | 浏览器多进程模型、指纹、性能                          |
| CS           | `CS/`           | 28     | 算法、数据结构、OS、网络、Docker、编码                |
| DB           | `DB/`           | 4      | MongoDB API、索引、权限                               |
| GIS          | `GIS/`          | 23     | 坐标系、Cesium、Leaflet、3D Tiles                     |
| Graphics     | `Graphics/`     | 43     | Three.js、Babylon、WebGL、WebGPU、图形学              |
| JSRuntime    | `JSRuntime/`    | 17     | Node.js、Deno、NPM、模块系统                          |
| Performance  | `Performance/`  | 2      | JS 优化、预加载                                       |
| ToBeContinue | `ToBeContinue/` | 25     | 待整理主题（算法、协议、深入原理）                    |
| Utils        | `Utils/`        | 6      | Git、Playwright、Puppeteer                            |
| 前端         | `前端/`         | 35     | React、Vue、TS、JS、CSS、HTML                         |
| 杂谈         | `杂谈/`         | 14     | 经验分享、源码解读、工具链                            |
| 跨平台       | `跨平台/`       | 12     | Electron、React Native、小程序                        |
| 音视频       | `音视频/`       | 1      | 视频处理                                              |

### 📂 二级子目录详情

#### AI

```
AI/
├── 概览.md
├── 机器学习.md
├── 模型.md
├── 训练.md
└── Transformer.md
```

#### Architecture

```
Architecture/
├── 架构.md
├── SPA VS MPA.md
├── 权限设计.md
├── Build/
│   └── SourceMap.md
├── MicroFE/
│   └── 微前端.md
├── Monorepo/
│   └── Lerna.md
├── Separation/
│   └── 前后端分离.md
└── 测试/
    └── 概览.md
```

#### Books

```
Books/
└── 编程珠玑.md
```

#### Browser

```
Browser/
├── Performance.md
├── 浏览器多进程模型.md
└── 浏览器指纹.md
```

#### CS

```
CS/
├── OS/
│   ├── OS.md
│   ├── Linux.md
│   └── Ubuntu/包管理.md
├── NetWork/
│   ├── Network.md
│   ├── Application/HTTP/  (HTTP, 状态码, RESTful, URI系列)
│   └── Application/GRPC/GRPC.md
├── Algorithm/
│   ├── 压缩算法.md / 快速幂.md / 树形常用算法.md / 线形常用算法.md
│   └── DP/ (经典扔鸡蛋.md, 股票算法.md)
├── DataStructure/
│   ├── 数学.md
│   ├── Linear/ (位图.md, 线形.md)
│   ├── Map/ (图形.md)
│   └── Tree/ (单词查找树, 堆, 并查集, 构建树, 树形)
├── Docker/
│   └── Docker.md
└── Encoding/
    ├── BOM.md
    └── Unicode.md
```

#### DB

```
DB/
└── MongoDB/
    ├── MongoDB.md
    ├── API.md
    ├── 权限.md
    └── 索引.md
```

#### GIS

```
GIS/
├── 坐标系.md
├── FAQ.md
├── 概览.md
├── Cesium/
│   ├── Camera.md / Entity.md / Events.md / Imagery.md
│   ├── Material.md / Model.md / Particle.md / Plugins.md
│   ├── Property.md / Terrain.md / Viewer.md / Widget.md
│   ├── Post Processing.md / 坐标和投影.md
├── Leaflet/
│   ├── Layer.md / 投影.md / 源码学习.md
└── 数据模型/
    ├── 3D Tiles.md / Tiles.md / 概览.md
```

#### Graphics

```
Graphics/
├── 图形学.md
├── Three/
│   ├── Three.md / Addons.md / Animation.md / Camera.md
│   ├── Controls.md / Geometory.md / GUI.md / Helper.md
│   ├── Light.md / Loader.md / Material.md / Mesh.md
│   ├── Model.md / Other.md / QA.md / Renderer.md
│   ├── Scene.md / Texture.md / Transform.md
├── Babylon/
│   ├── Algebra.md / Animation.md / AssetsManager.md / Audio.md
│   ├── Camera.md / Engine.md / Light.md / Material.md
│   ├── Mesh.md / Particle.md / Scene.md / SceneLoader.md
│   ├── Shadow.md / Sprite.md / Vec.md
├── WebGL/
│   ├── API.md / GLSL.md / 概览.md
├── WebGPU/
│   ├── WGSL.md / 概览.md / 渲染管线.md / 计算管线.md
└── CANON/
    └── API.md
```

#### JSRuntime

```
JSRuntime/
├── Javascript运行时.md
├── Node.js/
│   ├── Node.js 特性.md / CommonJS.md
│   ├── API/ (buffer, child_process, cluster, console, Error, Module, process, string_decoder, timer)
│   ├── Deploy/ (node使用docker部署.md)
│   ├── Framework/ (Egg.md)
│   └── Packages/ (NPM, PNPM, Yarn, package.json, npm和yarn的区别)
├── Deno/
│   └── JSR.md
```

#### Performance

```
Performance/
├── Javascript优化.md
└── preload, prefetch, prerender.md
```

#### ToBeContinue

```
ToBeContinue/
├── (算法类) 二分法, 单调栈, 博弈算法, 多米诺和托米诺平铺, 子序列问题, 寻找中位数, 树状数组, 格雷码, 贡献度算法, 进制转换, 随机算法
├── (JS/TS) CJS+ESM+Webpack, Import maps, Javascript正则, JSON和Javascript, 从d.ts了解typescript
├── (React) React 事件, React 的错误捕获, 为啥react没有keep-alive
├── (网络) 前后端实时通信, 直播流, 时区
├── (编码) Base64编码, Heap
└── (其他) 大文件如何上传
```

#### Utils

```
Utils/
├── Git/
│   ├── Git原理.md / Git命令.md / Git工作流.md / Git hooks husky lint-staged.md
├── Playwright/
│   └── Playwright.md
└── Puppetter/
    └── Puppetter优化.md
```

#### 前端

```
前端/
├── React/
│   ├── API.md / Hooks.md / React状态管理.md / Scheduler.md / Utils.md
│   └── Headless UI 和 React Hooks.md
├── Vue/
│   ├── 响应式系统.md / 组件.md / Vue Router.md
├── Typescript/
│   ├── Typescript.md / 类型.md
├── Javascript/
│   ├── (核心) 作用域.md / 执行上下文.md / Promise.md / Function.md / Event.md
│   ├── (API) ArrayBuffer.md / Audio.md / Canvas.md / Document.md / File System API.md / Reflect.md / Scheduler.md
│   ├── Number/ (Bigint.md, Javascript浮点数.md, Number.md)
│   └── Object/ (Array.md, Javascript.md, 面向对象, 属性和方法, RegExp.md, This.md)
├── CSS/
│   ├── CSS.md / Color.md / Grid.md / Selector.md
├── HTML/
│   ├── HTML.md / meta.md
└── 动画/
    └── Lottie.md
```

#### 杂谈

```
杂谈/
├── (调试/排查) Chrome调试.md, JS如何获取精确的时间戳.md, node.js内存泄漏.md, 内存泄漏及排查.md, 如何处理循环引用.md, 常见的问题及解决方案.md
├── (工程) Web截图.md, 网页如何唤醒本地程序.md, 解决ESM Import 过多.md, 软件开发周期.md, 面试复习.md
├── (源码) 从egg-helper学习egg源码.md
└── (视野) 开源如何保证收入.md, 我的大前端世界观.md
```

#### 跨平台

```
跨平台/
├── Electron/
│   ├── Electron 优化.md / FAQ.md
│   └── 工具/ (工具.md, 日志.md)
├── MiniProgram/
│   └── 概览.md
└── RN/
    ├── ADB.md / 三方库.md / 事件.md / 优化.md
    ├── 样式.md / 模块.md / 组件.md / 踩坑.md / 配置.md
```

#### 音视频

```
音视频/
└── 视频/
    └── 视频.md
```

## 常用路径示例

```
/home/keven/codes/github/knowledge-base-system/src/content/docs/前端/React/Hooks.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/前端/Vue/响应式系统.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/Graphics/Three/Texture.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/Utils/Git/Git工作流.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/GIS/Cesium/Viewer.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/Architecture/MicroFE/微前端.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/CS/NetWork/Application/HTTP/HTTP.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/JSRuntime/Node.js/API/process.md
```

## 检索命令

```python
# 搜索知识库内容（按主题关键词）
search_files(pattern="<keyword>", target="content", path="/home/keven/codes/github/knowledge-base-system/src/content/docs/", limit=20)

# 读取特定文档
read_file(path="/home/keven/codes/github/knowledge-base-system/src/content/docs/<category>/<topic>.md")

# 按分类搜索
search_files(pattern="<keyword>", target="content", path="/home/keven/codes/github/knowledge-base-system/src/content/docs/前端/", limit=20)
```

## 统计

- **总计一级分类**: 16 个
- **总计文件**: ~197 个 `.md` / `.mdx` 文件
- **最深嵌套**: 4 层（CS/NetWork/Application/HTTP/ 和 CS/NetWork/Application/GRPC/）
