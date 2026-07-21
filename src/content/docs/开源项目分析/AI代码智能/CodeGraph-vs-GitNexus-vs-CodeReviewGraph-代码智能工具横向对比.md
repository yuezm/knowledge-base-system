---
title: CodeGraph vs GitNexus vs Code Review Graph — 代码智能工具横向对比
description: AI 编码助手代码理解赛道三大热门开源项目全面对比：CodeGraph (60K Stars)、GitNexus (44K)、Code Review Graph (19K)
---

本文对当前 AI 编码辅助领域最热门的三个代码智能/知识图谱工具进行全方位横向对比，帮助你在选型时做出判断。

> 分析日期：2026-07-17 | 基于三个项目最新版本

## 基础信息

| 维度        | CodeGraph                    | GitNexus                      | Code Review Graph    |
| ----------- | ---------------------------- | ----------------------------- | -------------------- |
| ⭐ Stars    | **60,463**                   | **44,248**                    | 19,575               |
| 🍴 Forks    | 3,779                        | 4,916                         | 2,094                |
| 🛠 语言     | TypeScript 93%               | TypeScript 96%                | **Python 92%**       |
| 📜 License  | ✅ **MIT**                   | ⚠️ **PolyForm Noncommercial** | ✅ **MIT**           |
| 🗓 创建     | 2026-01-18                   | 2025-08-02                    | 2026-02-26           |
| 📦 最新版   | v1.4.1                       | 持续更新                      | v2.3.6               |
| 💾 存储引擎 | SQLite (node:sqlite)         | **LadybugDB**（自研）         | SQLite (FTS5)        |
| 🏗 解析引擎 | tree-sitter (WASM)           | tree-sitter (原生 + WASM)     | tree-sitter (Python) |
| 👤 作者     | Colby McHenry                | Abhigyan Patwari / Akon Labs  | Tirth Patel          |
| 💰 商业模式 | 免费 + 托管平台(Coming Soon) | **开源核心 + 企业版/SaaS**    | 纯免费               |
| 🔄 活跃度   | 极高（几乎日更）             | 极高（几乎日更）              | 高                   |

## 支持 Agent 覆盖

| Agent               | CodeGraph | GitNexus             | CRG                |
| ------------------- | --------- | -------------------- | ------------------ |
| Claude Code         | ✅        | ✅ (+ hooks)         | ✅                 |
| Cursor              | ✅        | ✅ (+ hooks)         | ✅                 |
| Codex CLI           | ✅        | ✅ (+ plugins/hooks) | ✅                 |
| OpenCode            | ✅        | ✅                   | ✅                 |
| Hermes Agent        | ✅        | —                    | ✅                 |
| Gemini CLI          | ✅        | ⚠️ (Antigravity)     | ✅                 |
| Antigravity         | ✅        | ✅ (+ hooks)         | ✅                 |
| Kiro                | ✅        | —                    | ✅                 |
| Windsurf            | —         | ✅                   | ✅                 |
| Zed                 | —         | —                    | ✅                 |
| Continue            | —         | —                    | ✅                 |
| GitHub Copilot      | —         | —                    | ✅ (CLI + VS Code) |
| Qwen/Qoder          | —         | ✅                   | ✅                 |
| CodeBuddy (Tencent) | —         | ✅                   | —                  |
| **总数**            | **8**     | **8+**               | **13+**            |

## MCP 工具能力

