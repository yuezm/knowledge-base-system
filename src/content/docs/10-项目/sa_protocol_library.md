---
title: sa_protocol_library
description: 无人机地空协议管理中心——独立 git 项目指针
sidebar:
  order: 1
tags: [project, drone, protocol]
---

# sa_protocol_library

> **独立 git 项目,不在知识库仓库内**。本页是知识库中的指针页,方便从笔记链回项目。

## 项目基本信息

| 项 | 值 |
| --- | --- |
| **项目名** | SA Protocol Library |
| **本地路径** | `/home/keven/codes/sa_protocol_library` |
| **当前版本** | 1.3.0 (8f1d26d) |
| **状态** | 活跃开发中 |
| **类型** | Web 应用 (FastAPI + Vue 3) |

## 一句话介绍

把多套无人机地空通信协议(指令 + 遥测)从 Excel 结构化入库,支持浏览/编辑、权限管理、字段级变更日志、Excel/Word 导出。

## 模块

- **后端** (`backend/`) — FastAPI + SQLAlchemy 2.0 + SQLite
- **前端** (`frontend/`) — Vue 3 + Vite + Element Plus + Pinia + Tailwind v4

## 核心领域逻辑

- **两段式变换** (raw → eng → dli):`docs/knowledge/domain-two-stage-transform.md`、设计文档 §7
- **权限模型** (`view < edit < manage`):`docs/knowledge/domain-permission-model.md`
- **Excel 导入/导出** (故意不对称:导入 = 离线脚本,导出 = 在线服务):`docs/knowledge/excel-import-export.md`

## 知识库中相关笔记

- [[方法论/软件开发周期|软件开发周期]] — 项目涉及的方法论
- [[前端/Vue/组件|Vue 组件]] — 前端栈相关

## 怎么跳到项目

```bash
cd /home/keven/codes/sa_protocol_library
cat README.md                 # 启动说明
cat docs/specs/总体设计文档.md  # 权威设计文档
```

## 默认账号

`admin` / `admin123`(首次 init_db 创建)
