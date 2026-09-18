---
title: AI 浏览器自动化赛道对比：七大方案全景与选型
description: Playwright / Stagehand / browser-use / browser-harness / BrowserSkill / chrome-devtools-mcp / playwright-mcp 七家横向对比——已收敛为三个范式（确定性驱动 / SDK 编排 / 已登录真浏览器桥接），含关键分歧点、选型建议、领域趋势与数据核验口径
status: active
tags: [browser, automation, ai-agent, agent-tool, comparison, mcp]
related:
  - 开源项目分析/AI浏览器自动化/Stagehand-AI浏览器自动化框架
  - 开源项目分析/AI浏览器自动化/BrowserSkill-复用真实登录态浏览器给Agent
  - 开发工具链/Playwright/Playwright
  - 开源项目分析/AI编码工程化/Skill-Based-Architecture-项目级Skill编写方法论
  - Browser/浏览器多进程模型
---

# AI 浏览器自动化赛道对比：七大方案全景与选型

> 数据采集：**2026-09-18**，本章全部数字为**同一时间窗内 GitHub API 实抓**，横向可比（跨时间窗的数字不可比，见文末「数据核验注意」）
> 覆盖范围：确定性框架 1 家 + SDK 编排 2 家 + 已登录真浏览器桥接 2 家 + MCP 服务 2 家
> 前身：`AI浏览器自动化三强对比-Playwright-Stagehand-browser-use.md`（2026-08-12，仅三家）；2026-09-18 按「同赛道 ≥3 家即建独立赛道页」的规则扩为赛道页并改名

## 一句话

这条赛道已收敛为**三个范式**：确定性驱动（Playwright，零 AI）、SDK 编排（Stagehand / browser-use，你写代码、LLM 补判断）、已登录真浏览器桥接（browser-harness / BrowserSkill，直接接你自己那个 Chrome）；MCP 系（chrome-devtools-mcp / playwright-mcp）是前两个范式对外的标准化出口。

## 七家定位速览

| 方案 | 范式 | 一句话 | 核心接口 |
| --- | --- | --- | --- |
| Playwright（微软） | 确定性框架 | 你写精确选择器，它 100% 按意图执行，零 AI | locator / expect / trace viewer |
| Stagehand（Browserbase） | SDK 编排 | 自然语言表达意图，LLM 决定操作，确定性兜底 | act / extract / observe + locator |
| browser-use（Browser Use Inc） | SDK 编排 | 你把任务扔进去，它自己规划、执行、记忆、完成 | `Agent(task=...).run()` |
| browser-harness（Browser Use Inc） | 真浏览器桥接 | 一条可编辑的 CDP websocket 直连你的 Chrome，agent 缺 helper 就自己写一个落盘 | `browser-harness <<PY … PY` |
| BrowserSkill（腾讯） | 真浏览器桥接 | 把浏览器"租"给 agent：独立 Agent Window，碰你的标签页必须显式借 | `bsk <verb> <noun>` + JSON |
| chrome-devtools-mcp（Chrome DevTools 团队） | MCP 服务 | 把 DevTools 能力包成 MCP 工具，任何 MCP 客户端可调 | MCP tools |
| playwright-mcp（微软） | MCP 服务 | 给 MCP 客户端一个 Playwright | MCP tools |

## 硬数据（2026-09-18 同一时间窗实抓）

| 指标 | Playwright | Stagehand | browser-use | browser-harness | BrowserSkill | chrome-devtools-mcp | playwright-mcp |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ⭐ Stars | 96,287 | 24,323 | 115,000 | 17,644 | 4,259 | 52,212 | 37,217 |
| Forks | 6,456 | 1,686 | 12,655 | 1,729 | 300 | 4,032 | 3,158 |
| Open issues | 184 | 387 | 435 | 357 | 51 | 101 | 3 |
| 语言 | TypeScript | TypeScript | Python | Python | TypeScript + Rust | TypeScript | TypeScript |
| License | Apache-2.0 | MIT | MIT | MIT | MIT | Apache-2.0 | Apache-2.0 |
| 建仓 | 2019-11-15 | 2024-03-24 | 2024-10-31 | 2026-04-17 | 2026-06-22 | 2025-09-11 | 2025-03-21 |
| 最近推送 | 2026-09-18 | 2026-09-18 | 2026-09-15 | 2026-09-12 | 2026-09-17 | 2026-09-17 | 2026-09-17 |

