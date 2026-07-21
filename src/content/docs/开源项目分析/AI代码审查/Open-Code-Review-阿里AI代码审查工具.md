---
title: Open Code Review — 阿里 AI 代码审查工具
description: 阿里集团内部孵化开源的 AI 代码审查 CLI 工具，确定性工程×Agent 混合驱动
---

**Open Code Review** 是阿里集团开源的 AI 驱动代码审查 CLI 工具（`ocr` 命令），基于**确定性工程×Agent 混合驱动**架构，结合 Go 实现的工程逻辑与 LLM Agent 的动态决策能力，提供行级精度的代码审查评论。

- **仓库**: [alibaba/open-code-review](https://github.com/alibaba/open-code-review)
- **Stars**: ⭐ 10,573 (2026-07-15)
- **语言**: Go (66%) + TypeScript (20%) + JS/CSS/HTML
- **协议**: Apache-2.0
- **官网**: https://alibaba.github.io/open-code-review/

## 核心设计理念

### 确定性工程×Agent 混合驱动

Open Code Review 最核心的设计思想是将代码审查拆为两个层面：

**确定性层（Go 实现）** — 负责"不能出错"的环节：
- **精准文件筛选**：决定哪些文件需要审查、哪些应当过滤
- **智能文件打包**：将关联文件（如多语言属性文件）打包为同一审查单元，每个单元跑一个 sub-agent，以分治策略应对超大变更
- **精细化规则匹配**：基于模板引擎匹配审查规则（覆盖 20+ 文件类型），比纯语言驱动的规则引导更稳定可预期
- **外挂定位与反思模块**：独立的评论定位（`re_location_task`）修正行号漂移，评论反思（`review_filter_task`）去重去误报

**Agent 层** — 负责"需要判断"的环节：
- **场景化提示词**：分 5 阶段（plan → main → re-location → memory compression → review filter），每阶段独立 `system.md` + `user.md` 模板
- **场景化工具集**：基于百万级生产数据中的工具调用轨迹分析，筛选出最适合代码审查的工具集合

### 基准测试

相比通用 Agent（Claude Code 等），在相同底层模型下：
- **F1/Precision 显著更高** — 更少误报
- **Token 消耗仅 ~1/9** — 成本优势巨大
- **Recall 较低** — 有意识的设计取舍，优先保证精准

基于 50 个热门仓库、200 个真实 PR、10 种语言，80+ 资深工程师交叉标注（1,505 个标注缺陷）。

## 技术架构

```
┌──────────────────────────────────────────────────────────────┐
│                    ocr CLI (Go)                               │
├──────────────────────────────────────────────────────────────┤
│   ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐  │
│   │  diff/  │  │  gitcmd/  │  │  model/  │  │  session/   │  │
│   │ Git diff │  │ Git 操作  │  │ 数据模型  │  │ 会话持久化  │  │
│   └────┬────┘  └──────────┘  └──────────┘  └─────────────┘  │
│        │                                                      │
│   ┌────▼──────────────────────────────────────────────────┐  │
│   │              agent/ + llmloop/                         │  │
│   │   ┌──────────┐   ┌──────────┐   ┌──────────────────┐  │  │
│   │   │ 确定性工程 │   │ Agent    │   │ 模板引擎         │  │  │
│   │   │·文件筛选   │   │·工具调用  │   │ plan/main_task   │  │  │
│   │   │·打包分治   │   │·动态检索  │   │ re_location      │  │  │
│   │   │·规则匹配   │   │·上下文管理│   │ review_filter    │  │  │
│   │   └──────────┘   └──────────┘   └──────────────────┘  │  │
│   └────────────────────────────────────────────────────────┘  │
│        │                                                      │
│   ┌────▼──────────┐  ┌──────────┐  ┌────────────────────┐   │
│   │  config/      │  │  llm/    │  │  tool/             │   │
│   │·rules/        │  │·Provider │  │·code_search       │   │
│   │·template/     │  │·Client   │  │·code_comment      │   │
│   │·allowlist/    │  │·Protocol │  │·file_read/search  │   │
│   │·toolsconfig/  │  └──────────┘  │·comment_collector │   │
│   └───────────────┘               └────────────────────┘   │
│                                                              │
│   ┌──────────┐  ┌──────────┐                                 │
│   │ viewer/  │  │  scan/   │                                 │
│   │ Web 界面  │  │ 全量扫描  │                                 │
│   └──────────┘  └──────────┘                                 │
├──────────────────────────────────────────────────────────────┤
│  VSCode 插件  ·  Claude Code 插件  ·  Codex 插件  ·  MCP  │
└──────────────────────────────────────────────────────────────┘
```

## 主要特性

1. **`ocr review`** — Git diff 审查（工作区、分支范围、单提交）
2. **`ocr scan`** — 全量文件扫描（无需 Git 历史，适合审计不熟悉代码库）
3. **Provider 系统** — 内置 Anthropic/OpenAI/Gemini/Bedrock/Azure 等，支持自定义 Provider
4. **内置规则集** — 覆盖 NPE、线程安全、XSS、SQL 注入等高危模式，20+ 文件类型
5. **会话中断恢复** — `ocr session list` + `--resume`
6. **Web Viewer** — 本地 Web 界面查看审查结果
7. **MCP Server** — 通过 Model Context Protocol 在任何 MCP 客户端中调用

## 安装方式

```bash
# NPM 安装（推荐）
npm install -g @alibaba-group/open-code-review

# 或从 GitHub Release 下载
curl -fsSL https://raw.githubusercontent.com/alibaba/open-code-review/main/install.sh | sh

# 或从源码构建
git clone https://github.com/alibaba/open-code-review.git && make build
```

## 竞品定位

| 方案 | 对比 |
|------|------|
| **Open Code Review** | 确定性+Agent 混合，行级精度，低 Token 消耗 |
| **reviewdog** | 通用 linter 集成层，非 LLM 驱动，更轻量 |
| **Semgrep** | SAST 规则扫描，可编程模式匹配，无语义理解 |
| **Claude Code + Skills** | 纯 LLM 驱动，灵活性高但 Token 消耗大、位置漂移 |
| **CodeRabbit** | 商业 SaaS 方案，功能相似但闭源 |

## 优缺点

✅ **优势**：Token 效率极高（~1/9）、Precision 高（少误报）、确定性架构避免位置漂移、开源免费、Go 单二进制分发
❌ **不足**：Recall 偏低（设计取舍）、需外接 LLM 端点、项目太新社区生态待积累
