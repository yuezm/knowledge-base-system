---
title: 知识库 Schema
description: 知识库结构规则、约定和标签分类
---

# 知识库 Schema

## Domain

全栈前端知识体系 + AI 时代个人知识库 — 涵盖：

- **技术主题**（按 `AI/` `前端/` `Graphics/` `GIS/` `Architecture/` `CS/` `DB/` 等一级分类组织）
- **主题地图**（`00-MOC/` — 5 个主题 MOC + 1 个总入口）
- **工作维度**（PARA — `20-资源/` `30-归档/`；`10-项目/` 已于 2026-07-27 E 方案撤销）
- **方法论与工具**（`方法论/` `开发工具链/` `跨平台/` 等）

2026-07-27 完成 A(目录清理) + B(分类重组) + C(MOC + PARA + 双向链接) 三阶段升级,从"程序员技术博客"演进为"AI 时代个人知识库"。

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
status: evergreen # 成熟度标记（见下方 Status 字段说明）
---
```

### Status 字段（成熟度标记）

`status` 字段用于标记笔记的**内容成熟度**与**时效性**,便于 lint 工具排序和归档决策。

| 值             | 含义                                                | 适用场景                              |
| -------------- | --------------------------------------------------- | ------------------------------------- |
| `evergreen`    | 知识稳定,长期不过时,无需频繁 review                 | 底层原理、概念、算法、方法论、读书笔记 |
| `active`       | 仍在演进,依赖外部版本/项目状态,需定期 review         | 框架笔记、工具笔记、开源项目分析、PARA |
| `stub`         | 仅有占位/大纲,内容不完整,需补全                      | < 30 行的速记、标注"占位/待学"的页面    |
| `archived`     | 已过时或被取代,内容仅供历史参考                      | `30-归档/` 目录下的页面                |

**Lint 用法:**
- `stub` 列表 = 待补全内容清单
- `active` 列表 = 待 review 清单(超过 90 天未更新需重点 review)
- `evergreen` 列表 = 知识稳定区,无需频繁打扰

## Tag Taxonomy

### 一级标签（按目录分类）

| 标签             | 说明                | 对应目录              |
| ---------------- | ------------------- | --------------------- |
| `ai`             | 人工智能/ML/DL      | `AI/`                 |
| `ai-principle`   | AI 底层原理          | `AI/原理/`            |
| `llm-app`        | LLM 工程化应用        | `AI/LLM-应用/`        |
| `ai-agent`       | Agent 系统           | `AI/Agent/`           |
| `aigc`           | 多模态生成           | `AI/AIGC/`            |
| `vector-search`  | 向量检索             | `AI/向量检索/`,`DB/向量库/` |
| `architecture`   | 架构模式/设计       | `Architecture/`       |
| `book`           | 读书笔记            | `Books/`              |
| `browser`        | 浏览器原理          | `Browser/`            |
| `cloud`          | 云计算              | `Cloud/`              |
| `cs`             | 计算机基础          | `CS/`                 |
| `db`             | 数据库              | `DB/`                 |
| `sql`            | 关系型数据库         | `DB/SQL/`             |
| `redis`          | Redis 内存数据库     | `DB/Redis/`           |
| `gis`            | 地理信息            | `GIS/`                |
| `graphics`       | 图形学/WebGL/WebGPU | `Graphics/`           |
| `js-runtime`     | JS 运行时/Node/Deno | `JSRuntime/`          |
| `performance`    | 性能优化            | `Performance/`        |
| `devops`         | 工具链/CI           | `开发工具链/`         |
| `devops-pro`     | DevOps 进阶（容器/编排/监控） | `DevOps/`        |
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
| `methodology`    | 思考方法论 / 职业   | `方法论/`             |
| `security`       | 安全协议 / 认证     | `Security/`           |

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

## 分类归属规则（边界容易混淆的分类）

### `AI/` vs `开源项目分析/`

| 维度     | `AI/`                              | `开源项目分析/`（尤其是 `阅读/` 子目录）        |
| -------- | ---------------------------------- | ----------------------------------------------- |
| 内容性质 | AI 底层原理、核心概念、知识图谱     | 分析性质 / 阅读性质的文章                       |
| 典型内容 | Transformer 架构、Agent 演进史、ML 算法 | 公众号文章总结、横向对比、自我体系对比、项目评估 |
| 判断标准 | 答案导向："X 是什么 / 怎么工作"   | 观点导向："我对 X 的看法 / X 项目的测评"        |
| 时间属性 | 概念相对稳定，长期有效              | 时效性强，可能因外部项目变化而过时              |

**反例（不应放 `AI/` 的内容）：**

- ❌ "1688 Multi-Agent 实践"（公众号文章分析）→ 应放 `开源项目分析/阅读/`
- ❌ "Hermes Kanban vs SubAgent 对比"（自我体系对比）→ 应放 `开源项目分析/阅读/`
- ❌ "Trellis / spec-kit 工具评估" → 应放 `开源项目分析/AI编码工程化/`

**正例（应放 `AI/` 的内容）：**

- ✅ `AI/Agent发展.md`（Agent 架构演进知识图谱）
- ✅ `AI/Transformer.md`（架构原理）
- ✅ `AI/概览.md`（ML/DL 知识地图）

## C 方案：MOC / PARA / 双向链接（C 方案引入的维度）

### `00-MOC/`（主题地图）

- **作用**：用 MOC 入口页把同一主题的零散笔记串起来，提供"多维入口"
- **典型内容**：5 个主题 MOC（AI/前端/Graphics/GIS/工作流）+ 1 个总入口
- **规则**：MOC 页面只放 `[[wikilink]]` 列表 + 简短说明，不复制笔记内容
- **新增频率**：每新建一个主题分类时，配套加一个 MOC 入口页

### `20-资源/`（PARA Resources）

- **作用**：工具/库/参考索引
- **典型内容**：`AI-工具.md` `前端工具.md` `命令行工具.md` 等
- **规则**：
  - 只放工具列表 + 简短描述，不写使用笔记（使用笔记放具体主题分类下）
  - 工具死了移入 `30-归档/`

### `30-归档/`（PARA Archive）

- **作用**：过时/废弃内容
- **典型内容**：
  - 内容已过时的笔记（库/框架版本被取代）
  - 已被新文件取代的笔记
  - 评估性内容失效的笔记（开源项目已死/Stars 暴跌）
- **不归档**：读书笔记、个人方法论、过时但准确的 OS/工具知识
- **归档流程**：
  1. 用 `scripts/related.sh` 看反向链接，反向链接为 0 的优先
  2. 评估是否"会误导"（vs "只是不常看"）
  3. `git mv` 到 `30-归档/`
  4. 更新元文件（AGENTS.md/INDEX.md/CHANGELOG.md）

### 双向链接机制

- **wikilink**：`[[note-path|显示文本]]` 语法（Obsidian 兼容 + Astro Starlight 原生支持）
- **frontmatter related**：`related: [path1, path2]` 字段，列 2-5 个强相关笔记
- **反向链接生成**：`bash scripts/related.sh` 扫所有笔记的 wikilink + related，生成 `_backlinks/` 索引
  - `_backlinks/` 已加入 `.gitignore`（生成产物）
  - 跑一次 ~0.14s，输出总索引 + 25 个关键笔记的独立反向链接页
  - Top 20 反向链接笔记 = "知识库核心节点"
  - 无反向链接笔记 = "孤儿候选"，定期归档 review

### 新笔记规则（C 方案确立）

1. **位置**：放对应主题分类下（如 `AI/Agent/`、`前端/React/`）
2. **命名**：**一概念一页**（`RAG.md` 而非 `RAG-完整指南.md`）
3. **frontmatter**：
   ```yaml
   ---
   title: ...
   description: ...
   tags: [...]
   related:
     - AI/向量检索/概览
     - AI/LLM-应用/概览
   ---
   ```
4. **wikilink 必加**：至少 2 个 `[[wikilink]]` 引用现有笔记
5. **不拆老笔记**：现有"长笔记"保持原样，不强制原子化

### 同赛道多工具的目录组织（2026-09-18 确立）

`开源项目分析/` 下同一子目录常有多个同赛道项目。组织方式按**同赛道家数**决定，判据是
「一个工具自身的事实」更新慢、寿命长，「整条赛道的选型结论」更新快、寿命短——**拆分的依据是更新频率，不是主题**。

| 同赛道家数 | 结构 | 说明 |
| --- | --- | --- |
| 1 家 | 仅单工具页 | 不预设对比页，不写"暂无竞品"之类的占位 |
| 2 家 | 两份单工具页互链 | 各自放一张 5–8 行精简对比表 + `[[wikilink]]`；**不**另建对比页 |
| ≥3 家 | 单工具页 + 独立赛道对比页，双向指针 | 对比页汇聚相对判断，单工具页保留自身事实 |

**文件命名**

- 2–3 家：`<赛道>-<A>-<B>横向对比.md`（如 `CodeGraph-vs-GitNexus-vs-CodeReviewGraph-代码智能工具横向对比.md`）
- ≥4 家：`<赛道>赛道对比.md`（列名不现实，如 `AI浏览器自动化赛道对比.md`）
- 单工具页：`<工具名>-<一句话定位>.md`

**分层边界（两边都不复制对方的长表，只给指针）**

- **赛道对比页**只放：定位速览 / 硬数据表 / 关键分歧点 / 选型建议 / 领域趋势 / 数据核验注意
- **单工具页**只放：项目总览 / 架构 / 核心设计 / 上手 / 潜在坑 / 参考
- 家数不足时该页可不建；家数增长到阈值时**主动补建，并把旧文件改名**（改名走 `git mv` + INDEX 联动 + CHANGELOG `restructure` 条目）

**禁止**

- ❌ 全部塞进一个文件、末尾加对比表——既撞 400 行拆分阈值，又让高频变动的选型结论与低频变动的事实层互相拖累
- ❌ 只有各家的单工具页、没有赛道对比页——赛道一旦 ≥3 家，读者点开 N 个文件才能拼出"该选哪个"，且对比会退化成寄生在某一篇里（从其他家进来就看不到）
