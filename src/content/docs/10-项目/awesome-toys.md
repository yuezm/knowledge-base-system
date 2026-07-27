---
title: awesome-toys
description: 个人工具集合——独立 git 项目指针
sidebar:
  order: 3
tags: [project, electron, tools]
status: active
---

# awesome-toys

> **独立 git 项目,不在知识库仓库内**。个人工具集合的 monorepo。

## 项目基本信息

| 项 | 值 |
| --- | --- |
| **项目名** | awesome-toys |
| **本地路径** | `/home/keven/codes/github/awesome-toys` |
| **状态** | 活跃开发中 |
| **类型** | Electron monorepo (pnpm workspaces) |

## 一句话介绍

**一个家族,不是单个 App**——根据工具特点选择最合适的形态交付:Electron 桌面 / 浏览器扩展 / 未来其他形态。

## 形态分布

```
awesome-toys/
├── apps/
│   ├── toys-app/      # Phase 1 主入口,Electron + Vite + React
│   └── browser-ext/   # 浏览器相关工具
├── packages/
│   ├── ui/            # Glass 组件库
│   └── data/          # 共享 SQLite 封装
├── DESIGN.md          # 设计规范
└── design_tokens.json # 设计 token
```

## 设计语言

- **Design system**:Atmospheric Glass(玻璃拟态)
- **设计 tokens**:`design_tokens.json`(已就位)
- **强约束**:组件必须复用 token,禁止写死颜色/圆角/间距
- **背景**:多彩渐变(深蓝 #1E3A8A / 紫 #7E22CE / 粉 #DB2777)
- **字体**:Inter,**基准网格**:8px

## 技术栈

- TypeScript(严格模式)+ React 18 + Vite 5
- Electron 31 + electron-builder
- Tailwind 3 + design tokens
- pnpm(workspaces)
- 数据持久化:共享 SQLite
- 本地存储:IndexedDB

## 知识库中相关笔记

- [[跨平台/Electron/Electron 优化|Electron 优化]]
- [[跨平台/Electron/FAQ|FAQ]]
- [[前端/React/Hooks|React Hooks]]
- [[前端/CSS/CSS|CSS]]

## 怎么跳到项目

```bash
cd /home/keven/codes/github/awesome-toys
cat AGENTS.md         # 项目规范
cat DESIGN.md         # 设计规范
pnpm install
pnpm dev
```