读表要点：**七家全部处于活跃状态**（最近推送都在 6 天内）；星标量级从 4.3K 到 115K 横跨 27 倍，但量级与"是否解决你的问题"基本无关——browser-harness / BrowserSkill 这两家最低星的，恰恰是唯一能接你已登录账号的。

## 三个范式（不是七家，是三派）

### 范式一：确定性驱动 — Playwright

自研浏览器协议（Chromium patch + 自定义 wire protocol），自己管理浏览器进程，协议层是它最深的壁垒。三引擎覆盖（Chromium / Firefox / WebKit）+ 完整 test runner（fixtures、参数化、并行、sharding、重试、trace viewer、UI mode、codegen）。回放 100% 一致，代价是页面结构一变选择器就失效，维护成本落在重写选择器上。

### 范式二：SDK 编排 — Stagehand / browser-use

两家的演化史几乎一样：早期都是"Playwright 封装 + 上层逻辑"，如今各自自研驱动层。

- **Stagehand v4**：已完全脱离 Playwright——自研 CDP 客户端 + chrome-launcher 本地起 Chrome + 浏览器扩展（扩展内执行降低远程调用延迟），自研 locator/page/rpc 层。**v4 移除了内置 `agent()` 编排器**，改推 code mode（coding assistant 写脚本 → 人 review → 运行）+ tool calling 备选；有 inference caching 砍推理成本。API 刻意保留 Playwright 风格（goto / locator / waitForLoadState）降低迁移成本。
- **browser-use**：驱动层拆成独立仓库 browser-harness，主库不再直接依赖 Playwright。主库保留完整 agent 循环（`agent/service.py` 编排 + message_manager 管理对话历史 + 多套 system prompt 变体）+ **12 种 watchdog 自愈**（captcha、弹窗、崩溃、下载、权限、about:blank 等）。

### 范式三：已登录真浏览器桥接 — browser-harness / BrowserSkill

**这是 2026 年下半年新出现的范式，也是本条赛道最重要的变化**：不再造一个干净的隔离浏览器，而是直接接用户那个**已登录、有 cookie、有历史**的真实 Chrome。两家形态同构（CLI + 往 harness 装一份 SKILL.md），但内部哲学几乎相反：

| 维度 | browser-harness | BrowserSkill |
| --- | --- | --- |
| 接入方式 | 连 Chrome 的 CDP 端点（首次要 chrome://inspect/#remote-debugging 打勾，macOS 另需辅助功能权限） | 装 Chromium MV3 扩展作为中介，**不需要开远程调试端口** |
| 隔离 | **无**。文档原话 "treat local Chrome as one shared browser lane"；两个 agent 同时切标签会 race，只能靠串行化纪律 | **强制**。每 session 一个独占 Agent Window；碰用户标签页须显式 `borrow` + 批准 + 归还 |
| 人机接力 | 无协议化交接（连的是真浏览器，你可直接上手，但 agent 无交接点） | `request-help` 一等公民：验证码/登录/确认弹窗明确交还用户，做完继续 |
| 表达力 | **无限**：agent 直接 exec Python，能用任意循环/解码/库 | **有限**：只有 `bsk` 子命令 + 扩展 21 个 tool handler |
| 自我进化 | **有**：agent 把缺失的 helper 写进 `agent_helpers.py` 落盘，下次自动可用；可开 `BH_DOMAIN_SKILLS=1` 累积站点专属 skill | **无**：能力集封闭，靠 CLI 版本迭代（0.3.0 新增 scroll-to / full-page screenshot / wheel） |
| 副作用语义 | 无专门语义（Python 直接跑，重试由 agent 决定） | 有状态机：`effect_state` none/committed/unknown，`unknown` 跨超时保留且禁止盲目重试 |
| 并发模型 | 多 session 共享一个 lane；真并发要上云或起命名 daemon（仍是同一 profile，会再弹授权框） | 多 session 各一个 Agent Window，daemon 每 session 一个队列串行；不同 session 真并行 |
| 云与规模 | Browser Use Cloud：并行多浏览器、代理、隐身、CAPTCHA 解决 | 只有自托管 remote mode（自带 server + 设备配对），**无云**；远程不支持上传/下载 |
| 平台 | Chrome/Chromium 系；文档以 macOS 权限流程为主，未给 OS 支持矩阵 | macOS(ARM+Intel) / Linux(x64+ARM64) / Windows x64；Chrome + Edge，Firefox 计划中 |