| 能力        | CodeGraph          | GitNexus             | CRG                      |
| ----------- | ------------------ | -------------------- | ------------------------ |
| MCP 工具数  | 核心 3-5 个        | **17 个**            | 10+ 个                   |
| 源码浏览    | ✅ 符号+调用链     | ✅ 360° 符号视图     | ✅ 影响面分析            |
| 搜索        | 符号名精确搜索     | BM25+语义+RRF 混合   | FTS5+可选向量            |
| 影响面分析  | ✅ impact radius   | ✅ 多深度分组+置信度 | ✅ blast radius+风险评分 |
| 代码审查    | —                  | ✅ detect_changes    | ✅ **专为 Review 设计**  |
| 执行流追踪  | ✅ explore-flow    | ✅ trace + process   | ✅ flow detection        |
| 重命名      | —                  | ✅ 多文件协调        | ✅ rename preview        |
| Cypher 查询 | —                  | ✅ 原生              | —                        |
| 架构图生成  | ✅ context builder | ✅ generate_map      | ✅ wiki generation       |
| PR 自动审查 | —                  | —                    | ✅ **GitHub Action**     |
| 自定义语言  | —                  | —                    | ✅ languages.toml        |

## 特色功能对比

| 功能               | CodeGraph                  | GitNexus                      | Code Review Graph              |
| ------------------ | -------------------------- | ----------------------------- | ------------------------------ |
| **Web UI**         | ❌                         | ✅ 完整浏览器图浏览           | ✅ D3.js 可视化                |
| **动态分发追踪**   | ✅ React/EventEmitter/回调 | —                             | —                              |
| **社区检测**       | —                          | ✅ **Leiden 算法** + 自动拆分 | ✅ Leiden 聚类                 |
| **嵌入/向量搜索**  | ❌                         | ✅ onnxruntime                | ✅ sentence-transformers       |
| **CI/CD 集成**     | —                          | —                             | ✅ **原生 GitHub Action**      |
| **图导出**         | —                          | —                             | ✅ GraphML/Obsidian/SVG/Cypher |
| **Token 节省估算** | —                          | —                             | ✅ context_savings metadata    |
| **框架感知路由**   | ✅ 15+ 框架                | ✅ route_map 工具             | ⚠️ 有限(Python 为主)           |
| **Agent hooks**    | —                          | ✅ PreToolUse+PostToolUse     | ✅ 支持                        |
| **多仓库**         | ⚠️ projectPath             | ✅ 注册表+跨库链接            | ✅ daemon                      |
| **安装方式**       | `curl install.sh \| sh`    | `npm i -g` / `npx`            | `pip install`                  |
| **需 Node.js?**    | ❌ (自带 runtime)          | ✅ 需要 Node ≥20              | ❌ (Python)                    |

## 核心定位差异

**CodeGraph** — 最低延迟的 Agent 加速器

- 核心理念: 让 agent 读到代码时就是精确的
- 最独特: 动态分发合成（React re-render→JSX child 完整链路追踪）
- 深度 dogfooding，对 agent 行为理解极其深刻
- 适合: 追求 agent 速度和 tool call 压减的用户

**GitNexus** — 最全能的代码智能平台

- 核心理念: Precomputed Relational Intelligence
- 最独特: 17 个 MCP 工具、Web UI、Leiden 社区检测、嵌入搜索
- Agent hooks 深度集成（PreToolUse 自动注入图上下文）
- ⚠️ 注意: PolyForm Noncommercial 许可，个人/非商业免费，商用需企业版
- 适合: 需要全功能代码分析平台、喜欢 Web UI + CLI 双模式

**Code Review Graph** — Code Review 专用工具

- 核心理念: 专为 Code Review 场景优化
- 最独特: GitHub Action 自动 PR 审查、Token 节省面板、13+ Agent 支持
- 自定义语言无需 fork
- 适合: 团队需要自动化 Code Review、Python 技术栈

## 选型建议

- ✅ **选 CodeGraph 当**: 要最轻量、最快，不需要多余功能，追求 agent 响应速度
- ✅ **选 GitNexus 当**: 要功能最全，需要 Web UI 辅助浏览，个人/非商业用途
- ✅ **选 CRG 当**: Python 技术栈、需要 CI/CD 自动 Code Review、要量化 token 节省数据
- ✅ **选 GitNexus 企业版 当**: 商用场景需要全功能，愿意付费
- ✅ **复数部署 当**: 三个可以同时用，它们互不冲突
