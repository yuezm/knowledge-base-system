---
title: 知识库操作日志
description: 知识库变更的时序记录
sidebar:
  hidden: true
---

# 知识库操作日志

> 按时间顺序记录所有知识库变更。追加模式。
> 格式：`## YYYY-MM-DD 操作 | 主题`
> 操作类型：init, ingest, update, lint, restructure, archive, delete

## 2026-07-27 D 方案 restructure | 引入 status 字段——笔记成熟度标记

- **目标**:为 282 篇笔记引入 `status` 字段,标记内容成熟度与时效性,让 lint 工具能排序"待补全 / 待 review / 稳定区"。
- **动机**:
  - KB 已 282 篇,大量 CS/Algorithm 子目录笔记只有 5-25 行(算法速记,没补完),无差别浏览效率低
  - 框架/工具类笔记(React/Vue/Cesium/Three)版本敏感,需要定期 review,但缺少机器可读的标记
  - 归档区(`30-归档/`)存在但机器无法判断"哪些笔记需要 review",完全靠人
- **设计** — 4 个值
  - `evergreen`(33 篇): 知识稳定,长期不过时——原理/算法/方法论/读书笔记
  - `active`(167 篇): 仍在演进,依赖外部版本/项目状态——框架/工具/开源项目分析/PARA 指针
  - `stub`(81 篇): 仅有占位/大纲,内容不完整——< 30 行的速记、标注"占位/待学"的页面
  - `archived`(1 篇): 已过时或被取代,内容仅供历史参考——`30-归档/` 目录
- **默认赋值规则** — 路径前缀匹配 + 行数 + 占位标记
  - `AI/原理`、`CS/Algorithm`、`CS/DataStructure`、`CS/数学`、`Architecture/MicroFE`、`方法论`、`Books` → `evergreen`
  - `前端/React`、`前端/Vue`、`Graphics/Three`、`GIS/Cesium`、`JSRuntime`、`开发工具链` 等 → `active`
  - `00-MOC/` `10-项目/` `20-资源/` `开源项目分析/` → `active`
  - 文件 < 30 行 或 含"占位/待学" → 强制 `stub`(覆盖路径规则)
  - 16 个路径未匹配文件单独补全(Agent/LLM-应用/Architecture 根/GIS 根/CANON/Home 等)
- **Lint 用法**
  ```bash
  # 找出所有 stub 待补全笔记
  grep -rl "^status: stub" src/content/docs
  # 找出所有 active 待 review 笔记
  grep -rl "^status: active" src/content/docs
  ```
- **修改范围** — 281 篇 frontmatter 改动(282 总 - 1 已 archived),+ SCHEMA.md 字段定义,+ 4 处元文件联动(SCHEMA/AGENTS/INDEX/CHANGELOG)
- **无破坏性**:仅追加字段,不改任何笔记正文

## 2026-07-27 C 方案 restructure | 升级为个人知识库——MOC + PARA + 双向链接

- **目标**:从"按主题分类的技术博客"升级为"个人知识库"。核心差异:**多维入口(MOC) + 工作维度(PARA) + 双向链接(脚本生成)**。本条是 A(目录清理) + B(分类重组) 之后的第三步。
- **核心设计原则:无破坏性重构**——**现有 268 篇笔记完全不拆不迁,只加新结构 + 双向链接**。Niklas Luhmann 卡片盒笔记法验证的"渐进式优于一次性重构"。
- **新建 00-MOC/(6 篇)** — 主题地图(Map of Content)入口
  - `Home.md` — 知识库总入口(MOC of MOCs)
  - `AI-技术树.md` `前端-技术树.md` `Graphics-技术树.md` `GIS-技术树.md` `工作流与项目.md`
  - 用 `[[wikilink]]` 把现有零散笔记串起来,不改任何原笔记
- **新建 10-项目/(4 篇)** — PARA Projects 维度
  - `sa_protocol_library.md` `sagc-new-usoa.md` `awesome-toys.md` `knowledge-base-system.md`(自指)
  - 指针页设计:项目名 + 简介 + 本地路径 + git URL + 知识库中相关笔记 wikilink
  - **不复制项目内容**——用户明确"他们是独立 git 项目,和知识库没关系",知识库只做"软链入"
