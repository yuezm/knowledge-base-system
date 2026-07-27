---
title: knowledge-base-system
description: 知识库自指——本页所在项目
sidebar:
  order: 4
tags: [project, knowledge-base, self-reference]
status: active
---

# knowledge-base-system

> **自指**——本页所在的项目。

## 项目基本信息

| 项 | 值 |
| --- | --- |
| **项目名** | knowledge-base-system |
| **本地路径** | `/home/keven/codes/github/knowledge-base-system` |
| **类型** | Astro Starlight 静态站点 |
| **目标** | 个人技术知识库(从"技术博客"升级到"知识库") |

## 一句话介绍

用 Astro Starlight 构建的**个人知识库静态站点**。从最初的"按主题分类的技术博客"逐步演化为有 **MOC / PARA / 双向链接** 的真正知识库。

## 关键文件

- **`AGENTS.md`** — 知识库路由(给 AI agent 用的入口)
- **`INDEX.md`** — 全站内容目录(给人看的)
- **`CHANGELOG.md`** — 操作日志(append-only)
- **`SCHEMA.md`** — 标签体系 / 归类规则 / YAML frontmatter 规范
- **`src/content/docs/`** — 所有知识库内容

## 当前规模

- 一级分类:22 个(含 DevOps/Cloud,2026-07-27 B 方案)
- 总文件:268 个 .md (2026-07-27 B 方案后)
- MOC 入口:6 个 (2026-07-27 C 方案)
- 独立项目指针:4 个 (sa_protocol_library / sagc-new-usoa / awesome-toys / 自指)

## 知识库维护硬性规约

> 每次保存都要更新 3 处索引——`AGENTS.md` / `INDEX.md` / `CHANGELOG.md`,漏一步会被立刻指出。

## 演进历史

- **2026-07-09** — 初始化 LLM Wiki 结构
- **2026-07-10** — Tools 重组,Utils → 开发工具链
- **2026-07-14** — 重组 Claude Design + 新建 阅读/ 子目录
- **2026-07-19** — 规范 AI 与 开源项目分析 归类边界
- **2026-07-27 A** — 清空 ToBeContinue/杂谈,41 篇归位
- **2026-07-27 B** — AI/DB 多维分类重组,DevOps/Cloud 新增
- **2026-07-27 C** — MOC + PARA(项目/资源/归档) + 双向链接脚本(本条)

## 怎么跳到项目

```bash
cd /home/keven/codes/github/knowledge-base-system
cat AGENTS.md
pnpm dev            # 启动 Astro 预览
bash scripts/related.sh   # 生成反向链接索引
```
