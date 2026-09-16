---
title: Pydantic AI — 类型安全的 Python Agent 框架
description: Pydantic 团队出品的 Python Agent 框架，V2 用 capability 单原语统一全部扩展点，全厂商适配 + 端到端类型安全，含官方 10 篇竞品对比页与 V2 破坏性升级的踩坑清单
status: active
tags: [ai, ai-agent, llm-app, agent-framework, python, ai-sdk]
related:
  - 开源项目分析/阅读/Harness工程-Multi-Agent架构实践
  - 开源项目分析/AI编码工程化/Skill-Based-Architecture-项目级Skill编写方法论
  - 开源项目分析/阅读/OpenHands-MetaGPT-Hermes-Kanban对比
  - 开源项目分析/AI浏览器自动化/AI浏览器自动化三强对比-Playwright-Stagehand-browser-use
  - AI/Agent/Agent发展
---

# Pydantic AI — 类型安全的 Python Agent 框架

> 仓库：<https://github.com/pydantic/pydantic-ai>
> 官方文档：<https://pydantic.dev/docs/ai/>
> PyPI：<https://pypi.org/project/pydantic-ai/>
> 配套 Harness：<https://github.com/pydantic/pydantic-ai-harness>
> 采集时间：2026-09-16（全文数字均为当日 GitHub API / raw 实抓，非记忆估算）

## 一句话定位

Pydantic 团队（Pydantic Validation 作者，同时也是 OpenAI SDK、Anthropic SDK、LangChain、Google ADK 的校验层依赖方）做的 Python Agent 框架，自我定位已从「agent 框架」升格为 **「How Python does AI」的 Python AI SDK**：一个纯类型化的 Agent 循环，所有模型都能用一个字符串切换，同一定义可跑 CLI / Web / 语音 / 后台队列。

## 项目总览（2026-09-16 实抓）

| 维度     | 数据 / 评价                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| 项目类型 | Python Agent 框架 / Python AI SDK（AG 框架赛道）                              |
| 技术栈   | Python >=3.10，MIT，pydantic 生态，OpenTelemetry，uv/pnpm 工具链              |
| 版本状态 | v2.43.0（2026-09-12）；V1 于 2025-09 承诺 API 稳定，V2.0.0 GA 于 2026-06-23   |
| 仓库数据 | 19,976 Stars / 2,719 Forks / 476 Contributors（非匿名）/ 创建 2024-06-21      |
| 活跃度   | 最近 push 2026-09-16（当天）；累计 PR 4,884；已关闭 issue 2,584；PyPI 331 个 release，周级发版 |
| 未关闭   | 633 issues + 266 PRs（合计 899）                                              |
| 文档质量 | 高——官方维护 10 篇竞品对比页 + V1→V2 迁移映射表 + 100% coverage 徽章           |
| 学习价值 | 高——类型系统与 agent loop 结合的教科书级实现，capability 组合模型值得借鉴      |
| 技术壁垒 | 中高——壁垒不在算法，在「Pydantic 全生态 + 全厂商适配 + durable execution」的整合厚度 |
| 商业价值 | 高——背后是 Pydantic 的商业链条（Logfire 可观测性 4,476 Stars、AI Gateway、企业支持） |
| 核心创新 | 纯类型化 Agent 循环 + 单一扩展原语 capability + 可拆解的成品 Agent（Harness）   |

## 核心机制（V2 的三个关键设计）

### 1. capability 成为唯一扩展原语

V1 里散落在 `Agent(...)` 上的十几个配置参数，V2 全部收编进 `capabilities=[...]`。一个 `Capability` 可以捆绑 **tools + instructions + hooks + 模型设置**，可复用、可组合、可延迟加载（`defer_loading=True`，模型按需加载，本质就是 Claude Skills 那套思路）。

```python
customer_context = Capability[SupportDependencies](
    id='customer-context',
    description="Who the customer is and what's on their account.",
)

@customer_context.tool
async def customer_balance(ctx: RunContext[SupportDependencies], include_pending: bool) -> float:
    """Returns the customer's current account balance."""
    return await ctx.deps.db.customer_balance(id=ctx.deps.customer_id, include_pending=include_pending)
```

### 2. 成品 Agent 不是黑盒（最值得学的设计）