- **新建 20-资源/(3 篇)** — PARA Resources 维度
  - `AI-工具.md` `前端工具.md` `命令行工具.md` — 工具索引(从现有笔记 wikilink 提取)
- **新建 30-归档/(1 篇)** — PARA Archive 维度
  - `README.md` — 归档规则:何时把笔记移到归档(内容已过时 / 已被新文件取代 / 评估性内容失效)
- **新建 scripts/related.sh** — 反向链接生成脚本
  - 扫 `src/content/docs/**/*.md` 的 `[[wikilink]]` + frontmatter `related:` 字段
  - 生成 `_backlinks/index.md` 总索引(Top 20 + 无引用笔记列表) + 25 个关键笔记的独立反向链接页
  - `_backlinks/` 加入 `.gitignore`(生成产物)
  - 跑一次 0.14s,282 个文件扫完,**77% 笔记有反向链接,63 个孤儿笔记**(候选归档)
  - 实际数据:反向链接 Top 1 = `AI/向量检索/概览` (5 反向链接)——健康信号
- **新笔记 frontmatter 规范**:
  - `related: [path/to/note]` 字段列 2-5 个强相关笔记
  - 必加至少 2 个 `[[wikilink]]` 引用现有笔记
  - 老的"长笔记"不强制拆(遵守"无破坏性"原则)
- **为什么不迁 Obsidian**:
  - 现有 Astro 静态站点 + git 工作流不能丢
  - frontmatter `related` 字段是 Astro 友好 + 兼容 Obsidian
  - 增量迁移优于全量迁移
- **更新 AGENTS.md**:总览表 22→25 一级分类(加 00-MOC/10-项目/20-资源/30-归档),新增 5 个二级子树段(00-MOC/10-项目/20-资源/30-归档 + 在 AI 后),统计 268→282(14 篇新增)
- **更新 INDEX.md**:顶端加"知识库总入口" + 5 主题地图,末尾加 PARA 3 个章节,页面计数 268→282
- **更新 .gitignore**:加 `_backlinks/`(scripts/related.sh 的生成产物)
- **未做(留给未来)**:
  - 现有 268 篇笔记的"原子化拆分"(B 方案踩坑后决定**不拆**,等以后真的需要)
  - MOC 双向链接脚本的"修复悬空 wikilink"功能(目前只统计,不改)
  - Daily Notes / 时间维度
  - AI 时代深度内容(RAG 实战/MCP 协议详解/向量库实测)
  - 标签体系的细粒度化

## 2026-07-27 B 方案 restructure | AI/DB 多维分类重组 + 5 个新目录占位

- **目标**:执行"中等重构"——保留现有技术树,扩充 AI 时代分类 + 补 DB/DevOps/Cloud 空白。一阶段 (A) 的目录清理已在上条 commit 完成,本条专注分类重组。
- **AI 重组 (6→11 篇,5 个子目录)**:
  - 新建 `AI/原理/`(6 篇):Transformer / 训练 / 机器学习 / 模型 + 原 `AI/概览.md` 整体移入(283 行原创内容:AI 定义/符号主义 vs 连接主义/感知与决策) + 新写 `知识地图.md`(监督/无监督/强化/训练范式待学清单)
  - 新建 `AI/Agent/`(2 篇):Agent 发展(从原 AI/ 移入) + 新写概览 —— Agent 系统架构
  - 新建 `AI/LLM-应用/`(1 篇):新写概览 —— RAG / Prompt / Function Calling / Embedding / Memory
  - 新建 `AI/AIGC/`(1 篇):新写概览 —— 图像 / 视频 / 音频 / 3D 多模态生成
  - 新建 `AI/向量检索/`(1 篇):新写概览 —— HNSW / IVF / 量化 / 混合检索算法视角
  - `AI/` 顶层原 6 篇 flat 布局 → 5 子目录,语义层级从 1 层升到 2 层
