---
title: Skill-Based Architecture — 如何写一个好的 skill（项目级 Skill 架构方法论）
description: LINUX DO 长文《如何写一个好的 skill 让你的效率加倍!》+ 配套开源项目 skill-based-architecture（580 Stars / MIT）的方法论提炼：三句核心（结构服务于内容 / 激活优于存储 / 内容禁止预制）→ 薄壳路由 + SessionStart/PreToolUse 两道 hook + AAR 任务闭环 + 2/3 录入标准 + templates 脚手架 + smoke-test/test-trigger 脚本兜底，解决长会话压缩后规则失忆与 Agent 借口绕过
tags:
  - skill
  - agent
  - ai-coding
  - prompt-engineering
  - context-engineering
  - claude-code
status: active
related:
  - 开源项目分析/AI编码工程化/Superpowers-AI编码工程师方法论与Skills框架
  - 开源项目分析/AI编码工程化/Trellis-AI编码工程框架
  - 开源项目分析/AI编码工程化/spec-kit-GitHub官方规范驱动开发
  - 开源项目分析/AI编码工程化/ponytail-编码效率技能集与多Agent适配
  - 开源项目分析/提示词工程/AI时代的思维框架-潜空间地形模型与提示技巧
---

# Skill-Based Architecture — 如何写一个好的 skill（项目级 Skill 架构方法论）

> **原帖链接**：<https://linux.do/t/topic/1923706>
> **作者**：woji_666（这里是沃基，LINUX DO 社区）
> **来源板块**：LINUX DO · 「文档共建」（原「开发调优」，wiki 帖可社区共建；标签：人工智能 / 软件开发 / Agent / 文档 / 开源推广）
> **原文发布时间**：2026-04-08（最后活跃 2026-09-10；收录时数据：13,965 浏览 / 1,823 点赞 / 317 帖 / 166 位参与者 / 约 7,445 词）
> **配套项目**：WoJiSama/skill-based-architecture — <https://github.com/WoJiSama/skill-based-architecture>（**580 Stars / 49 Forks / MIT / Shell**，2026-04-08 建仓，最近代码推送 2026-08-14；数据 2026-09-16 直抓 GitHub API）
> **续篇**：《skill 的自我进化之路(1)》<https://linux.do/t/topic/1930416>
> **收录时间**：2026-09-16
> 说明：仅本地归档，未向原站回帖或提交内容；原帖配图未迁移（流程图 / 截图较多，需看图请回原文）。本文是对长帖 + 开源项目的方法论提炼，不是原文复述。

## 一句话

这是一篇**「怎么把项目规则写成 Agent 真能读到、且读了会遵守的 Skill」**的工程方法论：核心矛盾不在提示词写得好不好，而在**长会话上下文压缩后规则会消失、Agent 会凭残缺记忆直接开干**；解法是用「薄壳（内联路由表）+ hook（机制级重注/拦截）+ 任务闭环（AAR 录入）」三层结构化冗余，把规则从「写下来」推到「每次任务路径上都生效」。

作者自己给出的阅读路径（理解这三句，全文可不读）：

1. **结构服务于内容** —— 单文件够用就别摆全套目录，不要用结构撑「完整感」
2. **激活优于存储** —— 坑点只躺在 `references/` 里不算捕获，必须同时出现在任务路径上
3. **结构可复用，内容禁止预制** —— 脚手架可预制，业务内容必须留白由项目自己填

## 1. 定位：Skill 相对 Prompt / MCP / RAG 在哪一格

| 概念 | 管什么 | 类比 |
| --- | --- | --- |
| RAG | 外挂知识库，让 Agent 有据可依 | 参考资料 |
| MCP | 探索外部世界的能力（工具） | 手脚 |
| **Skill** | 决定 Agent「该怎么做」的流程与规则 | **大脑** |

- Skill 的前身是 Prompt：提示词只管「规范行为」，场景一多就单薄；把**提示词 + 规则 md + 脚本 + 文档**打包成一个「能力」= Skill。
- Skill 相对 Prompt 的**唯一决定性优势是加载方式**：按需加载 / **渐进式披露（Progressive Disclosure）**——Agent 平时只读 `description` 判断命中，命中后才读正文，省钱且省上下文。
- 作者的动机很具体：公司里一个 2000 行的 .md「AI 根本读不到」，于是有了这篇文章和配套项目。

## 2. 基础篇：从单文件到文件夹化

### 2.1 单文件也可能是最优解（反面教材是「全套架构」）