README 明确写出 `Coder()` 等价于逐项组合的能力列表，「整体用」和「拆开用」是同一套 API：

```python
capabilities = [
    FileSystem('.'), Shell(cwd='.'), RepoContext(), Planning(), SubAgents(...),
    ClearToolResults(), WarnNearLimits(), ToolOutputLimits(),
]
```

这跟多数框架「框架即黑盒」的设计哲学相反——它把「成品 agent」还原为「能力的组合体」，用哪层由使用者决定。

### 3. 端到端类型 + 全接口覆盖

- **类型**：结构化输出（`output_type=`）、类型化依赖注入（`RunContext[Deps]`）、类型化工具（签名 + docstring 直接变 tool schema）；`pydantic-graph` 把同样的类型带到图式工作流。
- **厂商无关**：`Agent('openai:gpt-5')` 换成 `Agent('anthropic:...')` 即完成切换；覆盖 OpenAI / Anthropic / Google / Bedrock / Azure AI Foundry / Groq / Mistral / xAI / Ollama 等，另有 Pydantic AI Gateway 提供单一 key + failover + 成本监控。
- **接口**：CLI（`clai`）、内置 Web chat、Realtime 语音（OpenAI Realtime / Gemini Live / Azure / xAI Grok Voice）、AG-UI / Vercel AI UI 事件流、ACP 编辑器协议（实验性）。
- **可观测**：OpenTelemetry 原生，一行接上 Logfire（含 genai-prices 实时计价）；`pydantic_evals` 用 pytest 的方式测 agent 行为。
- **Durable Execution**：Temporal、DBOS、Prefect、Restate 一方共维护，另有 Kitaru、Airflow 集成；内置 human-in-the-loop 工具审批。
- **衍生能力**：图片生成（独立 `ImageGenerator` + 原生生成工具 + `BinaryImage` 输出类型）、embeddings、MCP、Web Search 等。

## 横向对比（全部为 2026-09-16 GitHub API 实抓）

| 对比项     | Pydantic AI | OpenAI Agents SDK | LangGraph  | CrewAI    | Google ADK |
| ---------- | ----------- | ----------------- | ---------- | --------- | ---------- |
| Stars      | 19,976      | 29,478            | 41,737     | 58,637    | 21,548     |
| Forks      | 2,719       | 4,748             | 7,054      | 8,471     | 4,012      |
| 创建       | 2024-06     | 2025-03           | 2023-08    | 2023-10   | 2025-04    |
| 语言/许可  | Python/MIT  | Python/MIT        | Python/MIT | Python/MIT | Python/MIT |
| 核心思路   | 类型安全 loop + capability | OpenAI 原生 + handoff/guardrail | 图式编排引擎 | 角色-任务 crew + Flow | Google 生态 agent 套件 |
| 上手难度   | 低-中       | 低（最简）        | 中-高      | 低        | 中         |
| 文档质量   | 高          | 高                | 高但偏长   | 高        | 中-高      |
| 更新频率   | 周级发版    | 活跃              | 活跃       | 活跃      | 活跃       |

优劣势：

| 维度       | Pydantic AI                | OpenAI Agents SDK        | LangGraph                  |
| ---------- | -------------------------- | ------------------------ | -------------------------- |
| 最大优势   | 端到端类型 + 全厂商 + 全接口 | 与 OpenAI 平台贴合最紧    | 编排能力最强、生态最大      |
| 最大短板   | Stars 仅头部 1/3，第三方教程少 | 强绑定 OpenAI，跨厂商靠 LiteLLM | 概念负担重，模板代码多，类型安全弱 |
| 差异化点   | capability 单原语 + 可拆解成品 Agent | 最小学习曲线             | deepagents 等上层封装       |

> 官方自己在 `docs/comparisons/` 维护了 10 篇对比页（+LangChain/LangGraph、Claude Agent SDK、Vercel AI SDK、OpenAI Agents SDK、Google ADK、Mastra、LiveKit、Pi、Agno、CrewAI），表格里覆盖「Framework / Features / 各能力」三组维度，可直接当选型素材。注意这是**利益相关方视角**，反向事实需自行交叉验证。

## 选型建议

