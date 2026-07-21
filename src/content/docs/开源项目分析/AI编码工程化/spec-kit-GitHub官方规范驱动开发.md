---
title: spec-kit - GitHub 官方规范驱动开发工具
description: github/spec-kit 官方规范驱动开发 toolkit,Spec-Driven Development 方法论,5 个 slash command 串行工作流
---

# spec-kit — GitHub 官方规范驱动开发工具

> 数据采集时间:2026-07-19
> 仓库:https://github.com/github/spec-kit
> 文档:https://github.github.io/spec-kit/
> CLI 包:`specify-cli`(通过 uv tool 或 pipx 安装)

## 项目总览

| 维度     | 评价                                                                                |
| -------- | ----------------------------------------------------------------------------------- |
| 项目类型 | Spec-Driven Development Toolkit(规范驱动开发的工具集+方法论)                      |
| 技术壁垒 | 中 — 核心是 5 个 slash command + spec/constitution 模板,壁垒在**GitHub 官方背书**     |
| 学习价值 | 高 — 揭示了"Spec 是可执行的,直接生成代码"的完整工作流                              |
| 商业价值 | 高 — 122K stars,GitHub 官方维护,MIT 协议,作为 GitHub Copilot 生态的核心方法论      |
| 适合人群 | 用 GitHub Copilot / Copilot CLI 的团队;想引入"规范驱动"工作流的组织                 |
| 核心创新 | **"spec 是可执行的,直接生成代码"** — 把 spec 从文档提升为代码生成器                 |

## 核心理念(一句话)

> "几十年来代码是王,spec 只是脚手架。Spec-Driven Development 翻转这个范式:spec 变成可执行的,直接生成工作实现,而不是仅仅指导它。"

**5 个 slash command 串成的线性工作流**:

```
/speckit.constitution → /speckit.specify → /speckit.plan → /speckit.tasks → /speckit.implement
```

1. **`/speckit.constitution`** — 写项目治理原则(代码质量、测试标准、UX 一致性、性能要求)
2. **`/speckit.specify`** — 描述要构建什么(what & why,not tech stack)
3. **`/speckit.plan`** — 提供技术栈和架构选型
4. **`/speckit.tasks`** — 把 plan 拆成可执行任务清单
5. **`/speckit.implement`** — 执行所有任务,按 spec 构建

## 关键设计点

- **Specification as Executable** — 核心范式革命:spec 不是文档,是代码生成器
- **Slash Command 驱动** — 主流 agent 暴露为 `/speckit.*` 命令(Codex CLI 在 skills 模式下用 `$speckit-*`)
- **Constitution 机制** — 项目级宪法,定义所有后续开发的原则
- **Extension / Preset / Bundle 生态** — 社区可以发布扩展、预设、角色化 bundle
- **Bring Your Own Process** — 不绑定 Trellis 那种"完整 harness",可以替换自己的流程
- **跨 agent 适配** — 支持 Claude Code、Cursor、Codex、Copilot CLI、Gemini CLI 等主流 agent

## 横向对比 — Trellis vs spec-kit

> spec-kit 与 **Trellis(mindfold-ai/Trellis)** 同属 spec-driven 赛道,但 spec-kit 规模 10 倍于 Trellis。
> **两者不是直接竞品,更接近互补关系**:
> - spec-kit 解决"AI 写代码前先写 spec"(方法论 + 工具)
> - Trellis 解决"AI 写代码时按 spec 自动执行 + 自我改进"(运行时 + 学习闭环)

