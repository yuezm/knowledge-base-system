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