配套的 Karpathy Skills 项目（`forrestchang/andrej-karpathy-skills`，**现已重定向为 `multica-ai/andrej-karpathy-skills`，213,227 Stars**）整个项目 6 个文件 859 行，核心是一个 **67 行的 SKILL.md + 4 条行为准则**，没有 `rules/`、`workflows/`、`references/`：

- 这不是偷懒，是**对架构复杂度的准确判断**——结构服务于内容，而不是用结构撑完整性。

三条可直接抄的设计：

| 设计 | 做法 | 为什么有效 |
| --- | --- | --- |
| **原则 + 检验句**（而非原则 + 解释） | 「精准修改。只改必须改的。检验：每一行改动都应该能直接追溯到用户的请求」 | 声明只能让 Agent 生成前抽象「记住」；**检验句给了生成后可自我验证的钩子** |
| **代码级 ❌/✅ before-after** | 展示的**不是**明显错误（内存泄漏 / SQL 注入），而是「看起来合理但时机错了」的改动：修空 email 崩溃时顺手加 docstring、强化邮箱校验、加 username 长度限制 | 通用「禁止写烂代码」拦不住这类过度设计，因为 **Agent 不知道什么样子算烂**，必须给真实例子 |
| **按需引入结构复杂度** | 设计前先答三问：主题数 < 3？没有绑定任务流程？不会随项目演进更新？三个都「否」→ 单文件就够了 | 一上来搭 `rules/ + workflows/ + references/ + 多 harness 薄壳`，每个子目录只有一两行占位符，维护成本反而更高 |

**单文件撑不住的信号**（出现任一就进入文件夹化）：`SKILL.md` 开始出现「### X 相关 / ### Y 相关」多主题分节；不同任务类型要读不同规则；同样的坑第二次踩但没地方记；多人协作 / 多项目复用导致规则出现变体。

顺带的一个判断：`AGENTS.md` 的定位是**导航和约束**，不是知识仓库。几百行的 AGENTS.md 会导致上下文污染、成本变高、**Agent 弱智化**（规则冲突 + 变成纯工具人）。正确分层：`AGENTS.md` 管方向，其他文档管深度。

### 2.2 文件夹化：每个文件必须有独立的「被加载理由」

```
skills/<name>/
├── SKILL.md          # 入口：路由表 + 优先级
├── rules/            # 长期约束
├── workflows/        # 步骤流程
├── references/       # 背景资料：架构、坑点、索引
│   └── gotchas.md    # 已知的坑（通常最高价值内容）
├── docs/             # 可选：提示词、报告
└── scripts/          # 可选：辅助脚本、脚手架
```

- **硬规则**：每个文件要有自己独立的「被加载理由」；**几个文件如果永远一起加载，它们就应该是一个文件**。
- **边缘情况按「形式」而非「内容」归类**：指令性（「你必须做 X」）→ `rules/`；警告性（「小心 X」）→ `references/gotchas.md`；流程性（第 1/2/3 步）→ `workflows/`。
  - 自问：**「我能做 X 吗？」→ rules；「这个坑怎么避？」→ references；「我现在该做什么？」→ workflows。**
- **行数是信号，不是命令**：超标触发**评估**而非自动拆分；同一模块即便超过 300 行也不应硬拆。
- 路由的三种写法（从弱到强）：① `description`（加载正文前唯一可见的判据）；② 正文里自然语言指路（可维护性差、路由散列）；③ 专门的路由文件 `routing.yaml`（工作流清单 + required_reads）+ 各目录 `index.md`（说明本目录每个文件的功能）。
  - 作者结论：**写法不重要，Agent 能不能找到对应文件才重要**。

### 2.3 让 Agent 谦虚而不是过度自信（Session Discipline）

真实失败场景：第 1 轮修 bug 时读了 SKILL.md 并走了路由；第 2 轮加导出接口时 Agent 想「我已经知道规则了」跳过读取 → 漏掉 `rules/backend-rules.md` 里的 gotcha「导出接口必须走 async 队列」，测试通过（小数据）、生产炸（大数据）。

两个根因：**跨任务没重走路由**（把某次任务的路由当成所有任务的路由）+ **上下文已悄悄压缩**（`/compact` 早已跑过，SKILL.md 根本不在 context 里）。

修法不是写一句「请每次重读」（第 10 轮压缩后照样丢），而是**结构化多层冗余**：