| 维度        | spec-kit (github/spec-kit)          | Trellis                              |
| ----------- | ----------------------------------- | ------------------------------------ |
| ⭐ Stars   | **122,246**                         | 12,825                               |
| 🍴 Forks   | 10,880                              | 716                                  |
| 归属        | **GitHub 官方**                     | Mindfold(初创)                      |
| 协议        | **MIT**(商业友好)                  | AGPL-3.0(商业限制)                  |
| 本质        | **方法论+工具集**(toolkit)         | **运行时**(runtime harness)         |
| 核心命题    | "Spec 是可执行的,直接生成实现"     | "AI 没记忆,harness 给你记忆和规范"  |
| 流程        | 5 个 slash command 串行             | 4 阶段循环,**子 agent 协作**         |
| Spec 演进   | 无自动演进                         | **有学习闭环**(verify 反向强化 spec) |
| 多平台      | 主流 agent 都支持(数量相当)        | **17 个** agent 适配器               |
| 工作记忆    | 无                                 | **`.trellis/workspace/` journals**   |
| 子 agent    | 无(靠主 agent 串行)               | 4 个(brainstorm/research/implement/check) |
| CLI 安装    | `uv tool install`(Python 系)      | `npm install -g`                    |
| 主语言      | Python                             | TypeScript + Python                 |
| 社区生态    | **Extension/Preset/Bundle 完整**    | 中等                                |
| 商业产品    | **友好**(MIT)                     | 需谨慎(AGPL-3.0)                   |

### 详细对比(取舍点)

| 你的需求                                   | 选 spec-kit            | 选 Trellis            |
| ------------------------------------------ | ---------------------- | --------------------- |
| 想用 GitHub 官方背书的方法论               | ✅                     | ❌                    |
| 在意商业协议(要做产品/二次分发)           | ✅ MIT                 | ❌ AGPL-3.0           |
| 想要"团队规范进 repo + 跨成员共享"        | ✅(constitution 机制) | ✅(spec 目录)         |
| 需要**跨 session 记忆**(上次学到的)        | ❌                     | ✅ workspace journals |
| 需要**子 agent 分工协作**                  | ❌(主 agent 串行)     | ✅ 4 个子 agent       |
| 需要**自动 verify + 自修复**               | ❌                     | ✅ trellis-check      |
| 想要**spec 自动演进**(用得越久越聪明)     | ❌                     | ✅ trellis-update-spec|
| 想用 Node 生态/TS 工具链                   | ❌ Python CLI          | ✅                    |
| 团队规模大、需要"角色分工"                | ✅(bundles 角色化机制) | ❌                    |
| 想要社区生态(extension/preset/walkthrough)| ✅ 完整生态            | 中等                  |
| 想要"先写 spec → 直接生成实现" 的可执行感 | ✅                     | 中                    |

### 一句话总结两者的关系

- **spec-kit 偏"思考层"**(what to build)
- **Trellis 偏"执行层"**(how to build consistently)
- 理论上可以串联:用 spec-kit 起 spec → 用 Trellis runtime 驱动执行

## 横向对比 — Superpowers（赛道顶流）

> ⚠ 重要补充:本赛道真正的顶流是 **obra/superpowers**（257K Stars, 9 个月冲到, Anthropic 官方 plugin marketplace 上架, **MIT**, 已商业化）。spec-kit 122K Stars 排第二, 但 Superpowers 才是"事实标准"。