- ✅ **选 Pydantic AI 当**：技术栈是 Python、团队已在用 FastAPI/Pydantic、需要严格结构化输出与类型安全、不想被单一模型厂商绑住、需要同一定义跑 CLI + Web + 语音 + 后台队列。
- ✅ **选 OpenAI Agents SDK 当**：业务全押 OpenAI、要最小概念量、要最直接吃平台新特性（Hosted tools、Tracing）。
- ✅ **选 LangGraph 当**：工作流复杂且有状态，需要精细编排与人为干预节点，能接受更高学习成本。
- ✅ **选 CrewAI 当**：要快速搭多 agent 演示/原型，不关心类型安全与工程化程度。

## 潜在坑（具体到会踩什么）

1. **V2 是破坏性升级，网上和 LLM 记忆里的 V1 代码大多跑不通。** 典型：`Agent('gpt-5')` 不再自动推断 provider，必须写 `'openai:gpt-5'`，否则直接抛 `UserError`；泛型默认值从 `None` 改为 `object`；`GeminiModel` → `GoogleModel`；`OpenAIModel` → `OpenAIChatModel`；`Agent(builtin_tools=)` → `capabilities=[NativeTool(...)]`。升级前必读 `docs/migration.md`（建议先升到最新 V1 并清空全部 deprecation warning，大部分改动可机械完成）。
2. **核心库和 Harness 是两个包。** memory、subagents、planning、skills、guardrails、coding agent 等能力大多在 `pydantic-ai-harness`（893 Stars，2026-03 才建仓）里；只装 `pydantic-ai` 会误以为「怎么没有 memory」。
3. **周级发版 + PyPI 331 个 release**：生产环境必须锁精确版本，不要用浮动区间。
4. **社区热度确实低一个档次**（CrewAI 58.6k、LangGraph 41.7k vs 20.0k），第三方教程、StackOverflow 答案、招聘市场认知度相应更少；官方文档质量高只能部分弥补。未关闭 issue 633 个，量不小。
5. **社区渠道是 Slack**（挂在 Logfire 下），不是 Discord，中文社区讨论较少。
6. **团队正在主动抢滩**：`docs/comparisons/` 十篇竞品对比页之外，2026-09-15 前后连续合并了「OpenAI Agents SDK 迁移 skill」「Google ADK 迁移 skill」「Vercel AI SDK / Eve 迁移 skill」。对使用者是好事（迁移路径官方化），也意味着迭代会更激进。
7. 下载量数据未能核实——pypistats.org 当日连续返回 429，未写入任何估算数字。

## 结论

**推荐学习，推荐作为 Python 侧 agent 项目的主力选型（视情况）。**

一句话总结：它把 Pydantic 的「类型即契约」搬进了 agent 框架——所有模型、所有接口统一在一个类型化 `Agent` 上，扩展点收敛为可组合的 capability，配套 Harness 把成品 agent 做成可拆解的组合体而非黑盒，是 Python 生态里工程化程度与厂商无关性最强的一档。代价是生态体量仍落后头部框架，以及 V2 重度重构带来的一次性迁移成本。

## 参考

- [[开源项目分析/阅读/Harness工程-Multi-Agent架构实践|Harness Engineering]] — 「Harness」这个词的同源对照：数据研发 Multi-Agent Harness 工程实践，可与 pydantic-ai-harness 的能力分层设计互参
- [[开源项目分析/AI编码工程化/Skill-Based-Architecture-项目级Skill编写方法论|SBA — 项目级 Skill 编写方法论]] — Pydantic AI 的 deferred capability 与 Claude Skills 同构，该文给出的 skill 工程方法论可直接迁移到 capability 设计
- [[开源项目分析/阅读/OpenHands-MetaGPT-Hermes-Kanban对比|OpenHands / MetaGPT / Hermes Agent 对比]] — 另外三家 Agent 框架的任务管理层横向对比，与本篇的框架选型维度互补
- [[开源项目分析/AI浏览器自动化/AI浏览器自动化三强对比-Playwright-Stagehand-browser-use|AI 浏览器自动化三强对比]] — 同赛道横向对比的写法参照；其中 Stagehand 内部也在用 Pydantic
- [[AI/Agent/Agent发展|Agent 发展]] — Agent 架构演进知识图谱，本篇的框架能力项可回填到该图谱的「工具/记忆/编排」分支
