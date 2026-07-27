# 知识库路由

> 知识库根目录: `/home/keven/codes/github/knowledge-base-system/src/content/docs/`
>
> 项目元文件（INDEX.md, CHANGELOG.md, SCHEMA.md）位于项目根目录，不在 docs 下。

## 目录结构

### 📂 一级分类总览

| 分类         | 路径            | 文件数 | 内容                                                     |
| ------------ | --------------- | ------ | -------------------------------------------------------- |
| 00-MOC       | `00-MOC/`       | 6      | 知识库总入口 + 5 个主题地图(AI/前端/Graphics/GIS/工作流) |
| AI           | `AI/`           | 11     | AI 底层原理 / LLM 应用 / Agent / AIGC / 向量检索         |
| Architecture | `Architecture/` | 8      | 架构模式、SPA/MPA、微前端、Monorepo、构建、权限、测试    |
| Books        | `Books/`        | 2      | 编程珠玑、Books of Shader                                |
| Browser      | `Browser/`      | 3      | 浏览器多进程模型、指纹、性能                             |
| CS           | `CS/`           | 41     | 算法、数据结构、OS、网络、Docker、编码、实时通信         |
| Cloud        | `Cloud/`        | 1      | AWS/GCP/Azure/阿里云、Serverless、CDN（占位）            |
| DB           | `DB/`           | 7      | MongoDB / SQL / Redis / 向量库                           |
| DevOps       | `DevOps/`       | 1      | CI/CD、容器编排、监控、IaC（占位）                       |
| GIS          | `GIS/`          | 23     | 坐标系、Cesium、Leaflet、3D Tiles                        |
| Graphics     | `Graphics/`     | 44     | Three.js、Babylon、WebGL、WebGPU、图形学                 |
| JSRuntime    | `JSRuntime/`    | 22     | Node.js、Deno、NPM、模块系统、Egg 源码                   |
| Performance  | `Performance/`  | 6      | Chrome 调试、JS 优化、预加载、内存排查                   |
| Security     | `Security/`     | 1      | 认证 / 安全协议                                          |
| 方法论       | `方法论/`       | 4      | 职业、视野、开源经济、软件工程方法论                     |
| 开源项目分析 | `开源项目分析/` | 16     | 开源项目评估、选型分析、工具测评、项目阅读               |
| 开发工具链   | `开发工具链/`   | 6      | Git、Playwright、Puppeteer                               |
| 前端         | `前端/`         | 54     | React、Vue、TS、JS、CSS、HTML、动画                      |
| 20-资源      | `20-资源/`      | 3      | PARA Resources 维度——工具/库/参考索引                    |
| 30-归档      | `30-归档/`      | 1      | PARA Archive 维度——过时/废弃内容(占位)                   |
| 跨平台       | `跨平台/`       | 15     | Electron、React Native、小程序、协议桥接                 |
| 音视频       | `音视频/`       | 2      | 视频、流媒体                                             |

### 📂 二级子目录详情

#### AI

```
AI/
├── 原理/                                          ← AI 底层原理（不依赖 LLM）
│   ├── 概览.md（283 行原创内容：AI 定义/符号主义 vs 连接主义/感知与决策）
│   ├── 知识地图.md（待学清单：监督/无监督/强化/训练范式）
│   ├── Transformer.md
│   ├── 训练.md
│   ├── 机器学习.md
│   └── 模型.md
├── LLM-应用/                                      ← LLM 工程化技术
│   └── 概览.md                                    (RAG / Prompt / Function Calling / Embedding / Memory 待补)
├── Agent/                                         ← Agent 系统
│   ├── 概览.md
│   └── Agent发展.md                                ← Agent 架构演进知识图谱
├── AIGC/                                          ← 多模态生成
│   └── 概览.md                                    (图像/视频/音频/3D 待补)
└── 向量检索/                                      ← 向量检索算法视角
    └── 概览.md                                    (HNSW/IVF/量化/混合检索 待补)
```

#### 00-MOC（C 方案新增）

```
00-MOC/
├── Home.md                                         ← 知识库总入口
├── AI-技术树.md                                   ← AI 主题 MOC
├── 前端-技术树.md                                 ← 前端主题 MOC
├── Graphics-技术树.md                             ← Graphics 主题 MOC
├── GIS-技术树.md                                  ← GIS 主题 MOC
└── 工作流与项目.md                                ← 独立项目/工具/归档入口
```

#### 20-资源（C 方案新增，PARA Resources）

