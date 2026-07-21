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

## 2026-07-14 restructure | 重组 Claude Design System Prompt 分类 + 新建 阅读/ 子目录

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
- 更新 `AGENTS.md`：AI 文件数 5→7，目录树新增 Agent发展.md 和 1688-Multi-Agent超级组织实践.md，总计 ~200
- 更新 `INDEX.md`：AI 区新增条目，页面计数 247→248

## 2026-07-13 ingest | 收录 Honcho — Agent 记忆基础设施分析

- 新增 `开源项目分析/AI记忆基础设施/Honcho-Agent记忆基础设施.md` — Honcho Agent 记忆基础设施深度分析
- 创建 `AI记忆基础设施/` 子目录，归类 Agent 记忆类开源工具
- 更新 `AGENTS.md`：总览表（文件数 2→3）、目录树新增子目录、路径示例、统计 198→199
- 更新 `INDEX.md`：新增 Honcho 条目，页面计数 246→247