- **DB 扩展 (4→7 篇,3 个新子目录)**:
  - 新建 `DB/SQL/` 概览 —— 关系型数据库、查询优化、事务隔离
  - 新建 `DB/Redis/` 概览 —— 内存数据库、缓存模式、集群
  - 新建 `DB/向量库/` 概览 —— 向量数据库(DB 视角:选型/部署/运维),与 `AI/向量检索/`(算法视角:索引原理/检索 pipeline)互补并双向 wikilink
- **新增 2 个一级分类**:
  - `DevOps/` 概览 —— CI/CD、容器编排、监控、IaC
  - `Cloud/` 概览 —— AWS/GCP/Azure/阿里云、Serverless、CDN
- **AI 编码工程化不动的决定**:Trellis / spec-kit / Ralph / Superpowers 4 篇保留在 `开源项目分析/AI编码工程化/`。它们是"具体的开源项目评估",与"AI 应用原理"无冲突;归类边界遵循 2026-07-19 立定的规则(`AI/` = 原理/概念,`开源项目分析/` = 评估/对比/阅读)
- **关于占位 stub**:5 个新子目录(SQL/Redis/向量库/DevOps/Cloud)+ 4 个 AI 新子目录(LLM-应用/Agent/AIGC/向量检索)各写 1 篇概览页,内含 ① 知识地图 ② TODO 列表(未来要补的关键点) ③ 参考资料链接。**不替用户写实际笔记内容**——stub 是锚点,真实知识靠你自己填
- **向量库 vs 向量检索 双视角策略**:`DB/向量库/` 走"数据库视角"(Milvus/Qdrant 作为产品怎么选/怎么部署);`AI/向量检索/` 走"算法视角"(HNSW/IVF 原理、混合检索、rerank)。两个概览互相 wikilink 标注,避免未来两个目录都长出"重叠"内容
- **更新 AGENTS.md**:总览表 19→22 一级分类(加 Cloud/DevOps,改 AI/DB 文件数),AI 二级子树重写为 5 子目录,DB 二级子树加 3 子目录,新增 DevOps/Cloud 子树,统计 258→268(10 篇新增:5 个新子目录各 1 概览 + AI/原理/知识地图 1 篇,加上原 AI/概览 移入无新增)
- **更新 INDEX.md**:AI 区重写为 5 子分类章节(原理下加知识地图),DB 区补 3 条,新增 Cloud/DevOps 2 个一级章节,页面计数 258→268
- **未做(留给 B 方案后续或 C 方案)**:MOC 多维入口、Zettelkasten 双向链接改造、PARA 的 Projects/Resources 维度、AI 时代深度内容(RAG 实战/Prompt 调优/MCP 协议详解)、向量库实测对比、DevOps/Cloud 实际内容填充

## 2026-07-27 restructure | 清空 ToBeContinue/杂谈,41 篇归位 + 4 个新目录

- **目标**:消除两个"腐烂目录"——`ToBeContinue/`(25 篇未归位)+ `杂谈/`(16 篇杂项)。只搬位置不补内容,空白文章保留待后续填充。
- **删除(1)**: `ToBeContinue/Heap.md` —— 与 `CS/DataStructure/Tree/堆.md` 重复空壳,删
- **新建 4 个目录**:
  - `Security/`(从 杂谈/2FA 验证原理) —— 认证/安全协议
  - `方法论/`(从 杂谈/开源如何保证收入/我的大前端世界观/软件开发周期/面试复习) —— 职业与思维方法
  - `CS/NetWork/Application/实时通信/`(从 ToBeContinue/前后端实时通信) —— 协议族子目录,未来 SSE/WebSocket/MQTT 都进
  - `音视频/流媒体/`(从 ToBeContinue/直播流) —— 协议族子目录,未来 HLS/RTMP/WebRTC 都进