```
20-资源/
├── AI-工具.md
├── 前端工具.md
└── 命令行工具.md
```

#### 30-归档（C 方案新增，PARA Archive）

```
30-归档/
└── README.md                                       ← 归档规则
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
├── Books of Shader.md
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
│   ├── 时区.md
│   └── Ubuntu/包管理.md
├── NetWork/
│   ├── Network.md
│   ├── Application/HTTP/  (HTTP, 状态码, RESTful, URI系列)
│   ├── Application/GRPC/GRPC.md
│   └── Application/实时通信/ (前后端实时通信.md)
├── Algorithm/
│   ├── 压缩算法.md / 快速幂.md / 树形常用算法.md / 线形常用算法.md
│   ├── DP/ (经典扔鸡蛋.md, 股票算法.md)
│   └── (来自 ToBeContinue) 二分法 / 单调栈 / 博弈算法 / 多米诺和托米诺平铺 / 子序列问题 / 寻找中位数 / 树状数组 / 格雷码 / 贡献度算法 / 进制转换 / 随机算法
├── DataStructure/
│   ├── 数学.md
│   ├── Linear/ (位图.md, 线形.md)
│   ├── Map/ (图形.md)
│   └── Tree/ (单词查找树, 堆, 并查集, 构建树, 树形)
├── Docker/
│   └── Docker.md
└── Encoding/
    ├── BOM.md
    ├── Unicode.md
    └── Base64.md
```

#### DB

```
DB/
├── MongoDB/
│   ├── MongoDB.md
│   ├── API.md
│   ├── 权限.md
│   └── 索引.md
├── SQL/                                            ← 关系型数据库（占位）
│   └── 概览.md
├── Redis/                                          ← 内存数据库（占位）
│   └── 概览.md
└── 向量库/                                         ← 向量数据库（DB 视角）
    └── 概览.md                                    （算法视角见 AI/向量检索/）
```

#### DevOps

```
DevOps/
└── 概览.md                                        ← CI/CD、容器、监控、IaC（占位）
```

#### Cloud

```
Cloud/
└── 概览.md                                        ← AWS/GCP/Azure/阿里云、Serverless、CDN（占位）
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
│   ├── Scene.md / Texture.md / Transform.md / Extras.md
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
│   ├── Node.js 特性.md / CommonJS.md / node.js内存泄漏.md
│   ├── API/ (buffer, child_process, cluster, console, Error, Module, process, string_decoder, timer)
│   ├── Deploy/ (node使用docker部署.md)
│   ├── Framework/ (Egg.md, 从egg-helper学习egg源码.md)
│   └── Packages/ (NPM, PNPM, Yarn, package.json, npm和yarn的区别)
├── Deno/
│   └── JSR.md
```

#### Performance

```
Performance/
├── Javascript优化.md
├── Chrome调试.md / JS如何获取精确的时间戳.md / Web截图.md / 内存泄漏及排查.md
└── preload, prefetch, prerender.md
```

#### Security

```
Security/
└── 2FA验证原理.md
```

#### 方法论

```
方法论/
├── 开源如何保证收入.md
├── 我的大前端世界观.md
├── 软件开发周期.md
└── 面试复习.md
```

#### 开发工具链

```
开发工具链/
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
│   ├── API.md / FAQ.md / Hooks.md / React状态管理.md / Scheduler.md / Utils.md
│   ├── Headless UI 和 React Hooks.md
│   └── (来自 ToBeContinue) React 事件 / React 的错误捕获 / 为啥react没有keep-alive
├── Vue/
│   ├── 响应式系统.md / 组件.md / Vue Router.md
├── Typescript/
│   ├── Typescript.md / tsconfig.md / 类型.md
│   └── (来自 ToBeContinue) 从d.ts了解typescript
├── Javascript/
│   ├── (核心) 作用域.md / 执行上下文.md / Promise.md / Function.md / Event.md
│   ├── (API) ArrayBuffer.md / Audio.md / Canvas.md / Document.md / File System API.md / Reflect.md / Scheduler.md
│   ├── Number/ (Bigint.md, Javascript浮点数.md, Number.md)
│   ├── Object/ (Array.md, Javascript.md, 面向对象, 属性和方法, RegExp.md, This.md)
│   └── (来自 ToBeContinue/杂谈) CJS+ESM+Webpack, Import maps, Javascript正则, JSON和Javascript, 大文件如何上传, 如何处理循环引用, 常见的问题及解决方案, 解决ESM Import 过多
├── CSS/
│   ├── CSS.md / Color.md / Grid.md / Selector.md
│   └── (来自 杂谈) 常用的图片格式.md
├── HTML/
│   ├── HTML.md / meta.md
└── 动画/
    └── Lottie.md
```

