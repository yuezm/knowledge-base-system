---
title: Superpowers - AI 编码工程师方法论与 Skills 框架
description: obra/superpowers 完整 AI 编码工程师方法论,13+ composable skills 自动触发,Anthropic 官方 plugin marketplace 上架,257K Stars
status: active
---

# Superpowers — AI 编码工程师方法论与 Skills 框架

> 数据采集时间:2026-07-19
> 仓库:https://github.com/obra/superpowers
> 作者:Jesse Vincent (obra),商业化公司 Prima Radiant
> 协议:**MIT**(Copyright © 2025 Jesse Vincent)
> 安装:通过各 agent 官方 plugin marketplace(Claude Code/Codex/Cursor/OpenCode/Pi/Kimi/Copilot CLI/Factory Droid/Antigravity)

## 项目总览

| 维度     | 评价                                                                                |
| -------- | ----------------------------------------------------------------------------------- |
| 项目类型 | Agentic Skills Framework + 软件开发方法论(composable skills + 自动触发的工程实践) |
| 技术壁垒 | **高** — 不是工具,是**完整工程师人格**:13+ skills、TDD、code review、verification 一整套强约束 |
| 学习价值 | **极高** — 揭示了"AI 编码 agent 应该是什么"的终极形态:**完整的工程师**,不是代码生成器 |
| 商业价值 | **极高** — 257K stars(顶流,9 个月冲到这个规模),Anthropic 官方 marketplace 上架,已招 enterprise 销售 |
| 适合人群 | 任何用 Claude Code/Codex/Cursor 等主流 agent 的开发者(几乎所有人)               |
| 核心创新 | **Skills 自动触发 + 强方法论约束(TDD/Review/Verification) + 10+ 平台官方上架**    |

## 核心理念(一句话)

> "你的 agent 启动后**不会直接跳进写代码**——它会**自动退一步**,问清楚你真正想做什么;然后**分块展示设计**让你确认;再拆成 2-5 分钟一个的 bite-sized 任务;**派新 subagent** 执行,**两阶段 review**(spec 合规 → 代码质量);强制 TDD、强制 code review、强制 verification。"

**与 spec-kit 的本质区别**:spec-kit 给你**方法论脚手架**(自己组装),Superpowers 给你**预训练好的完整工程师人格**(开箱即用 + 自动触发)。

## 核心机制(How it works)

### 1. **bootstrap 注入**

每个 session 启动时,`using-superpowers` skill 自动注入——告诉 agent "你拥有 Superpowers,所有 skills 自动触发"。

### 2. **Skills 自动触发**

不像 spec-kit 要你主动 `/speckit.*`,Superpowers 的 skills 是**自动激活**的:

- 你说"我要做 XX"→ **brainstorming** 自动激活(不会直接写代码)
- 设计批准 → **using-git-worktrees** 自动激活(新分支隔离)
- 计划制定 → **writing-plans** 自动激活(2-5 分钟 bite-sized 任务)
- 开始执行 → **subagent-driven-development** 自动激活(派 subagent + 两阶段 review)
- 写测试 → **test-driven-development** 自动激活(强制 RED-GREEN-REFACTOR)
- 任务间 → **requesting-code-review** 自动激活
- 完成前 → **verification-before-completion** 自动激活

**关键优势**:你不需要记任何命令,skills 自己会触发。

## 13+ Skills 清单(完整方法论)

