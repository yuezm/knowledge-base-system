---
title: Trellis - AI 编码工程框架
description: mindfold-ai/Trellis 跨平台 AI Coding Agent Harness,4 阶段循环 + spec 学习闭环 + 17 平台适配器
status: active
---

# Trellis — AI 编码工程框架

> 数据采集时间：2026-07-19
> 仓库：https://github.com/mindfold-ai/Trellis
> 官网：https://docs.trytrellis.app
> npm 包：@mindfoldhq/trellis

## 项目总览

| 维度     | 评价                                                                                          |
| -------- | --------------------------------------------------------------------------------------------- |
| 项目类型 | AI Coding Agent Harness（跨平台的"AI 编码脚手架"）                                            |
| 技术壁垒 | 中 — 不依赖新模型,核心是 spec/task/workspace 三层结构 + 多平台适配器,差异化在**工程方法论** |
| 学习价值 | 高 — 揭示了"AI 写代码容易、写工程化代码难"的标准解法(spec 沉淀、PRD 驱动、子 agent 校验)     |
| 商业价值 | 中高 — Mindfold 公司主推,AGPL-3.0 商业护城河,12.8k stars 强信号                              |
| 适合人群 | 想把 AI 编码从"玩具"变"工程化"的团队/个人开发者;已经在用 Claude Code/Cursor/Codex 的人      |
| 核心创新 | **把"团队规范/任务上下文/历史记忆"沉淀进 repo**,让任意 AI agent 接入都立刻具备团队标准       |

## 核心理念(一 句话)

> "AI 写代码很快,但每个新会话都从零开始 — 没有项目记忆、没有团队约定、没有任务上下文。Trellis 把 spec/task/workspace 持久化进仓库,让任何 agent 都能按你的工程标准工作。"

它解决的是 **AI 编码从单次 demo → 可复用工程流程** 的最后一公里:

- 单一会话:随便一个 IDE 插件都能干
- 跨会话一致性:需要 spec 持久化
- 跨 agent 一致性:需要 platform-agnostic 抽象
- 跨成员一致性:需要 spec 进 git 共享

## 核心架构(4 阶段循环)

```
Plan → Implement → Verify → Finish
```

1. **Plan** — `trellis-brainstorm` 一次问一个问题,生成 PRD(prd.md);研究重的派给 `trellis-research` 子 agent;产物落地到 `implement.jsonl` / `check.jsonl`
2. **Implement** — `trellis-implement` 子 agent 按 PRD 写代码,**不自动 git commit**
3. **Verify** — `trellis-check` 子 agent 对照 spec 审查 diff + 跑 lint/type-check/test,能自修就自修
4. **Finish** — `/trellis:finish-work` 触发最终校验 + `trellis-update-spec` 把新学到的规则回写到 `.trellis/spec/`,让下次会话更聪明

## 仓库结构(核心目录)

```
.trellis/                  # 框架生成的"工程状态"
├── spec/                  # 团队规范(spec 模板 + 自动注入)
├── tasks/                 # 任务上下文(PRD/实现上下文/审查上下文)
├── workspace/             # 个人工作记忆(journals)
├── agents/                # 子 agent 配置(brainstorm/implement/check/research)
├── scripts/               # 自动化脚本
├── config.yaml            # 行为开关
└── workflow.md            # 工作流定义
```

顶层还内置了 17 个平台的适配器目录:`.claude/ .cursor/ .codex/ .opencode/ .agents/ .pi/ .omp/ .github/`... 同一份 spec 可同时驱动 Claude Code、Cursor、Codex、OpenCode、Pi 等。

## 关键设计点

- **Spec 持久化** (`.trellis/spec/`) — 团队规范一次写好,session 启动自动注入;不是 `CLAUDE.md` 那种单文件逐渐膨胀
- **任务隔离** (`.trellis/tasks/`) — 每个任务有独立的 PRD + 实现上下文 + 审查上下文,避免互相污染
- **工作记忆** (`.trellis/workspace/`) — 上次 session 学到的东西写进 journal,下次 session 开局就有真实上下文
- **多平台抽象** — 17 个平台,**写一次 spec 处处生效**,换 IDE/agent 不重写工作流
- **学习闭环** — `trellis-update-spec` 把"verify 阶段发现的新规则"反向写入 spec,越用越聪明

## 横向对比 — spec-kit(同赛道核心竞品)

> ⚠ 重要修正:Trellis 与 **github/spec-kit** 同属 spec-driven 赛道,但 spec-kit 规模远超 Trellis。
> **spec-kit: 122K stars / 10.9K forks / GitHub 官方 / MIT**
> **Trellis: 12.8K stars / 716 forks / Mindfold 初创 / AGPL-3.0**
> 两者其实在解决不同问题,更接近**互补关系**而非直接竞争。

| 维度        | Trellis                              | spec-kit (github/spec-kit)          |
| ----------- | ------------------------------------ | ----------------------------------- |
| ⭐ Stars   | 12,825                               | **122,246** (10 倍)                  |
| 归属        | Mindfold(初创)                      | **GitHub 官方**                     |
| 协议        | AGPL-3.0(商业限制)                 | MIT(商业友好)                     |
| 本质        | **运行时**(runtime harness)         | **方法论+工具集**(toolkit)         |
| 核心命题    | "AI 没记忆,harness 给你记忆和规范"  | "Spec 是可执行的,直接生成实现"     |
| 流程        | 4 阶段循环,**子 agent 协作**         | 5 个 slash command 串行             |
| Spec 演进   | **有学习闭环**(verify 反向强化 spec) | 无自动演进                         |
| 多平台      | **17 个** agent 适配器               | 主流 agent 都支持(数量相当)        |
| 工作记忆    | **`.trellis/workspace/` journals**   | 无                                 |
| 子 agent    | 4 个(brainstorm/research/implement/check) | 无(靠主 agent 串行)         |
| CLI 安装    | `npm install -g`                    | `uv tool install`(Python 系)      |
| 主语言      | TypeScript + Python                 | Python                             |