#### 开源项目分析

```md
开源项目分析/
├── 阅读/ ← 项目阅读、文章分析类
│ ├── Harness 工程-Multi-Agent 架构实践.md — 阿里数据研发 Harness 工程实践总结
│ ├── 1688-Multi-Agent 超级组织实践.md — 1688 数据中心 Multi-Agent 研发小队实录,KST 三层知识工程 + Harness/Loop Engineering + Squad 协作模式
│ ├── Hermes-Kanban 多Profile 持久化工作流与 SubAgent 对比.md — Hermes Kanban 多 Profile 持久化工作流与 CC/OpenCode SubAgent 5 维对比
│ ├── Medal-W-Key-前端基础设施现代化复盘.md — Medal.tv Electron+Web 前端 Macro→Micro 现代化路径,barrel file 与 tree-shaking 实战权衡
│ └── htmx-与 AI 协作的具体案例.md — htmx 作者 Carson Gross 用 Claude 修 hyperscript parser bug 全过程,AI 调查/测试强,方案设计弱
├── 依赖分析工具/
│ └── dependency-cruiser-JS 依赖分析和架构治理工具.md — JS/TS 依赖分析与架构治理工具
├── 自托管书签/
│ └── Karakeep-自托管书签全能工具.md — Karakeep 自托管书签全能工具分析
├── AI 浏览器自动化/
│ └── Stagehand-AI 浏览器自动化框架.md — Stagehand AI 浏览器自动化框架分析
├── AI 记忆基础设施/
│ └── Honcho-Agent 记忆基础设施.md — Honcho Agent 记忆基础设施分析
├── AI 代码审查/
│ └── Open-Code-Review-阿里 AI 代码审查工具.md — 阿里开源 AI 代码审查 CLI 工具，10.5K Stars
├── AI 代码智能/
│ └── CodeGraph-vs-GitNexus-vs-CodeReviewGraph-代码智能工具横向对比.md — 三大代码智能工具全面对比
├── AI 编码工程化/ ← AI 编码 spec-driven / agent harness 类
│ ├── Trellis-AI 编码工程框架.md — Trellis 跨平台 AI Coding Agent Harness,4 阶段循环,12.8K Stars
│ ├── spec-kit-GitHub 官方规范驱动开发.md — spec-kit GitHub 官方规范驱动开发工具,122K Stars, MIT
│ ├── Superpowers-AI 编码工程师方法论与 Skills 框架.md — obra/superpowers AI 编码工程师方法论,13+ composable skills,257K Stars, MIT
│ └── Ralph-Autonomous-AI-Coding-Loop.md — snarktank/ralph 自主 AI 编码循环,PRD 拆小 story + 每轮 fresh context,21.2K Stars, MIT
├── 提示词工程/ ← 提示词工程设计类
│ └── Claude-Design-System-Prompt-工程的设计协作提示词库.md — Claude Design 逆向工程提示词库
└── ... ← 持续追加：同类型工具放在同子目录下
```

#### 跨平台

```
跨平台/
├── Electron/
│   ├── Electron 优化.md / FAQ.md
│   └── 工具/ (工具.md, 日志.md)
├── MiniProgram/
│   └── 概览.md
├── RN/
│   ├── ADB.md / 三方库.md / 事件.md / 优化.md
│   ├── 样式.md / 模块.md / 组件.md / 踩坑.md / 配置.md
└── (来自 杂谈) 网页唤醒本地程序.md
```

#### 音视频

```
音视频/
├── 视频/
│   └── 视频.md
└── 流媒体/
    └── 直播流.md
```

## 常用路径示例