```markdown
## Session Discipline（同会话多任务必须重走路由）

每个新任务——即使是同一会话的第 N 轮——必须重读 SKILL.md、重新匹配
Common Tasks 路由、重读该路由列出的所有必读文件。

检验：问自己"这次任务我读的文件和 Common Tasks 里对应路由列的完全一致吗？"
      如果有任何差异（少读 / 多读 / 凭记忆），立即回头重走路由。
```

### 2.4 三要素：Prompt / Context / Harness，缺一即半成品

| 要素 | 解决什么 | 关键点 |
| --- | --- | --- |
| **Prompt** | 定义做什么 | 分两层：`description`（触发描述）+ Body（执行指令） |
| **Context** | 决定知道多少 | 三级渐进式披露；只把「始终需要」的放顶层 |
| **Harness** | 验证好不好用 | 结构性拦截 / 自动化验证 / 真实压力测试 |

- **`description` 是 skill 里最重要的字段**（命中不了就一切归零）：它不是摘要，是**触发条件**；模型天然倾向 undertrigger，所以要主动覆盖用户的各种表达方式 + 明确激活条件。
  - ❌ `description: API development helper`
  - ✅ 「当用户要求 "add a new API endpoint" / "write controller logic" / "fix a backend bug" 时使用；当任务涉及 REST 路由、请求校验、service 层逻辑、MyBatis mapper 改动时激活。」
  - ⚠️ 有 Cursor 注册入口 `.cursor/skills/<name>/SKILL.md` 时，其 description **必须与主 SKILL.md 完全一致**，否则两边漂移 = 激活随机化。
- **Body 三条写法**：用祈使句（「读取文件」优于「你应该先读取文件」）；解释「为什么」而不只是「做什么」；控制在 500 行内，超出拆引用文件。
- **Context 三个常见病**：太少（模型随意发挥）、太大（尾部指令被静默忽略）、混乱（无关信息干扰判断）。
- **Harness 三件事**：① 结构性拦截（薄壳 Red Flags STOP + Rationalizations 表 + SessionStart hook）；② 自动化验证（smoke-test 48 项自检）；③ 真实压力测试（test-trigger 测触发率，**必须人眼看输出**，让 AI 自动改提示词最后只会改成自我安慰）。

### 2.5 SKILL.md = 导航中心（≤ 100 行），不是百科全书

```markdown
---
name: {{NAME}}
description: >  (触发条件)
primary: true
---
# {{NAME}} {{SUMMARY}}

## Always Read        ← 每次任务都读（2-3 个文件，只放通用约束）
## Session Discipline ← 多任务会话的强制再读
## Common Tasks       ← 按任务类型路由
## Known Gotchas      ← 最关键坑点一句话 + 指向 references/gotchas.md 的锚点
## Core Principles    ← 项目特有原则（每条带 ✓ Check）
```

- **Common Tasks 规则**：每条必须写精确文件路径（不能只写「follow the workflow」）；控制在 5–10 条，超出按领域分组；**必须有 "Other / unlisted task" 兜底条目**（没兜底 = 列表外任务乱跑）；必须有 multi-subtask 路由指向 `workflows/subagent-driven.md`。
- **Known Gotchas 是最高价值板块**：坑点「一句话 + 锚点」上 SKILL.md、详情留 `references/`——全量上 SKILL.md 会变成坑点百科，全量留 references 则任务路径上看不到。判断标准：**「下次 Agent 走正常任务路径时，会自然读到这条经验吗？」**

### 2.6 Task Anchor：让 Agent 在 session 内围绕目标持续执行

- 问题：Agent 命中了正确 workflow，却在多轮调查 / 修改 / 验证中**逐渐偏离本次真正目标**（顺手扩大修改范围、做完一堆步骤但没满足完成标准、同 session 切任务仍沿用旧计划、计划不写「什么证据代表完成」、新证据推翻假设后继续执行过期计划）。
- Task Anchor 三件套：**Goal**（最终要得到什么结果）/ **Boundaries**（范围与边界）/ **Done When**（看到什么证据才算完成）。
- 与 workflow 的关系：**workflow 是模板，Task Anchor + 原生 Plan 是这一次任务的实例**——「很多所谓 skill 本质上是 workflow」。

## 3. 进阶篇：让它在真实长会话里活下来

### 3.1 薄壳（Thin Shell）：跨工具兼容的基石

失败场景：`CLAUDE.md` 里写「formal docs live under `skills/`, read `skills/*/SKILL.md` first」→ 对话到第 40 轮触发 `/compact` → 新任务时这句自然语言已被摘要掉，Always Read 规则全丢，Agent 凭残留记忆直接写代码。

