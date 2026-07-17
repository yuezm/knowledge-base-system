---
title: 知识库 Schema
description: 知识库结构规则、约定和标签分类
---

# 知识库 Schema

## Domain

全栈前端知识体系 — 涵盖前端工程（React/Vue/JS/TS/CSS/HTML）、图形学与三维（Three.js/Babylon/WebGL/WebGPU）、地理信息系统（Cesium/Leaflet/3D Tiles）、服务端运行时（Node.js/Deno）、计算机基础（算法/数据结构/OS/网络/编码）、数据库（MongoDB）、AI/ML、架构设计、跨平台开发（Electron/RN/小程序）、性能优化、工具链（Git/Playwright）等领域。

## Conventions (现有约定)

### 目录结构

- **一级分类**按领域命名（如 `前端/`、`Graphics/`、`GIS/`），中文或英文，首字母大写
- **二级分类**按子领域或具体库/框架命名（如 `前端/React/`、`Graphics/Three/`、`CS/NetWork/Application/HTTP/`）
- 文件命名：中文或英文，使用常规命名（无强制 kebab-case，以可读性优先）
- 最大嵌套深度：4 层（如 `CS/NetWork/Application/HTTP/`）

### 文件格式

- 所有内容文件使用 `.md` 扩展名
- 入口文件 `index.mdx` 用于 Astro Starlight 路由
- YAML frontmatter 必须包含 `title` 和 `description` 字段
- 可选的 Astro Starlight 字段：`sidebar`、`tableOfContents`、`template`、`hero`

### YAML Frontmatter 规范

所有知识库文件应遵循以下 frontmatter 格式：

```yaml
---
title: 页面标题
description: 一句话描述
# 可选字段
sidebar:
  hidden: true # 是否在侧边栏隐藏
tableOfContents:
  minHeadingLevel: 2 # 目录最小标题层级
  maxHeadingLevel: 4 # 目录最大标题层级
tags: [tag1, tag2] # 分类标签（来自下方标签分类表）
related: [文件路径] # 相关文件（[[wikilink]] 格式）
---
```

## Tag Taxonomy

### 一级标签（按目录分类）

| 标签             | 说明                | 对应目录              |
| ---------------- | ------------------- | --------------------- |
| `ai`             | 人工智能/ML/DL      | `AI/`                 |
| `architecture`   | 架构模式/设计       | `Architecture/`       |
| `book`           | 读书笔记            | `Books/`              |
| `browser`        | 浏览器原理          | `Browser/`            |
| `cs`             | 计算机基础          | `CS/`                 |
| `db`             | 数据库              | `DB/`                 |
| `gis`            | 地理信息            | `GIS/`                |
| `graphics`       | 图形学/WebGL/WebGPU | `Graphics/`           |
| `js-runtime`     | JS 运行时/Node/Deno | `JSRuntime/`          |
| `performance`    | 性能优化            | `Performance/`        |
| `devops`         | 工具链/CI           | `开发工具链/`         |
| `frontend`       | 前端工程            | `前端/`               |
| `react`          | React 框架          | `前端/React/`         |
| `vue`            | Vue 框架            | `前端/Vue/`           |
| `typescript`     | TypeScript          | `前端/Typescript/`    |
| `javascript`     | JavaScript 语言     | `前端/Javascript/`    |
| `css`            | CSS/样式            | `前端/CSS/`           |
| `html`           | HTML                | `前端/HTML/`          |
| `cross-platform` | 跨平台开发          | `跨平台/`             |
| `electron`       | Electron            | `跨平台/Electron/`    |
| `react-native`   | React Native        | `跨平台/RN/`          |
| `mini-program`   | 小程序              | `跨平台/MiniProgram/` |
| `media`          | 音视频              | `音视频/`             |

### 二级标签（按技术主题）

- **图形学**: `webgl`, `webgpu`, `threejs`, `babylon`, `shader`, `glsl`, `wgsl`, `cesium`, `leaflet`, `3d-tiles`
- **算法与数据结构**: `algorithm`, `data-structure`, `dp`, `tree`, `graph`, `string`
- **网络**: `network`, `http`, `grpc`, `rest`
- **操作系统**: `os`, `linux`, `docker`
- **工程实践**: `testing`, `monorepo`, `micro-frontend`, `auth`, `monitoring`, `ci-cd`
- **工具**: `git`, `playwright`, `puppeteer`

## 交叉引用约定

文件之间可以通过 `[[wikilink]]` 语法建立交叉引用，格式为：

```markdown
相关概念详见 [[AI/Transformer]]
更多实现参考 [[前端/React/Hooks]]
```

交叉引用规则：

1. **相关文件**：两个文件内容上有直接关联（如 Three.js 的 Scene 和 Camera）
2. **前置知识**：阅读当前文件需要先了解的内容
3. **对比参照**：同一主题的不同实现方案（如 Vue vs React）
4. **深入阅读**：当前文件提到的概念在其他文件中有更详细的展开

## 页面规模阈值

- **拆分阈值**：单个文件超过 400 行时考虑拆分为子主题
- **合并阈值**：多个文件内容高度重叠时合并
- **归档**：内容已经完全过时或被新文件取代的，移入 `_archive/` 目录

## 维护策略

1. **新增内容**：按现有目录分类放入对应目录，保持目录结构一致性
2. **交叉引用**：新建文件时检查已有相关文件，添加 `[[wikilinks]]`
3. **内容更新**：更新时保持 frontmatter 中 title/description 与实际内容一致
4. **定期整理**：`ToBeContinue/` 目录中的文件应逐步整理归入正式分类