| Skill                              | 触发时机                | 作用                                                 |
| ---------------------------------- | ----------------------- | ---------------------------------------------------- |
| `using-superpowers`                | Session 启动            | 注入 bootstrap,告诉 agent 拥有 Superpowers           |
| `brainstorming`                    | 开始任何工作前          | 退一步问清需求,分块展示设计,保存设计文档             |
| `using-git-worktrees`              | 设计批准后              | 隔离工作区,新分支,跑项目 setup,验证 clean baseline  |
| `writing-plans`                    | 设计批准后              | 拆成 2-5 分钟一任务(带文件路径+完整代码+验证步骤) |
| `subagent-driven-development`      | 计划批准后              | 派新 subagent per task + 两阶段 review(合规→质量) |
| `executing-plans`                  | 计划批准后(替代方案)   | 批量执行 + 人类 checkpoint                           |
| `test-driven-development`          | 实施过程中              | 强制 RED-GREEN-REFACTOR,删除测试前写的代码           |
| `requesting-code-review`           | 任务间                  | 对照 plan review,按严重程度报告,critical block      |
| `verification-before-completion`   | 完成前                  | 必须跑验证                                           |
| `using-skills` (self-teaching)     | 任何 skill 引用其他 skill | 教 agent 怎么按需加载其他 skill                     |
| `debugging` 系列                   | 出 bug 时               | 系统化调试流程                                       |
| `testing` / `anti-patterns` 系列   | 实施过程中              | 测试最佳实践 + 常见反模式                            |
| ...                                | 还有更多                | 形成完整工程实践体系                                 |

**这些 skill 本身是 Markdown 教学文件**——agent 读到它们就学会了对应方法论。这跟 Trellis 的"spec 模板"是同一思路,但 superpowers 是"**教 agent 方法论**",Trellis 是"提供 spec 容器"。

## 工作流(Basic Workflow)

1. **brainstorming** — 激活前置,问清需求,分块展示设计
2. **using-git-worktrees** — 设计批准后,隔离工作区
3. **writing-plans** — 拆成 bite-sized 任务(2-5 分钟)
4. **subagent-driven-development** 或 **executing-plans** — 派 subagent 执行
5. **test-driven-development** — 强制 RED-GREEN-REFACTOR
6. **requesting-code-review** — 任务间 review

## 10+ 平台官方支持

通过各 agent 的 plugin marketplace 一键安装:

| 平台              | 安装命令                                                       | 备注                              |
| ----------------- | -------------------------------------------------------------- | --------------------------------- |
| Claude Code       | `/plugin install superpowers@claude-plugins-official`          | **Anthropic 官方 marketplace**    |
| Codex App         | Codex 官方 marketplace                                         | OpenAI 官方 marketplace           |
| Codex CLI         | `/plugins` → 搜 superpowers → Install                          | OpenAI 官方 marketplace           |
| Cursor            | `/add-plugin superpowers`                                       | Cursor 官方 marketplace           |
| GitHub Copilot CLI| `copilot plugin marketplace add obra/superpowers-marketplace`  |                                   |
| OpenCode          | 从仓库直接 install                                              |                                   |
| Pi                | `pi install git:github.com/obra/superpowers`                  |                                   |
| Kimi Code         | `/plugins install https://github.com/obra/superpowers`         |                                   |
| Factory Droid     | `droid plugin install superpowers@superpowers`                  |                                   |
| Antigravity       | `agy plugin install https://github.com/obra/superpowers`       |                                   |

**关键信号**:**Anthropic 官方 Claude plugin marketplace** 上架(不是自有 marketplace),这是 Anthropic 官方背书。

## 商业化状态

Superpowers **已经商业化**——这是它跟 spec-kit 最大的不同之一:

- **已招全职 Superpowers 社区工程师**(公开招聘,年薪公开)
- **已建 enterprise 销售线**:`sales@primeradiant.com`
- **提供 enterprise 商业支持、额外工具、managed spending**
- 背后公司:Prima Radiant(由 obra 主导)

spec-kit 至今没有任何商业化动作。

## 关键设计点

- **Skills 自动触发** — 不需要记命令,agent 自动调用
- **Composability** — 13+ skills 可独立使用,也可组合
- **强方法论约束** — 强制 TDD、强制 review、强制 verification,没有"可选"模式
- **Subagent-Driven** — 每个任务派新 subagent + 两阶段 review(避免主 agent 上下文膨胀)
- **Workspace 隔离** — using-git-worktrees 强制新分支工作
- **Bite-sized 任务** — 2-5 分钟一个,带完整代码+验证步骤(避免大任务失控)
- **Self-teaching skills** — skills 内部互相引用,`using-skills` 教 agent 怎么按需加载
- **明确哲学** — 强调 TDD、YAGNI、DRY,subagent 两阶段 review,verification 前置