```
/home/keven/codes/github/knowledge-base-system/src/content/docs/前端/React/Hooks.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/前端/Vue/响应式系统.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/Graphics/Three/Texture.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开发工具链/Git/Git工作流.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/GIS/Cesium/Viewer.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/Architecture/MicroFE/微前端.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/CS/NetWork/Application/HTTP/HTTP.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/JSRuntime/Node.js/API/process.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开源项目分析/自托管书签/Karakeep-自托管书签全能工具.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开源项目分析/AI浏览器自动化/Stagehand-AI浏览器自动化框架.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开源项目分析/AI记忆基础设施/Honcho-Agent记忆基础设施.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开源项目分析/AI代码审查/Open-Code-Review-阿里AI代码审查工具.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开源项目分析/AI代码智能/CodeGraph-vs-GitNexus-vs-CodeReviewGraph-代码智能工具横向对比.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/AI/原理/Transformer.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/AI/Agent/Agent发展.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/AI/LLM-应用/概览.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/AI/AIGC/概览.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/AI/向量检索/概览.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/DB/SQL/概览.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/DB/Redis/概览.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/DB/向量库/概览.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/DevOps/概览.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/Cloud/概览.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开源项目分析/AI编码工程化/Trellis-AI编码工程框架.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开源项目分析/AI编码工程化/spec-kit-GitHub官方规范驱动开发.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开源项目分析/AI编码工程化/Ralph-Autonomous-AI-Coding-Loop.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开源项目分析/AI编码工程化/Superpowers-AI编码工程师方法论与Skills框架.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开源项目分析/阅读/Medal-W-Key-前端基础设施现代化复盘.md
/home/keven/codes/github/knowledge-base-system/src/content/docs/开源项目分析/阅读/htmx-与AI协作的具体案例.md
```

## 检索命令

```python
# 搜索知识库内容（按主题关键词）
search_files(pattern="<keyword>", target="content", path="/home/keven/codes/github/knowledge-base-system/src/content/docs/", limit=20)

# 读取特定文档
read_file(path="/home/keven/codes/github/knowledge-base-system/src/content/docs/<category>/<topic>.md")

# 按分类搜索
search_files(pattern="<keyword>", target="content", path="/home/keven/codes/github/knowledge-base-system/src/content/docs/前端/", limit=20)

# 按 status 过滤(2026-07-27 D 方案新增)
# 找出所有 stub 待补全笔记
import subprocess; subprocess.run(["grep", "-rl", "^status: stub", "src/content/docs"])
# 找出所有 active 待 review 笔记
subprocess.run(["grep", "-rl", "^status: active", "src/content/docs"])
```

## 统计

- **总计一级分类**: 24 个（22 个 B 方案分类 + 00-MOC/20-资源/30-归档 3 个 C 方案 PARA + MOC 维度;2026-07-27 E 方案撤销 10-项目 PARA Projects 维度）
- **总计文件**: 278 个 `.md` 文件（含 Home.md;2026-07-27 E 方案 282→278,删 4 个 10-项目 指针页）
- **最深嵌套**: 4 层（CS/NetWork/Application/HTTP/ 和 CS/NetWork/Application/实时通信/）
- **status 分布**(2026-07-27 D 方案引入): evergreen 33 / active 167 / stub 81 / archived 1
- **2026-07-27 D 方案**: 引入 `status` 字段(evergreen/active/stub/archived)标记笔记成熟度,281 篇自动赋初值 + SCHEMA.md 加字段说明;4 处元文件联动完成(SCHEMA/AGENTS/INDEX/CHANGELOG)
- **2026-07-27 E 方案**: 撤销 10-项目 PARA Projects 维度——4 个独立 git 项目指针页整体删除(`git rm`);理由:(1) 个人知识库与项目无关 (2) 公开仓库路径泄漏(`/home/keven/codes/...`);4 元文件联动完成;related.sh PRIORITY 同步移除;**4 篇删除,0 篇迁移**
- **2026-07-27 C 方案**: 升级为"个人知识库"——新建 00-MOC/(6 入口页) + 10-项目/(4 独立 git 项目指针) + 20-资源/(3 工具索引) + 30-归档/(1 规则);新增 scripts/related.sh 反向链接生成脚本(.gitignore 掉 \_backlinks/);**14 篇新增,0 篇迁移**(无破坏性重构)
- **2026-07-27 B 方案**: AI 拆 5 子目录（原理/LLM-应用/Agent/AIGC/向量检索），DB 补 SQL/Redis/向量库 3 子目录，新增 DevOps/Cloud 2 大类；**10 篇新增**(5 个新子目录各 1 概览 + AI/原理/知识地图 1 篇,加原 AI/概览 整体移入 0 增量); **原 AI/概览.md 283 行原创内容保留**(路径 AI/概览.md → AI/原理/概览.md)
- **2026-07-27 B 方案踩坑记录**: 新建 AI/原理/概览.md 时,git 默认将同名的 AI/概览.md 视为删除。**立刻用 git show HEAD 还原原 283 行原创内容**到 AI/原理/概览.md,新写的知识地图另存为 AI/原理/知识地图.md——教训:新建同名前必须先 cat 旧内容或 git mv 改名
