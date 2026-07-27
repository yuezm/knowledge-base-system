---
title: 知识库总入口
description: 个人知识库 MOC of MOCs —— 所有主题地图的入口
sidebar:
  order: 0
tags: [moc, index]
---

# 知识库总入口

> 这是个人知识库的**总地图**。从这里进入各个主题的 MOC(Map of Content)。
>
> 知识库规则:**现有笔记不拆不迁,只加 MOC 入口和双向链接**。新建笔记必须一概念一页 + 至少 2 个 `[[wikilink]]` 引用。

## 主题地图(MOC)

### 核心知识

- [[00-MOC/AI-技术树|AI 技术树]] — 原理 / LLM 应用 / Agent / AIGC / 向量检索
- [[00-MOC/前端-技术树|前端技术树]] — React / Vue / TS / JS / CSS / HTML / 动画
- [[00-MOC/Graphics-技术树|Graphics 技术树]] — Three.js / Babylon / WebGL / WebGPU
- [[00-MOC/GIS-技术树|GIS 技术树]] — Cesium / Leaflet / 3D Tiles

### 工作流与项目

- [[00-MOC/工作流与项目|工作流与项目]] — 独立代码项目 / 工具资源 / 归档

## 维度入口(PARA)

- **[[10-项目/knowledge-base-system|项目]]** — 正在做的独立 git 项目指针(sa_protocol_library / sagc-new-usoa / awesome-toys / 知识库自指)
- **[[20-资源/AI-工具|资源]]** — 工具/库/参考索引(AI 工具 / 前端工具 / 命令行工具)
- **[[30-归档/README|归档]]** — 过时/废弃内容(待补)

## 元文件

- [AGENTS.md](https://github.com/...) — 知识库路由/约定
- [INDEX.md](https://github.com/...) — 全站内容目录
- [CHANGELOG.md](https://github.com/...) — 操作日志
- [SCHEMA.md](https://github.com/...) — 标签体系与归类规则

## 如何使用

1. **找内容**:从上方 MOC 入口进入 → 找到目标主题的"地图页" → 地图页里点 wikilink 进入具体笔记
2. **写新笔记**:
   - 位置:放对应主题分类下(如 `AI/Agent/`、`前端/React/`)
   - 命名:**一概念一页**,用 `RAG.md` 而不是 `RAG-完整指南.md`
   - frontmatter:加 `related: [path/to/note]` 字段列 2-5 个相关笔记
   - 必加至少 2 个 `[[wikilink]]` 引用现有笔记
3. **生成反向链接**:在仓库根跑 `bash scripts/related.sh` 生成 `_backlinks/` 反向链接索引