- **CS/Algorithm/(11 新增)**: 二分法 / 单调栈 / 博弈算法 / 多米诺和托米诺平铺 / 子序列问题 / 寻找中位数 / 树状数组 / 格雷码 / 贡献度算法 / 进制转换 / 随机算法
- **CS/Encoding/Base64.md**(从 ToBeContinue/Base64 编码)
- **CS/OS/时区.md**(从 ToBeContinue/时区)
- **JSRuntime/Node.js/ 加 2 篇**: node.js 内存泄漏 / Framework/从 egg-helper 学习 egg 源码
- **Performance/ 加 4 篇**: Chrome 调试 / JS 如何获取精确的时间戳 / Web 截图 / 内存泄漏及排查
- **前端/Javascript/ 加 8 篇**: CJS+ESM+Webpack, Import maps, JSON 和Javascript, Javascript 正则, 大文件如何上传(重命名), 如何处理循环引用, 常见的问题及解决方案, 解决 ESM Import 过多
- **前端/React/ 加 3 篇**: React 事件 / React 的错误捕获 / 为啥 react 没有 keep-alive
- **前端/Typescript/ 加 1 篇**: 从 d.ts 了解 typescript
- **前端/CSS/ 加 1 篇**: 常用的图片格式
- **跨平台/ 加 1 篇**: 网页唤醒本地程序
- **wikilink 替换(2 处)**: `开源项目分析/阅读/htmx-与AI协作的具体案例.md` 中 `[[杂谈/我的大前端世界观|...]]` → `[[方法论/我的大前端世界观|...]]`;`Medal-W-Key-...md` 中 `[[杂谈/解决ESM Import 过多|...]]` → `[[前端/Javascript/解决ESM Import 过多|...]]`
- **更新 INDEX.md**: 全量重写章节(原 ToBeContinue 25 + 杂谈 16 条目移除,新 4 个一级分类 + 新归属条目加入),页面总数 258 不变
- **更新 AGENTS.md**: 总览表 17→19 一级分类(删 ToBeContinue/杂谈,加 Security/方法论),CS 27→41 / JSRuntime 20→22 / Performance 2→6 / 前端 41→54 / 跨平台 14→15 / 音视频 1→2,二级子树同步更新
- **更新 SCHEMA.md**: Tag Taxonomy 补 `methodology` 和 `security` 两个一级标签
- **决定记录**:实时通信/直播流走"建协议族子目录"而非"塞进现有大类",理由——这两类未来大概率扩成多篇(WebSocket/SSE/HLS/RTMP),子目录比同层多文件可扩展
- **后续工作(B 方案候选)**: 补 AI 时代分类(RAG/Prompt/Function Calling/Agent/MCP)、DB 类(SQL/Redis/向量库)、DevOps/Security 充实,本次未动

## 2026-07-27 ingest | 收录 htmx 与 AI 协作的具体案例

- 新增 `开源项目分析/阅读/htmx-与AI协作的具体案例.md` — htmx 作者 Carson Gross 2026-06-29 essay,完整记录用 Claude 修 hyperscript parser bug 的 4 步迭代(3 个失败/不完美方案 + 1 个最终方案)
- 核心论点:**AI 强在调查 + 测试生成,弱在方案设计** —— 3 个被否方案的共同模式:①先 stringLike fallback(局部 hack,不通类)②全局 noConversions flag(方向错,误伤 go 命令)③follows 思路在共享方法里 over-broad 应用
- 最终修复精髓:把 `pushFollow("as") / popFollow()` 作用域精确圈在 `FetchCommand.parse()` 内,而不是共享的 `parseURLOrExpression()` —— 上下文敏感性的作用域最小化
- 反直觉观点:**"技术债按指数增长"**(作者自承无证据,来自一个梦);**"骄傲于不理解代码"是失控不是炫技** —— 与 vibe coding 叙事的根本对立
- 方法论提炼:"调查+测试"两段委派,"方案"必须自己定;AI 测试生成有隐藏价值(作者明确说"比我自己能写的更全")
- 横向对比:本文是"实践派+怀疑派"立场,与 vibe coding 派(信任 AI 不必理解)/纯否定派(DHH 风格)三分天下,领域当前主流是"AI 全流程代理",本文属于"早期老炮的清醒"逆主流
- 4 个参考 wikilink:Hermes-Kanban/Superpowers/Ralph/Medal-W-Key/杂谈·大前端世界观 —— 把同立场(谨慎用 AI)、同论断(技术债严控)、同主题(人+agent 协作)的相关条目串起来
- 更新 `AGENTS.md`:总览表文件数 14→15,`阅读/` 子目录树新增第 5 条,路径示例新增,统计 257→258(总 258→259)
- 更新 `INDEX.md`:开源项目分析区"阅读"组末尾新增 htmx 条目,页面计数 258→259,日期 2026-07-22→2026-07-27