根因：**自然语言指令（「去读 X」）会被压缩器当普通描述丢掉，结构化表格 / 清单会被保留更多。**

薄壳的三块（≤ 60 行，缺一不可）：

| 块 | 内容 | 作用 |
| --- | --- | --- |
| **Quick Routing** | `\| Task \| Required reads \| Workflow \|` 三列表格 + 兜底行 `Other` + 多子任务行 | 压缩后这是 Agent 查「本次该读哪些文件」的唯一线索 |
| **Auto-Triggers** | 事件→动作映射，最关键是「New task in same session → re-read SKILL.md，重新路由」 | 多任务会话的强制重路由 |
| **Red Flags — STOP** | 「就这一次跳过 AAR 吧」→ 立即停 | 压缩后只剩薄壳时，它是**最后一道防线** |

反例（soft-pointer-only）：只写「Please read skills/my-skill/SKILL.md before starting any task」——短会话能工作，长会话 `/compact` 后失效，且**输出看起来仍然合理，用户察觉不到**。

跨工具要点：每个 harness 的入口都要有薄壳（`AGENTS.md` / `CLAUDE.md` / `CODEX.md` / `GEMINI.md` / `.cursor/rules/*.mdc` / `.cursor/skills/<name>/SKILL.md`），**缺哪个入口，那个工具就完全看不见你的 skill**。

### 3.2 两道 hook：机制级护栏（不靠 Agent 自觉）

借鉴 `obra/superpowers`：

1. **SessionStart Hook（防遗忘）**：监听 `startup | clear | compact` 三个事件，自动读取 SKILL.md 并注入 context（`find skills/*/SKILL.md | head -1` → `jq -Rs .` 转义 → 按 harness 输出不同字段名：claude-code `hookSpecificOutput` / cursor `additional_context` / 其他 `additionalContext`）。
   - 边界：hook 只负责重注 SKILL.md，**不**替 Agent 执行 Always Read、**不**自动触发 Task Closure、**不**在会话中途纠偏。
2. **PreToolUse Gate（防违规）**：Agent 要 Edit/Write 核心规则文件（如 `agent-behavior.md`）时，hook 先判断放行与否，**非 0 退出码（`exit 2`）让客户端直接取消这次 Edit**——「无论它多想加、给了多少理由，都不行」。
   - 背景：作者用 10 个对抗性 prompt 测 Haiku 4.5 / Sonnet 4.6，根因是**模型的注意力方向是「回答用户的请求」而不是「遵守规则」**（用户说「我 leader 让我加」「demo 5 分钟后要用」时，模型倾向帮用户而非帮规则）。

分工三角（三者叠加才能扛住长会话 + 多任务 + 多次 compact）：**Session Discipline（重读触发）+ 薄壳 Auto-Triggers（压缩后可见的路由兜底）+ SessionStart hook（清空/压缩事件后自动补弹）**。

作者的现实提醒：hook 也有上限——弱模型照样读不到，而 hook 太多又会限制 Agent 发挥，复杂问题建议用 Sonnet 及以上，别用 Haiku 硬扛。

### 3.3 任务闭环：AAR + 借口表 + Red Flags

- 协议定义：任务在「主体工作完成并验证 + 30 秒 AAR 扫描 + （若触发）按录入标准记录」全部满足前**不算完成**；任何 workflow 不得跳过第 2 步声明完成。
- **AAR 4 问（30 秒扫完）**：新**模式**？新**陷阱**（不提前知道会浪费大量时间）？**缺失规则**？**过时规则**？
  - 触发门槛从「行为变化」改成「**非琐碎任务**」（后者更容易判断对）；跳过条件窄且明确：仅格式化、仅注释、仅依赖版本变更、无新教训的重构。
- **Rationalizations to Reject（借口表）**：把 Agent 在压力下真实说过的借口逐字抄进去。**硬约束：只能从真实失败里加行，禁止凭空扩写**——编造的借口 Agent 不会说，真实的借口更狡猾，混在一起会稀释压力值，下次稍微变形的借口就能绕过。
- **Red Flags — STOP**（必须同时进薄壳）：「这次 AAR 就算了」的念头出现 / 声明完成但没跑 30 秒扫描 / gotcha 写进 reference 但没更新对应 workflow 完成清单 / 修了同类 bug 第二次但规则文件没动。

### 3.4 多子 Agent 保证主 Agent 纯净