一句话概括这个分叉：**browser-harness 是"把浏览器交给一个能力无限的 agent，靠纪律共享"；BrowserSkill 是"把浏览器租给一个能力受限的 agent，靠架构隔离"。** 前者上限更高，后者下限更稳。

### 范式横切：MCP 系 — chrome-devtools-mcp / playwright-mcp

把上面的能力包成 MCP 工具，给任何 MCP 客户端（Claude Code、Cursor、Devin、Codex…）即插即用。它们解决的是"标准化出口"问题，通常不解决"复用我已登录的账号且不打扰我"——客户端一般指向某个浏览器实例（自起或连已有 CDP），默认不带你的登录态。

顺带一个生态信号：browser-harness 自己也出 `browser-harness-mcp`（stdio），即"桥接层"与"MCP 出口"正在互相渗透。

## 四个关键分歧点

1. **隔离怎么解决：架构 vs 纪律 vs 配置。** BrowserSkill 靠不可绕过的所有权协议（`borrow` 批准 + Agent Window 沙箱）；browser-harness 靠行为纪律（一个 daemon 一个 attached tab、复用匹配标签、**绝不自动 `activate_tab`** 抢你前台、多 agent 场景要求串行化）；MCP 系取决于你怎么配。单 agent 顺序干活三者差别不大；**多 agent 并发且你不希望被打断**，目前只有 BrowserSkill 有结构性保证。
2. **表达力上限 vs 可审计下限。** browser-harness / browser-use 让 agent 跑任意代码，能力天花板极高，但"它这次到底干了什么"无法枚举；BrowserSkill 把能力锁在封闭命令集里，可审计、可重放，代价是复杂数据变换得让 agent 另写 shell 脚本。这是「能力上限」与「下限可靠性」的经典取舍。
3. **人机接力有没有协议。** 只有 BrowserSkill 有 `request-help`（0.3.0 起由扩展里两个 profile 级开关管辖，命令行标志已废弃）。其余各家的兜底都是"失败就报错"或"你自己看着办"。
4. **规模化归谁。** 赛道头部三家的开源库都只是获客入口，盈利点是云：Browserbase（Stagehand）、Browser Use Cloud（browser-use / browser-harness）、Playwright Service（微软）。**只有腾讯的 BrowserSkill 不带云**，这也是它唯一能纯自托管的原因。

## 单工具页索引（本条赛道内的对称性说明）