## 横向对比 — 三强对决

> **AI 编码工程化赛道三巨头**:
> - **obra/superpowers** 257K ⭐(顶流,9 个月,MIT,**已商业化**)
> - **github/spec-kit** 122K ⭐(GitHub 官方,MIT)
> - **mindfold-ai/Trellis** 12.8K ⭐(初创,AGPL-3.0)

| 维度         | **Superpowers**               | spec-kit                       | Trellis                          |
| ------------ | ----------------------------- | ------------------------------ | -------------------------------- |
| ⭐ Stars    | **257,213** (顶流)            | 122,246 (2.1 倍差距)           | 12,825 (20 倍差距)               |
| 归属         | obra + Prima Radiant          | GitHub 官方                    | Mindfold(初创)                  |
| 协议         | **MIT**                       | MIT                            | AGPL-3.0                         |
| **本质**     | **完整工程师人格**(skills + 强方法论) | **方法论脚手架**(线性 command) | **运行时 harness**(spec/task/workspace 三层) |
| **核心命题** | "AI agent 应该是完整工程师"  | "spec 是可执行的"              | "AI 没记忆,harness 给你记忆"    |
| 形式         | Plugin/Skills 包(无 CLI)     | CLI(specify-cli)              | CLI(trellis)+ .trellis 目录     |
| 触发方式     | **自动触发**(你说"做 XX"就激活) | 用户主动调 `/speckit.*`       | 调 `trellis-brainstorm` 等       |
| 工作流       | 13+ skills 自动组合           | 5 个 slash command 串行       | 4 阶段循环(Plan→Implement→Verify→Finish) |
| TDD 约束     | **强制 RED-GREEN-REFACTOR**   | 无强约束                       | 无强约束(verify 阶段跑测试)     |
| Code Review  | **强制**(两阶段 review)      | 无                             | `trellis-check` 子 agent        |
| Subagent     | **每个任务派新 subagent**    | 无(主 agent 串行)             | 4 个子 agent(brainstorm/research/implement/check) |
| Spec 演进    | 无自动演进(skills 本身可改)   | 无自动演进                     | **有学习闭环**(`trellis-update-spec`)|
| 工作记忆     | 无显式 workspace              | 无                             | **`.trellis/workspace/` journals**|
| 平台支持     | **10+ 官方 marketplace**      | 主流 agent 适配                | **17 平台适配器**(自己生成目录) |
| 安装         | 一键 plugin install           | `uv tool install`             | `npm install -g`                |
| 商业化       | **已商业化**(招 enterprise 销售) | 无                           | 无                               |
| 官方背书     | **Anthropic 官方 marketplace**| GitHub 官方                    | 无                               |

## 选型建议

### 一句话选型

- ✅ **选 Superpowers 当**:你想让 AI agent **变成一个完整的工程师**(会 brainstorm、会 TDD、会 review、会 verification),不想自己组装方法论,**不在乎自动触发的"强制约束"**
- ✅ **选 spec-kit 当**:你只用 GitHub Copilot 系列,喜欢 GitHub 官方背书,想要"线性 5 步走完一个 spec"的方法论,**想自己控制流程**
- ✅ **选 Trellis 当**:你想用 spec/task/workspace 三层结构做**长期项目记忆**,需要**学习闭环**(spec 越用越聪明),不在意 AGPL-3.0

### 详细决策树