- 启用条件（任一）：子任务 ≥ 3 且互相独立 / 单任务吃掉 > 30% 剩余 context / 任务是「探索 + 实现 + review」混合形态 / 即将多小时自动运行。都不满足就内联做（派发有开销）。
- **四阶段**：Plan（每条是一个子任务合约）→ Dispatch（干净 worker，合约原文作 prompt，不带主对话历史）→ **两阶段 Review**（Stage A 查 spec 合规：Outputs 文件 / Forbidden Zones / Acceptance 命令 / 有无 drive-by 改动；Stage B 查质量）→ Merge 或 Reject（Stage A 不过就重派，**不要在主编上下文里内联补**）。
- **子任务合约五个字段（不能空）**：`Goal`（面向结果）/ `Inputs` / `Outputs` / `Forbidden Zones`（不确定默认禁）/ `Acceptance Criteria`（可机械验证的命令，如 `yarn tsc --noEmit`）。
- 禁止项：递归派发 / worker review 自己的产物 / 中途往 worker 上下文塞「澄清」（合约错了就重写重派）/ 只跑一个 Stage /「worker 基本对了，剩下 10% 我在主上下文补」（最污染主上下文的借口）。
- Harness 兼容：只有 Claude Code 有原生 `Task`；Cursor / Codex / Gemini / Copilot 降级为「单上下文按 checklist 模拟」或手动开新会话——降级仍能靠合约 + 两阶段 review 抓住大部分 drive-by 缺陷。

### 3.5 录入知识库：让 skill 越用越聪明（2/3 门槛）

- **Recording Threshold（至少 2/3 通过才录入）**：① 可重复？② 代价高（踩坑成本高）？③ 代码不可见（看代码看不出来）？
  - 实战示例：「Filter 必须在 app init 之前注册」→ 3/3 录入（首次渲染空白 + 30 分钟调试 + 时序依赖从代码看不出）；「Atom 命名约定 xxxAtom」→ 1/3 不录入（不一致不会报错，且现有代码已清晰展示）。
  - 通过阈值的内容：框架生命周期坑（注册时序 / 卸载陷阱）、隐藏的路由依赖、非显而易见的同步或状态重置要求、跨层交互陷阱；不通过：一次性变通、看代码就懂、风格偏好、官方文档已覆盖。
- **泛化规则**：记录必须脱离当前项目上下文也能看懂。改写公式：**具体发现 → 抽象为通用 pattern → 说明不遵守的后果**。
- **录入位置选最轻格式**：一句话 bullet → 一小段加到现有文件 → 新文件（通常不需要）。
- **激活优于存储**：高代价陷阱必须「存储在正确文件」+「激活在会触发它的任务路径上」（workflow 检查项 / SKILL.md Known Gotchas / rules 摘要）。

### 3.6 自我删除与迭代（只增不减必然变屎山）

- **犯错纠正后的根因分类**：规则缺失 → 过门槛新增；规则过时 → **直接更新，无需门槛（过时规则比缺失规则更有害）**；规则废弃 → 走清退；规则未被遵循 → 检查醒目度（可能需要从 references 上浮到 SKILL.md Known Gotchas 或薄壳）。
- **清退**：技术已移除 → 整条删；迁移中 → 加作用域标注（「仅适用于 legacy 模块」）；不确定 → `<!-- DEPRECATED: reason, date -->` 保留 1 个迭代周期再删。
- **评估式拆分**三问（话题可分离？导航困难？拆后各部分能独立存在？）全 Yes 才拆；**评估式合并**三问同理。
- **定期 drift 检查**：用两个真实不同类型的项目（Go CLI + Next.js）跑同一套 Quick Start，`diff -r` 对比——骨架文件（shells / hooks / protocol-blocks）应几乎一样（预期），`rules/coding-standards.md` / `gotchas.md` / `SKILL.md` 的 Common Tasks **应完全不同**（一样说明模板越界，把项目特定内容固化成了默认值）；结果记入 `ANTI-TEMPLATES.md` 的 Homogeneity Drift Log。

### 3.7 内容写作的四条基本功（含 Anthropic 建议）