## 2026-07-22 ingest | 收录 Ralph Autonomous AI Coding Loop

- 新增 `开源项目分析/AI编码工程化/Ralph-Autonomous-AI-Coding-Loop.md` — snarktank/ralph 自主 AI 编码循环,120 行 bash 循环 + PRD 拆 story + 每轮 fresh context,21.2K Stars
- 核心机制:**`grep "<promise>COMPLETE</promise>"` 当退出协议**,不解析 JSON,纯字符串匹配 — "对 AI 输出最不信任"的设计
- 跨 session 记忆三层:git history(代码) + prd.json(任务状态) + progress.txt(append-only 学习笔记) + 各目录 CLAUDE.md/AGENTS.md(项目惯例)
- 故事硬性约束:必须能塞进单个 context window;2-3 句说不清 = 太大;依赖先于被依赖(schema → backend → UI → dashboard)
- 自动归档:`branchName` 变化时 cp 上一轮 prd.json + progress.txt 到 `archive/YYYY-MM-DD-feature-name/`
- 与同赛道 3 兄弟对比:Ralph 是"session-less 派"(每轮全新实例),Trellis/spec-kit/Superpowers 是"session 内编排派"(同会话跑完)
- 选型建议:**只推荐给已具备 typecheck+test 强 feedback loop + 能拆 N 个独立可验故事的 feature 团队**
- 更新 `AGENTS.md`:总览表文件数 13→14,`AI编码工程化/` 子目录树新增第 4 条,路径示例新增,统计 256→257(总 257→258)
- 更新 `INDEX.md`:开源项目分析区新增 Ralph 条目,页面计数 257→258

## 2026-07-22 ingest | 收录 Medal W-Key 前端基础设施现代化复盘

- 新增 `开源项目分析/阅读/Medal-W-Key-前端基础设施现代化复盘.md` — Medal.tv Rick Zhang 的 Electron+Web 前端 Macro→Micro 现代化路径总结,renderer bundle 从 ~44MB 减到 2.7MB(减 94%)
- 核心论点:**先动基础设施(Macro),再让组件现代化(Micro)水到渠成** —— 关键动作是 PNPM monorepo + Vite/HMR + 规范化 import 路径(禁用 barrel)
- Bundle 减重数据(单项):删 component barrel -2.6MB / 外置 .wav -3.4MB / ESM 优先 -4MB / 动态 import i18n -13MB(最大) / 路由级 code split -5.4MB
- 讨论沉淀(独立小节):barrel file 为什么默认禁用、为什么 lodash-es 能保持 tree-shake(5 个条件表)、库 vs 业务的分离策略(桶用 vs 禁用)、单业务"通用组件库"的第三条路(Shadcn 模式)、自建 npm 组件库的硬性配置清单
- 反直觉观点:Bundle 优化最大单一来源不是 minify/gzip,而是动态 import 大文件;i18n 占减量三分之一
- 更新 `AGENTS.md`:总览表文件数 12→13,`阅读/` 子目录树新增 4 条(原 1 条),路径示例新增,统计 255→256
- 更新 `INDEX.md`:开源项目分析区新增 Medal 条目,页面计数 256→257,日期 2026-07-19→2026-07-22

## 2026-07-19 restructure | 规范 AI 与 开源项目分析 归类边界，迁移 2 篇分析类文章

- **新归类规则**：
  - `AI/` = AI 底层原理、核心概念、知识图谱（Transformer、机器学习、Agent 架构演进等）
  - `开源项目分析/阅读/` = 分析性质 / 阅读性质的文章（含公众号文章总结、横向对比、自我体系对比）