| 方案 | 单工具页 | 备注 |
| --- | --- | --- |
| Stagehand | ✅ [[开源项目分析/AI浏览器自动化/Stagehand-AI浏览器自动化框架\|Stagehand — AI 浏览器自动化框架]] | 事实层：API / v4 架构 / 坑 |
| BrowserSkill | ✅ [[开源项目分析/AI浏览器自动化/BrowserSkill-复用真实登录态浏览器给Agent\|BrowserSkill — 复用真实登录态浏览器给 Agent]] | 事实层：三段式架构 / 会话模型 / 坑 |
| Playwright | ➖ 无评估页 | 本库有使用笔记 [[开发工具链/Playwright/Playwright\|Playwright]]，非项目评估 |
| browser-use / browser-harness | ➖ 无单页 | 事实层资料暂寄在本页范式二/三节 |
| chrome-devtools-mcp / playwright-mcp | ➖ 无单页 | MCP 系未做深度分析 |

> 按「同赛道 ≥3 家建赛道页，单工具页按需补」的规则（见 SCHEMA.md）**缺单页不算缺陷**；任一家做深度分析时补建，并回填本表。

## 选型建议

- ✅ **选 Playwright**：生产级回归测试、跨浏览器兼容矩阵、确定性断言、稳定 CI。没有争议的主场。
- ✅ **选 Stagehand**：把浏览器自动化嵌入产品代码、TS/Go 团队、要可 review 可 diff 的确定性+AI 混合流程、在乎单次操作延迟与成本。
- ✅ **选 browser-use**：整件任务委托（填表/下单/抓数/巡检）、Python 栈、想最快见效、接受黑盒不确定性、需要云端并行规模。
- ✅ **选 browser-harness**：让 agent 用你**已登录**的浏览器 + 单 agent 顺序任务 + 需要无限表达力（愿意让 agent 自己写 helper）；能接受开 Chrome 远程调试端口并在 macOS 授予辅助功能权限。
- ✅ **选 BrowserSkill**：让 agent 用你**已登录**的浏览器 + ① 多 agent 并行 ② "不批准就不能碰我的标签页"的强约束 ③ 需要正规人机接力点 ④ 受管机器禁调试端口但允许装扩展。**注意：别为了"复用登录态"去装它——browser-harness 也能，这不是差异点。**
- ✅ **选 MCP 系**：你已经在某个 MCP 客户端里，只要调试/抓取，不需要你的登录态。
- 🔀 **组合拳**：这七家不互斥。典型配置 = Playwright 管 CI 回归 + browser-harness 管"我的已登录账号 + 需要无限表达力" + BrowserSkill 管"多 agent 隔离与人工接力"。

## 领域趋势

1. **自研 CDP 化**：Stagehand 与 browser-use 在 2025 年双双脱离 Playwright，转向自研 CDP——浏览器驱动层是 agent 工具的核心壁垒，Playwright 兼容 API 只是用户侧表象。
2. **"确定性优先、AI 兜底模糊步骤"成行业共识**：Stagehand 的 code mode 与 browser-use 的 skill 化是同一方向（让模型写确定代码，而非逐步驱动浏览器）。
3. **2026 下半年的新收敛（本版新增）**：CLI + 往 harness 里装一份 SKILL.md + 接你自己的真实浏览器——`browser-harness skill`、`browser-use skill install`、`bsk install-skill` 三家接口同构。上一版（2026-08-12）还没有这个形态。
4. **路线分叉开始显现**：agent 自我进化（browser-harness 的 helper 落盘 + domain skills，其博客称之为 "The Bitter Lesson of Agent Harnesses"）vs 固定能力集（BrowserSkill 的封闭 tool + 版本迭代）。谁赢取决于"可审计"在你场景里的权重。
5. **云是盈利点、开源库是入口**：三家头部皆此模式；自托管需求目前只有 BrowserSkill 认真满足。

## 数据核验注意