| 原则 | 反例 | 正例 |
| --- | --- | --- |
| **不陈述显而易见的事** | 通用知识（「SQL 注入是坏事」）写进 skill | 只写项目特有约定、与主流不同的地方、Agent 默认行为会出错的场景。判据：**「资深开发者第一次看你的项目，什么会让他踩坑？」** |
| **避免过度指令化** | 「添加按钮时使用 Tailwind class `bg-blue-500 hover:bg-blue-700`…」 | 「按钮使用项目设计系统 token（见 `rules/frontend-rules.md`）；交互元素必须有可见 hover / focus 态」——**给约束不给具体值，skill 才能多活过几次重构** |
| **利用脚本和代码库** | 让 Agent 每次从零写样板 | 判据：**「这段代码会在多少次任务里被 Agent 重写？」> 2 次 → 写成脚本**（如共享的 48 项 smoke-test 脚本） |
| **保持聚焦 / Skill 也是代码** | 一个 skill 想干所有事 | 拆分信号：description 列 10+ 跨领域触发短语 / Common Tasks 15+ 条 / Agent 常为单一子领域激活整个 skill；且 skill 需要测试—迭代闭环（写 → 测激活 → 测路由 → 压力测试 → 观察失败 → AAR 更新） |

### 3.8 一个 skill 干一件事 + 多 skill 组合

- 强烈提醒：**不要在 GitHub 上拉一堆同类 skill**（重复三遍），否则冲突必然出现；建议少而精 + 自动触发（主动引用会让正确命中率越来越低）。
- 多 skill 五条硬约束：各自独立 `SKILL.md` 入口 / 每个都要 `.cursor/skills/<name>/SKILL.md` 注册 / `primary: true` 标记默认 skill / 跨 skill 通用约定放 `skills/shared/` / **不要强行合并**（合并会让 description 变成万金油）。
- 多 skill 项目的 SessionStart hook 需要**有且仅有一个 `primary: true`**，否则随机注入。
- 组合三模式：**A 嵌入调用**（自己的 workflow 里「调用通用规划 skill」再回到本流程）；**B 直接路由**（Common Tasks 直接指向别人的 workflow，不写 wrapper）；**C 子 Agent 委派**（隔离执行，只要结构化结果回来）。
- 反模式：隐式传递依赖（下游没这个 skill → 静默失败，要么 vendor 要么加「缺 skill 就停下问用户」）/ 循环组合 / 匿名调用（永远写具体 skill 路径）/ 把组合当偷懒借口 / 跳过自己的 Task Closure。

### 3.9 Templates 防结构性遗忘 + 脚本兜底

- 踩坑起点：让 Agent 实时生成脚手架（heredoc 写 SKILL.md / shells / workflows）→ 每次漏一两段，同一个协议五次生成出五个版本。**改成 `cp -R templates/skill/` + 一次 `sed` 替换占位符，Agent 只「填空」不「生成」。**
- 两条铁律：**① 结构可以预制，内容禁止预制**（`{{NAME}}` 机械替换；`<!-- FILL: ... -->` 必须人工/Agent 判断，留空即 bug，收尾用 `grep -rn 'FILL:' skills/{name}/` 兜底）；**② 「一个 Go 后端微服务和一个 React 动画站都会复制这份模板，它们会同意这块内容吗？」**——不会就降级为 FILL 标记或移入 `ANTI-TEMPLATES.md`（明确记录「我们故意不预制」：默认 lint 规则、commit message 格式、预填坑点、目录结构、subagent 样例）。
- **两个脚本**：
  - `smoke-test.sh`：48 项自检（结构 / 行数 / 占位符残留 / 路由完整性 / Cursor 一致性 / 薄壳一致性），**把 SKILL.md 本身当作唯一数据源**——Common Tasks 里新引用的文件不存在会被自动发现。
  - `test-trigger.sh`：读 Common Tasks 自动生成真实用户可能说的提示词，检查 Agent 能否命中 skill（**Cursor 完全靠 description 的语义匹配发现 skill**，因此对 Cursor 最关键；实测即便 Opus 4.6 也有漏命中场景）。
  - 什么时候跑：初次迁移完 / 改过 SKILL.md 或薄壳后 / 上游模板升级后 / 宣布迁移「完成」前。脚本抓不到「description 不够精准」这类语义问题，但 **80% 的失败来自遗忘而非误解**。

### 3.10 文件边界：别让 Agent 把 skill 写成日记本

`references/` 下出现 `2026-04-14-session-notes.md`、`2026-04-15-debugging-log.md` 是严重问题（违反泛化规则、激活优于存储、自维护设计三条）。根因：过度解读「记录」、路径就近、缺少明确归档工作流。**记录位置判断表**：

| 内容类型 | 目标位置 |
| --- | --- |
| 稳定约束 / 通用原则 | `rules/` |
| 陷阱、架构笔记、生命周期坑 | `references/` |
| 有序步骤 / 完成检查清单 | `workflows/` |
| 会话历史 / 调试过程 | **不要写进 skill——用 git / CHANGELOG** |

## 4. 横向对比：它与同赛道方案的位置

### 4.1 定位分析