- 移动 `AI/1688-Multi-Agent超级组织实践.md` → `开源项目分析/阅读/`（公众号文章分析）
- 移动 `AI/Hermes-Kanban多Profile持久化工作流与SubAgent对比.md` → `开源项目分析/阅读/`（自我体系对比）
- 保留 `AI/Agent发展.md`（AI 架构演进知识图谱，属核心概念）
- 保留 `AI/概览.md`、`AI/Transformer.md`、`AI/训练.md`、`AI/模型.md`、`AI/机器学习.md`（均为 AI 原理/概念）
- 更新 `AGENTS.md`：总览表 AI 8→6 且改"内容"列说明，目录树删除 2 条移走的文件
- 更新 `INDEX.md`：AI 区删除 2 条；开源项目分析区新增 2 条到 `阅读/` 子目录
- 更新 `SCHEMA.md`：新增"AI 与 开源项目分析 归类边界"规则小节

## 2026-07-19 ingest | 收录 Hermes Kanban 多 Profile 工作流与 SubAgent 对比

- 新增 `AI/Hermes-Kanban多Profile持久化工作流与SubAgent对比.md` — 对比 Hermes Kanban 多 Profile 持久化工作流与 Claude Code / OpenCode SubAgent，覆盖生命周期、专业化方式、任务心智模型、隔离粒度、调度能力等 5 个维度
- 核心论点：CC/OpenCode SubAgent 是"session 内临时工"，Hermes Kanban 是"多 Profile 持久化工作流"，两者面向不同需求层次
- 适用场景决策表：临时研究用 CC/OpenCode，长期固化工作流（PM/Coder/QA 接力 + cron 调度）用 Hermes Kanban
- 更新 `AGENTS.md`：AI 文件数 7→8，目录树新增条目，统计 253→254
- 更新 `INDEX.md`：AI 区新增条目，页面计数 255→256

## 2026-07-19 ingest | 收录 Trellis 与 spec-kit，AI 编码工程化方向

- 新增 `开源项目分析/AI编码工程化/Trellis-AI编码工程框架.md` — mindfold-ai/Trellis 跨平台 AI Coding Agent Harness,4 阶段循环(Plan→Implement→Verify→Finish)+ spec 学习闭环 + 17 平台适配器,12.8K Stars,AGPL-3.0
- 新增 `开源项目分析/AI编码工程化/spec-kit-GitHub官方规范驱动开发.md` — github/spec-kit 官方 Spec-Driven Development 工具集,5 个 slash command(constitution→specify→plan→tasks→implement),122K Stars,MIT
- 两份均含完整的"Trellis vs spec-kit"双向对比小节(规模、本质、流程、Spec 演进、多平台、工作记忆、协议等)
- 新建 `AI编码工程化/` 子目录,归类 spec-driven / agent harness 类 AI 编码工具
- 更新 `AGENTS.md`:总览表文件数 8→10,目录树新增子目录,路径示例新增,统计 251→253
- 更新 `INDEX.md`:开源项目分析区新增 2 条目,页面计数 253→255,日期 2026-07-17→2026-07-19

## 2026-07-19 ingest | 收录 Superpowers — AI 编码工程师方法论与 Skills 框架

- 新增 `开源项目分析/AI编码工程化/Superpowers-AI编码工程师方法论与Skills框架.md` — obra/superpowers 完整 AI 编码工程师方法论,13+ composable skills 自动触发,TDD/code review/verification 强约束,257K Stars,MIT
- 通过各 agent 官方 plugin marketplace 安装(Claude Code/Codex/Cursor/OpenCode/Pi/Kimi/Copilot CLI/Factory Droid/Antigravity),定位是"完整的工程师"而非代码生成器
- 与同目录 Trellis、spec-kit 形成"工程化框架"三角:Superpowers(方法论+skills)/ Trellis(harness 循环+多平台)/ spec-kit(规范驱动+slash command)
- 更新 `AGENTS.md`:总览表文件数 11→12,`AI编码工程化/` 目录树新增条目,路径示例新增,统计 254→255
- 更新 `INDEX.md`:开源项目分析区新增条目,页面计数 256→257