| 维度         | spec-kit                        | **Superpowers** (obra/superpowers) |
| ------------ | ------------------------------- | ----------------------------------- |
| ⭐ Stars    | 122,246                         | **257,213** (2.1 倍)                |
| 归属         | GitHub 官方                     | obra + Prima Radiant(已商业化)    |
| 协议         | MIT                             | **MIT**                             |
| 本质         | 方法论脚手架(5 个 slash command) | **完整工程师人格**(13+ composable skills) |
| 核心命题     | "spec 是可执行的"               | "AI agent 应该是完整工程师"        |
| 形式         | CLI(specify-cli)               | **Plugin/Skills 包**(无 CLI)       |
| 触发方式     | **用户主动调** `/speckit.*`    | **自动触发**(你说"做 XX"就激活)    |
| 工作流       | 5 个 slash command 串行         | 13+ skills 自动组合                |
| TDD 约束     | 无强约束                        | **强制 RED-GREEN-REFACTOR**         |
| Code Review  | 无                              | **强制**(两阶段 review)            |
| Subagent     | 无(主 agent 串行)              | **每个任务派新 subagent**          |
| Spec 演进    | 无自动演进                      | 无自动演进(skills 本身可改)        |
| 工作记忆     | 无                              | 无显式 workspace                   |
| 平台支持     | 主流 agent 适配                 | **10+ 官方 marketplace**(Claude/Codex/Cursor/OpenCode/Pi/Kimi/Copilot CLI/Factory Droid/Antigravity) |
| 安装         | `uv tool install`              | 一键 `/plugin install superpowers@...` |
| 商业化       | 无                              | **已商业化**(enterprise 销售 + 招社区工程师) |
| 官方背书     | GitHub 官方                     | **Anthropic 官方 plugin marketplace** |

详细对比见 `Superpowers-AI编码工程师方法论与Skills框架.md` 中的"三强对决"和"选型建议"小节。

### spec-kit vs Superpowers 选型

- ✅ **选 spec-kit 当**:你只用 GitHub Copilot 系列,喜欢 GitHub 官方背书,想要"线性 5 步走完一个 spec"的方法论
- ✅ **选 Superpowers 当**:你想让 AI agent **变成一个完整的工程师**(会 brainstorm / TDD / review / verification),不想自己组装方法论,不在乎自动触发的"强制约束"

**不混用** —— 两者都强观点地定义了工作流, 混用会冲突。

## 领域趋势

**当前主流方向**:从"AI 单次生成代码"→"AI 按工程规范持续交付代码"。

- spec-kit 处于**方法论第一梯队** — GitHub 官方背书 + MIT 协议, 大概率成为 GitHub Copilot 生态的"事实标准"
- Superpowers 处于**完整人格第一梯队** — 9 个月 257K stars, Anthropic 官方 marketplace 上架
- Trellis 与 spec-kit/Superpowers 不是零和 — 偏方法论 / 偏 runtime / 偏人格, 长期可能融合
- 2026 年的趋势:**每个团队都需要一个 spec 仓库** — 这是 AI 编码从"辅助"走向"自动化"的基础设施

## 潜在问题/坑

- **绑死 GitHub 生态** — 虽然跨 agent 适配做得不错,但核心方法论是 GitHub 推动的
- **没有学习闭环** — spec 写完后不会自动演进,需要手动 review 和更新
- **没有跨 session 记忆** — 每次新 session 都要重读 spec,workspace journals 这种设计没有
- **依赖 slash command 暴露** — 如果某个 agent 不支持暴露 spec-kit 命令,体验打折

## 总结与建议

- **[强烈推荐]** 关注/使用,特别是你用 GitHub Copilot 或在意商业协议
- **一句话总结**:spec-kit 是 **"AI 编码时代的宪法+章程"** — 用 5 个 slash command 把"写 spec → 生成代码"变成可执行流程
- 适合:用 GitHub Copilot / 想要官方背书 / 商业产品(协议友好) / 团队规模大需要角色化
- 不适合:想要完整 runtime harness(选 Trellis) / 想要 spec 自动演进(选 Trellis) / 只想用 Node 生态(选 Trellis)

## 备查数据

- 仓库:github/spec-kit
- 描述:💫 Toolkit to help you get started with Spec-Driven Development
- 创建:2025-08-21
- 最近推送:2026-07-17(2 天前,活跃)
- 主语言:Python
- Stars: 122,246 / Forks: 10,880 / Open issues: 311
- 协议:MIT
- CLI:`specify-cli`(uv tool install 或 pipx)
- 文档:https://github.github.io/spec-kit/
- 命令前缀:Claude Code/Cursor 用 `/speckit.*`,Codex CLI skills 模式用 `$speckit-*`,GitHub Copilot CLI 用 `/agents`