- **SBA 是一个「meta-skill」（生产 skill 的 skill）**：把它指向任意代码库，产出该项目的专属 `skills/<name>/`；定位是**单一项目的可路由 / 可自维护规则系统**，而不是 agent OS、任务数据库或执行运行时。
- 它解决的是**「规则散落 + 上下文压缩后失忆 + 学到的教训存而不活」**这一段细分问题；覆盖面窄但挖得深（薄壳 / hook / AAR / 录入门槛 / templates 都是可直接抄的构件）。
- 覆盖人群：多 harness 混用（Claude Code + Cursor + Codex + Gemini）的中大型项目团队、被「AI 反复踩同一个坑」折磨的人。

### 4.2 同类对比表（Stars 数据 2026-09-16 GitHub API 直抓）

| 对比项 | **SBA（本文）** | Superpowers | spec-kit | ponytail | Karpathy Skills |
| --- | --- | --- | --- | --- | --- |
| ⭐ Stars | **580** | 287,187 | 137,069 | 139,422 | 213,227 |
| Forks | 49 | 25,682 | 12,277 | 7,489 | 21,601 |
| 技术栈 | Shell + Markdown | Shell | Python | JavaScript | Markdown |
| 许可 | MIT | MIT | MIT | MIT | 仓库无 license 声明 |
| 最近推送 | 2026-08-14 | 2026-09-14 | 2026-09-15 | 2026-09-14 | 2026-04-20（已迁移仓库） |
| 核心思路 | 项目级规则**单体归属 + 薄壳路由 + hook 兜底 + AAR 闭环** | 13+ 可组合 skills 自动触发，TDD / review / 验证强约束 | 规范驱动开发（spec → plan → tasks） | 「lazy senior dev」人格 + 7 层 ladder，少写代码 | 单文件 67 行准则，反 LLM 编码反模式 |
| 学习成本 | 中-高（概念密度大，需自己落地 hooks） | 中-高（结构重，偶发「简单问题被反复问」） | 中 | 低（装完即用） | 极低（一个文件） |
| 适用场景 | 已有较厚项目规则 / 多 harness 混用的团队 | 想要现成工程方法论与流程约束 | 从需求到实现的规范流水线 | 抑制 agent 过度设计、堆抽象 | 只想要一份轻量行为准则 |
| 主要局限 | 星数低、社区小；强依赖 harness hook 能力（弱模型 + 多 hook 会互相拉扯） | 偏重，简单任务流程冗长 | 偏「做新功能」，不解决已有规则治理 | 只治「写多了」，不治「规则读不到」 | 静态提示，不自更新、无路由 |

### 4.3 选择建议

- 📌 **优先选 SBA**：项目规则已散落成多份文档且开始互相矛盾；单文件 SKILL.md 已导航不动；需要「学到教训下次自动生效」的闭环；同时用多个 harness 且不想维护多套规则。
- 📌 **优先选 Superpowers**：想直接拿到一套成熟工程流程（brainstorm → plan → TDD → review），不打算自己设计规则治理体系。
- 📌 **优先选 spec-kit**：新的功能开发流程需要「需求 → 规范 → 任务」的强约束流水线。
- 📌 **优先选 ponytail**：主要痛点是 agent 过度设计 / 加依赖，且希望即装即用。
- 📌 **优先选 Karpathy Skills**：只想加几条行为准则，项目很小 ——这也是 SBA 自己承认的「小项目应该保持小」的立场（临时仓库、少于三份小规则文件的项目不该上 SBA）。

### 4.4 领域趋势

当前 AI 编码工程的主流方向是**「规范 / 技能资产化 + 自动触发 + 可验证闭环」**：spec-kit 把需求资产化，Superpowers / SBA 把「方法论」资产化，两者都强调「过程产物落盘 + 验证不可省」。SBA 在其中的位置偏**项目规则治理层**——顺着主流（结构化、可验证、自动触发），差异化在于它把「上下文压缩后规则会消失」当第一性问题，用薄壳 + hook + AAR 做出了具体答案；这是 Superpowers / spec-kit 文档里较少展开的一段，属于**细分垂直但补位明确**，而不是通用框架竞争者。

## 5. 我能马上用的（对本机 Hermes Skills 的移植清单）