- 全部数字为 **2026-09-18 同一时间窗** GitHub API 实抓，非记忆估算、非跨日期拼接。
- browser-use README 声称 "Odysseys leaderboard #1, 87.4%, ahead of OpenAI/Anthropic/Google/Microsoft"。该数字衡量 **browser-use 自家 agent + 指定模型**的组合表现，评测任务集与模型版本口径需读 `browser-use/benchmark` 仓库确认；87.4% 不等于开源库默认配置的稳定性。
- ⚠️ **上一版的一条结论已过时**：2026-08-12 记录 "browser-use 与 Stagehand 均无 LICENSE 文件（API `license: null`），README 声称 MIT"。本次实抓两家均为 **MIT**（有正式 LICENSE）。使用前仍建议自行确认版本。
- BrowserSkill 星数在**当天数小时内**从 4,177 涨到 4,259（+82）。这条赛道处于热度上升期，**星标数字的保鲜期以天计**，引用前务必重抓。
- 标注"文档以 macOS 为主"处，指的是该仓库 README/SKILL.md 的权限流程只写了 macOS 路径，**不代表 Linux/Windows 不可用**——未核验，不做断言。

## 附录：qa-use（Browser Use 官方 AI 测试参考实现）

- 定位：browser-use 生态的"能力展示样板间"——自然语言写测试步骤 + 成功标准，BrowserUse Cloud API 执行，LLM 判定 pass/fail
- 硬数据（2026-08-12 口径）：589 stars | 74 forks | 26 commits | 2 贡献者（CTO maticzav 25 + CEO gregpr07 1）| 2025-07-22 创建 → 2025-08-08 停更（开发窗口 17 天）
- 核心设计（`engine.ts` 值得读）：测试 = steps（自然语言步骤）+ evaluation（独立成功标准）；SYSTEM_PROMPT 定死规则（严格按序、失败即判、禁止 workaround、终态必须精确匹配）；输出契约 `{status: pass|failing, steps: 已成功步骤, error: 失败原因}`——步骤级失败回溯，可精确归因到第几步
- 结论：当教材读、别当工具用——停更已久、2 人 17 天即止、强绑定付费 BrowserUse Cloud API

## 个人提炼

1. 驱动层（自研 CDP）是 agent 浏览器工具的核心壁垒，Playwright 兼容 API 只是用户侧表象。
2. "确定性优先、AI 兜底模糊步骤"是行业共识写法。
3. 评估 agent 类工具时，README 的 benchmark 数字必须回到原始评测口径核验，不能当作库的默认能力。
4. **2026 下半年最值得注意的不是新工具，而是分发方式的统一**：CLI + SKILL.md 装进 harness + 接真实浏览器。"装一份 skill 到你的 agent"正在取代"让用户写集成代码"，这对工具本身的架构选择有反向压力（谁的能力集更封闭、谁更依赖 agent 自我进化）。
5. 星标量级与场景适配度脱钩：本赛道最低星的 browser-harness / BrowserSkill 恰恰解决了最高星几家结构上解决不了的问题（复用真实登录态 + 不打扰用户）。

## 参考

- [[开源项目分析/AI浏览器自动化/Stagehand-AI浏览器自动化框架|Stagehand — AI 浏览器自动化框架]] — 范式二的单工具事实层
- [[开源项目分析/AI浏览器自动化/BrowserSkill-复用真实登录态浏览器给Agent|BrowserSkill — 复用真实登录态浏览器给 Agent]] — 范式三的单工具事实层
- [[开发工具链/Playwright/Playwright|Playwright]] — 范式一的使用笔记
- [[开源项目分析/AI编码工程化/Skill-Based-Architecture-项目级Skill编写方法论|SBA — 项目级 Skill 编写方法论]] — 解释为何"往 harness 装 SKILL.md"会成为统一分发方式
- [[Browser/浏览器多进程模型|浏览器多进程模型]] — 理解标签页所有权 / Agent Window 隔离 / CDP 按 target 操作的底层前提
- [[开源项目分析/阅读/MattPocock-AI时代软件基础四本书|Matt Pocock：AI 时代软件基础]] — "设计接口，委托实现"与 Stagehand code mode / browser-use skill 化是同一方法论在浏览器自动化上的落地