## 2026-07-17 fix | 修复 INDEX.md / AGENTS.md / SCHEMA.md 元文件一致性

- 修复 INDEX.md：Claude-Design-System-Prompt 路径从根目录更正为 `提示词工程/` 子目录
- 修复 SCHEMA.md：`devops` 标签目录从过时的 `Utils/` 更正为 `开发工具链/`
- 修复 AGENTS.md：更新所有分类文件数（7 个分类有误），补充缺失的文件条目，总计 ~204 → ~251
- 补充 AGENTS.md Books/ 目录树：添加 `Books of Shader.md`
- 补充 AGENTS.md Graphics/Three 目录树：添加 `Extras.md`
- 补充 AGENTS.md 前端目录树：添加 `React/FAQ.md`、`Typescript/tsconfig.md`
- AGENTS.md 统计行从 ~204 更新为 ~251

## 2026-07-17 ingest | 收录 CodeGraph vs GitNexus vs Code Review Graph 横向对比

- 新增 `开源项目分析/AI代码智能/CodeGraph-vs-GitNexus-vs-CodeReviewGraph-代码智能工具横向对比.md` — AI 代码智能工具三大项目全面对比，覆盖基础信息、Agent 支持、MCP 工具、特色功能、选型建议
- 新建 `AI代码智能/` 子目录，归类 AI 代码理解/代码智能类开源工具
- 更新 `AGENTS.md`：总览表文件数 7→8，目录树新增子目录，路径示例新增，统计 203→204
- 更新 `INDEX.md`：开源项目分析区新增条目，页面计数 252→253

## 2026-07-09 init | 初始化 LLM Wiki 结构

- 创建 `SCHEMA.md` — 知识库规则、约定和标签分类
- 创建 `INDEX.md` — 全站内容目录（244 个页面，16 个分类），因与 Astro 的 `index.mdx` slug 冲突，实际命名为 `INDEX.md`（后移至根目录）
- 创建 `CHANGELOG.md` — 操作日志（原 `log.md`，后移至根目录并重命名）
- 知识库路径：`/home/keven/codes/github/knowledge-base-system/src/content/docs/`
- 背景：已有 16 个分类的手写知识库，通过 Astro Starlight 构建为静态站点
- 本次操作仅新增 3 个文件，未修改原有内容，Astro 构建不受影响

## 2026-07-09 restructure | 将元文件移至项目根目录

- 将 `src/content/docs/index.md` → `INDEX.md`（移至根目录）
- 将 `src/content/docs/log.md` → `CHANGELOG.md`（移至根目录并重命名）
- 将 `src/content/docs/SCHEMA.md` → `SCHEMA.md`（移至根目录）
- 原因：这些是项目元文件，放在 docs 目录下不合适

## 2026-07-10 ingest | 收录 Stagehand + Tools 子目录重组

- 新增 `Tools/AI浏览器自动化/Stagehand-AI浏览器自动化框架.md` — Stagehand AI 浏览器自动化框架分析报告
- 重组 Tools/ 目录结构：同一类型工具放入对应子目录（`AI浏览器自动化/`、`自托管书签/`），便于同类工具集中查阅
- 更新 `AGENTS.md`：一级分类表、二级目录树、路径示例、统计计数
- 更新 `INDEX.md`：新增 Tools 章节，收录 Karakeep（补录）和 Stagehand，页面计数 244→246
- 更新 `learning-summary` skill（v3.0.0→v3.1.0）：保存流程中加入 Tools 子目录分组规则和 INDEX.md 更新步骤

## 2026-07-10 restructure | Utils → 开发工具链, Tools → 开源项目分析

- 重命名 `Utils/` → `开发工具链/`（Git/Playwright/Puppeteer 的使用笔记）
- 重命名 `Tools/` → `开源项目分析/`（开源项目评估选型报告）
- 更新 `AGENTS.md`：总览表、目录树、路径示例全部换名
- 更新 `INDEX.md`：章节名、Wiki 链接路径全部换名
- 明确两目录定位：`开发工具链/` = 工具使用笔记, `开源项目分析/` = 项目评估报告