详细对比见 `spec-kit-GitHub官方规范驱动开发.md` 中的"Trellis vs spec-kit"小节。

### 选型建议

- ✅ **选 Trellis 当**:你或团队同时用多个 AI agent(Claude Code + Cursor + Codex...),想一次配置到处生效;你受够了每次开新会话都要重新解释项目背景
- ✅ **选 spec-kit 当**:你只用 GitHub Copilot 系列工具,喜欢 GitHub 官方背书,商业产品需考虑协议

## 横向对比 — 三强对决（AI 编码工程化赛道）

> **赛道三巨头**:
> - **obra/superpowers** 257K ⭐(顶流, 9 个月, MIT, **已商业化**, Anthropic 官方 marketplace)
> - **github/spec-kit** 122K ⭐(GitHub 官方, MIT)
> - **mindfold-ai/Trellis** 12.8K ⭐(初创, AGPL-3.0)

| 维度        | Trellis                              | spec-kit                       | **Superpowers**               |
| ----------- | ------------------------------------ | ------------------------------ | ----------------------------- |
| ⭐ Stars   | 12,825                               | 122,246 (9.5 倍)               | **257,213** (20 倍)           |
| 归属        | Mindfold(初创)                      | GitHub 官方                    | obra + Prima Radiant          |
| 协议        | AGPL-3.0(商业限制)                  | MIT(商业友好)                 | **MIT**                       |
| **本质**    | **运行时 harness**                  | **方法论脚手架**              | **完整工程师人格**            |
| 形式        | CLI + `.trellis/` 目录              | CLI(specify-cli)              | **Plugin/Skills 包**         |
| 触发方式    | 调 `trellis-brainstorm` 等          | 用户主动调 `/speckit.*`       | **自动触发**                  |
| 工作流      | 4 阶段循环(子 agent 协作)           | 5 个 slash command 串行        | 13+ skills 自动组合           |
| Spec 演进   | **有学习闭环**                      | 无自动演进                    | 无自动演进                    |
| 工作记忆    | **`.trellis/workspace/` journals** | 无                            | 无                            |
| Subagent    | 4 个(brainstorm/research/implement/check) | 无                       | **每个任务派新 subagent**     |
| TDD 约束    | 无强约束(verify 阶段跑测试)        | 无强约束                      | **强制 RED-GREEN-REFACTOR**   |
| Code Review | `trellis-check` 子 agent            | 无                            | **强制两阶段 review**         |
| 平台支持    | **17 平台适配器**(自生成目录)       | 主流 agent 适配                | **10+ 官方 marketplace**      |
| 安装        | `npm install -g`                    | `uv tool install`              | 一键 `/plugin install`        |
| 商业化      | 无                                  | 无                            | **已商业化**(enterprise 销售) |
| 官方背书    | 无                                  | GitHub 官方                    | **Anthropic 官方 marketplace**|

详细对比见 `Superpowers-AI编码工程师方法论与Skills框架.md` 中的"三强对决"和"选型建议"小节。

### 三强选型建议

- ✅ **选 Trellis 当**:你想用 spec/task/workspace 三层结构做**长期项目记忆**,需要**学习闭环**(spec 越用越聪明),不在意 AGPL-3.0
- ✅ **选 spec-kit 当**:你只用 GitHub Copilot 系列,喜欢 GitHub 官方背书,想要"线性 5 步走完一个 spec"的方法论
- ✅ **选 Superpowers 当**:你想让 AI agent **变成一个完整的工程师**(会 brainstorm/TDD/review/verification),不想自己组装方法论,不在乎自动触发的"强制约束"

**不混用** —— 三者都强观点地定义了工作流, 混用会冲突。

## 潜在问题/坑

- **AGPL-3.0** — 商业产品要二次分发需谨慎,协议传染性强
- **学习曲线** — spec/task/workspace 三层结构对个人小项目可能过重
- **多平台适配的代价** — 17 个平台意味着任何新模型能力都要在所有平台重写适配
- **依赖多个 AI 工具** — 一旦某个 agent 行为变更,整个流程要跟着修

## 总结与建议

- **[推荐]** 关注/使用,特别是你已经在用多个 AI 编码工具
- **一句话总结**:Trellis 是 **"AI 编码的工程化操作系统"** — 它不解决"AI 能不能写代码",解决"AI 写出的代码怎么保持工程标准"
- 适合:**每天和 AI 编码工具打交道 + 项目有一定规模 + 想沉淀团队规范**
- 不适合:纯玩具项目、只用单一 agent、不能接受 AGPL-3.0

## 备查数据

- 仓库:mindfold-ai/Trellis
- 描述:The best agent harness.
- 创建:2026-01-26
- 最近推送:2026-07-17(2 天前,活跃)
- 主语言:TypeScript (2.28M) + Python (803K) + JavaScript (162K) + HTML + Shell
- Stars: 12,825 / Forks: 716 / Open issues: 27
- 协议:AGPL-3.0
- npm 包:`@mindfoldhq/trellis`
- 文档:https://docs.trytrellis.app
