---
title: sagc-new-usoa
description: 无人机地面站——独立 git 项目指针
sidebar:
  order: 2
tags: [project, drone, gcs, electron]
---

# sagc-new-usoa

> **独立 git 项目,不在知识库仓库内**。

## 项目基本信息

| 项 | 值 |
| --- | --- |
| **项目名** | sagc-new-usoa (UAV Ground Control Station) |
| **本地路径** | `/home/keven/codes/sagc-new-usoa` |
| **状态** | 活跃开发中 |
| **类型** | Electron 桌面应用 |

## 一句话介绍

无人机地面站:任务规划、飞行监控/回放、连接/通用设置。

## 技术栈

- Electron + React 18 + Redux Toolkit
- Vite + Vitest
- Leaflet / Cesium / Turf (地图)
- pnpm (必须用 pnpm,不用 npm/yarn)

## 核心模块

- 任务规划 (mission planning)
- 飞行监控 + 回放
- 连接管理 (websocket / utility 进程)
- 实时数据订阅(`realtime-subscription` 协议)

## 知识库中相关笔记

- [[00-MOC/GIS-技术树|GIS 技术树]] — 用到 Cesium/Leaflet
- [[跨平台/Electron/Electron 优化|Electron 优化]]
- [[跨平台/Electron/工具/工具|Electron 工具]]
- [[跨平台/Electron/工具/日志|日志]]
- [[跨平台/Electron/FAQ|Electron FAQ]]
- [[方法论/软件开发周期|软件开发周期]]

## 关键规范

- **Core Principles**:`使用简体中文进行回答`、`MUST validate all external data at system boundaries`、禁止猜架构
- **Spec-Driven Delivery**:无 spec 不写代码,改 spec 必须先升版本号
- **Git Safety**:禁 `push --force`、禁 `commit --amend` 后 push、禁 `--no-verify`

## 怎么跳到项目

```bash
cd /home/keven/codes/sagc-new-usoa
cat AGENTS.md                 # 项目规范
cat docs/knowledge/index.md   # 项目知识索引
pnpm install
pnpm dev
```

## 相关背景

- `sagc-450-usoa` / `sagc-map-demo` / `sagc-mavlink` 是历史版本/子项目,目前不在活跃开发