| 你的需求                                 | Superpowers    | spec-kit       | Trellis        |
| ---------------------------------------- | -------------- | -------------- | -------------- |
| 想要**自动触发的完整工程实践**           | ✅             | ❌             | ❌             |
| 强制 TDD / 强制 code review              | ✅             | ❌             | ❌             |
| 想要 GitHub 官方背书                     | ❌             | ✅             | ❌             |
| 想要"spec → 直接生成代码"的线性流程      | ❌             | ✅             | ❌             |
| 想要**跨 session 记忆 + spec 演进**     | ❌             | ❌             | ✅             |
| 在意商业协议                             | MIT            | MIT            | AGPL-3.0       |
| 想要 enterprise 商业支持                 | ✅             | ❌             | ❌             |
| 用 Claude Code / Codex / Cursor          | ✅(全覆盖)     | ✅             | ✅(17 平台)    |
| 想要 Plugin 一键安装                     | ✅(10+ 平台)   | ❌(CLI)        | ❌(CLI)        |
| 团队规模大 / 多人协作                    | ✅             | ✅             | ✅             |
| 想要 Anthropic 官方 marketplace          | ✅             | ❌             | ❌             |

## 三者其实能串联吗?

**理论上可以**(都是规范驱动开发的工具),但**实际不建议混用**——三者都强观点地定义了工作流,混用会冲突。

**实际选择时,二选一甚至三选一更常见**:

- **新人** → Superpowers(开箱即用,自动触发)
- **GitHub 生态重度用户** → spec-kit(官方背书 + MIT)
- **长期项目 + 想要团队记忆** → Trellis(spec 演进)
- **不混用** —— 选一个,深度用

## 领域趋势

**当前主流方向**:从"AI 单次生成代码"→"AI 按工程规范持续交付代码"。

- **Superpowers 处于"完整方法论"第一梯队** — 不是工具,是**完整的工程师人格**
- 9 个月冲到 257K stars + Anthropic 官方 marketplace 上架 = 趋势明确
- 2026 年的方向:从 spec-driven → **skills-driven** → **agent-as-engineer**
- Trellis/spec-kit 偏"规范层",Superpowers 偏"人格层",长期可能融合(规范 + skills + 学习闭环 = 终极形态)

## 潜在问题/坑

- **强方法论 = 强约束** — 强制 TDD / 强制 review / 强制 verification 不一定适合所有场景(快速原型会被拖慢)
- **Skills 多了反而难选择** — 13+ skills 自动触发,某些场景下"哪个 skill 激活"可能不直观
- **依赖 Marketplace 生态** — 虽然上了 10+ 平台,但某个平台 marketplace 政策变了会受影响
- **商业化方向** — 未来是否会对核心 skills 收费?(目前全是 MIT 开源)
- **未明确每个 skill 的兼容性矩阵** — TDD skill 对纯文档项目可能不适用

## 总结与建议

- **[强烈推荐]** 关注/使用,特别是你用 Claude Code / Codex / Cursor
- **一句话总结**:Superpowers 是 **"AI agent 应该是完整工程师" 的人格套件** — 13+ skills 自动触发,强制 TDD/review/verification,9 个月冲到 257K stars,Anthropic 官方 marketplace 顶流
- 适合:**任何用主流 AI agent 的开发者**(尤其 Claude Code)、想要开箱即用的工程实践、想要"AI 像真正的工程师一样工作"
- 不适合:纯玩具项目、想要完全自定义工作流(Superpowers 太强观点)、不能接受 marketplace 分发

## 备查数据

- 仓库:obra/superpowers
- 描述:An agentic skills framework & software development methodology that works.
- 创建:2025-10-09(9 个月冲顶)
- 最近推送:2026-07-17
- 主语言:**Shell**(Skills 是 Markdown)
- Stars: **257,213** / Forks: 22,920 / Open issues: 325
- 协议:**MIT**(Copyright © 2025 Jesse Vincent)
- 平台:Claude Code、Codex App/CLI、Cursor、GitHub Copilot CLI、OpenCode、Pi、Kimi Code、Factory Droid、Antigravity(10+ 平台)
- 商业化:Prima Radiant,已招 enterprise 销售,`sales@primeradiant.com`
- 招聘:正在招 Superpowers 社区工程师(https://primeradiant.com/jobs/superpowers-community-engineer/)