## 2026-07-14 restructure | 重组 Claude Design System Prompt 分类 + 新建 阅读/ 子目录$$

- 将 `AI/Claude-Design-System-Prompt-逆向工程的设计协作提示词库.md` 移至 `开源项目分析/`（它是开源项目，不属于 AI 知识）
- 新建 `开源项目分析/阅读/` 子目录，后续文章类分析归入此处
- 更新 `AGENTS.md`：AI 文件数 8→7，开源项目分析 3→4，目录树更新
- 更新 `INDEX.md`：AI 区移除、开源项目分析区新增条目（页数保持 249）

## 2026-07-14 ingest | 收录 Claude Design System Prompt — 逆向工程设计协作提示词库

- 新增 `AI/Claude-Design-System-Prompt-逆向工程的设计协作提示词库.md` — 逆向工程自 Anthropic Claude Design 的系统提示词 + 14 个设计技能库，1700+ Stars
- 更新 `AGENTS.md`：AI 文件数 7→8，目录树新增条目
- 更新 `INDEX.md`：AI 区新增条目，页面计数 248→249

## 2026-07-15 ingest | 收录 Harness Engineering — 数据研发 Multi-Agent 架构实践

- 新增 `开源项目分析/阅读/Harness工程-Multi-Agent架构实践.md` — 阿里技术团队 Harness Engineering 文章总结，涵盖三大分层六大支柱
- 更新 `AGENTS.md`：总览表文件数 4→5，阅读子目录新增条目，统计 200→201
- 更新 `INDEX.md`：开源项目分析区新增条目，页面计数 249→250

## 2026-07-15 ingest | 收录 Open Code Review — 阿里 AI 代码审查工具

- 新增 `开源项目分析/AI代码审查/Open-Code-Review-阿里AI代码审查工具.md` — 阿里开源 AI 代码审查 CLI 工具，确定性工程 × Agent 混合驱动，10.5K Stars
- 创建 `AI代码审查/` 子目录，归类 AI 代码审查类开源工具
- 更新 `AGENTS.md`：总览表文件数 6→7，目录树新增子目录，路径示例更新，统计 202→203
- 更新 `INDEX.md`：开源项目分析区新增条目，页面计数 251→252

## 2026-07-15 ingest | 收录 dependency-cruiser — JS/TS 依赖分析与架构治理工具

- 新增 `开源项目分析/依赖分析工具/dependency-cruiser-JS依赖分析和架构治理工具.md` — dependency-cruiser 可编程规则引擎，6,934 Stars
- 创建 `依赖分析工具/` 子目录，归类代码质量/架构治理类开源工具
- 更新 `AGENTS.md`：总览表文件数 5→6，目录树新增子目录，统计 201→202
- 更新 `INDEX.md`：开源项目分析区新增条目，页面计数 250→251

## 2026-07-14 ingest | 收录 1688 Multi-Agent 超级组织实践

- 新增 `AI/1688-Multi-Agent超级组织实践.md` — 1688 数据中心 Multi-Agent 研发小队实录，涵盖 KST 知识工程、Harness/Loop Engineering、Squad 协作模式
- 更新 `AGENTS.md`：AI 文件数 5→7，目录树新增 Agent 发展.md 和 1688-Multi-Agent 超级组织实践.md，总计 ~200
- 更新 `INDEX.md`：AI 区新增条目，页面计数 247→248

## 2026-07-13 ingest | 收录 Honcho — Agent 记忆基础设施分析

- 新增 `开源项目分析/AI记忆基础设施/Honcho-Agent记忆基础设施.md` — Honcho Agent 记忆基础设施深度分析
- 创建 `AI记忆基础设施/` 子目录，归类 Agent 记忆类开源工具
- 更新 `AGENTS.md`：总览表（文件数 2→3）、目录树新增子目录、路径示例、统计 198→199
- 更新 `INDEX.md`：新增 Honcho 条目，页面计数 246→247