1. **`description` 写成触发条件而非摘要**：列出用户可能说的原话短语 + 激活条件（本机 skills 大多是「一句话摘要」，命中率靠模型猜）。
2. **把「原则 + 检验句」用于规则类 skill**：每条约束补一句生成后可自问的检验（如「这些数据是否全部来自 API 实抓？」），比「必须……否则……」更抗压缩。
3. **Known Gotchas 上浮**：本机 skill 的踩坑多以长段落写在正文中，可改为「一句话 + 指向 `references/` 的锚点」，保证每次都看得见、需要时才深读。
4. **2/3 录入门槛**：判断一次新教训是否值得写进 skill（可重复 / 代价高 / 代码不可见），三中过二才写——直接抑制 skill 文档膨胀。
5. **长任务清单化兜底**：多步骤 workflow 加「Other / unlisted」兜底与「Done When 证据」字段，避免任务跑到列表外就凭感觉。
6. **定期 drift / 行数体检**：行数超标先评估（话题可分离？导航困难？拆后可独立？）再拆，不自动按行数硬拆。

## 6. 避坑（原文附录里最值钱的几条）

- 让 Agent 每次实时生成脚手架 → 必漏段。改成 `cp -R templates/` + `sed`。
- 把「具体业务 spec 示例」预制进 templates → 下游会抄例子不写自己的。让 `<!-- FILL: -->` 逼它思考。
- Rationalizations 表凭空扩写 → 稀释真实借口的压力值。只能从真实失败抄。
- Auto-Triggers 只写在 workflow 里、不写进薄壳 → 压缩后薄壳是最后防线，薄壳丢了就全丢了。
- 薄壳坚持 ≤15 行不肯扩到 ≤60 → 加上 Red Flags + Auto-Triggers 写不下，硬压导致协议碎片化。
- 多 harness 项目缺 `GEMINI.md` / Copilot 入口 → 那些 harness 读不到你的 skill，等于没有。
- **Hook schema 用 flat 格式**：Claude Code CLI v2.1+ 的 PreToolUse 只认嵌套 `hooks:[{type, command}]`；flat 写法「看起来注册了」（启动不报错、debug 能看到 hook 名）但 Edit 时静默不触发，而 SessionStart 恰好两种都吃 → 初期以为一切正常。
- **想用 Claude Agent SDK 子 Agent 测 hook** → 子会话根本不触发 PreToolUse（harness 设计），测出来永远 false negative；只能开新的 CLI 交互会话手动测或抓 `hook_started` 事件。
- **子 Agent prompt 用绝对路径绕过 `isolation: worktree`** → 子 Agent 按绝对路径写回主仓，worktree 被当「干净无变更」清理；「感觉隔离了，实际污染了主仓」。
- 把「Agent 漏读规则」归因成模型笨 → 先用 `/context` 确认文件到底在不在 Memory 里：**能不能拿到 CLAUDE.md 是客户端行为（确定性），能不能遵守是模型行为（概率性）**；补齐客户端路由表比换模型便宜得多。

> 论坛反馈补充：帖子由「开发调优」迁到「文档共建」成为 wiki 帖，社区可补充；评论区主要反馈是「比想象中复杂，像写 user story」——作者的解释可以看作全文最简版本：**这一整套东西的本质就是「让 agent 更快更准确地找到它该找的东西」**。

## 参考

- [[开源项目分析/AI编码工程化/Superpowers-AI编码工程师方法论与Skills框架|Superpowers — AI 编码工程师方法论与 Skills 框架]] — SBA 直接借鉴其 SessionStart hook 与 subagent-driven 思路，本文「组合调用」章节也建议把规划外包给 superpowers
- [[开源项目分析/AI编码工程化/Trellis-AI编码工程框架|Trellis — AI 编码工程框架]] — 同属「给 AI 编码 agent 立规矩」赛道：Trellis 走 4 阶段循环 + spec 学习闭环，SBA 走项目规则单体归属 + 薄壳路由
- [[开源项目分析/AI编码工程化/spec-kit-GitHub官方规范驱动开发|spec-kit — GitHub 官方规范驱动开发]] — 规范资产化的官方解法，与本项目的 templates / FILL 占位思路可互相参照
- [[开源项目分析/AI编码工程化/ponytail-编码效率技能集与多Agent适配|ponytail — 编码效率技能集与多 Agent 适配]] — 同为多 harness 分发型 skill 包，其 benchmark / 自检做法可与本文的 smoke-test / test-trigger 脚本对照
- [[开源项目分析/提示词工程/AI时代的思维框架-潜空间地形模型与提示技巧|AI 时代的思维框架 — 潜空间地形模型与提示技巧]] — 「注意力稀释」解释了本文要解决的根因：长会话中核心指令会被逐步摊平，所以必须靠薄壳 / hook 强制重注
