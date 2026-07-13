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

## 2026-07-13 ingest | 收录 Honcho — Agent 记忆基础设施分析

- 新增 `开源项目分析/AI记忆基础设施/Honcho-Agent记忆基础设施.md` — Honcho Agent 记忆基础设施深度分析
- 创建 `AI记忆基础设施/` 子目录，归类 Agent 记忆类开源工具
- 更新 `AGENTS.md`：总览表（文件数 2→3）、目录树新增子目录、路径示例、统计 198→199
- 更新 `INDEX.md`：新增 Honcho 条目，页面计数 246→247
