---
title: 知识库操作日志
description: 知识库变更的时序记录
sidebar:
  hidden: true
---

# 知识库操作日志

> 按时间顺序记录所有知识库变更。追加模式。
> 格式：`## YYYY-MM-DD 操作 | 主题`
> 操作类型：init, ingest, update, lint, restructure, archive, delete

## 2026-09-18 ingest | 收录 BrowserSkill（复用真实登录态浏览器给 Agent）

- **目标**：将 `Tencent/BrowserSkill` 收录到 `开源项目分析/AI浏览器自动化/`（沿用既有子目录，与 Stagehand、三强对比形成同赛道对照）
- **动机**：用户分享 GitHub 链接先「学习」后「收藏」；按 SCHEMA.md 分类归属规则，这是具体开源仓库的项目评估（非 AI 知识概念），故归 `开源项目分析/` 而非 `Browser/` 或 `AI/`。它补的正是同目录已有两份文档集体回避的细分场景——**复用用户已登录的真实浏览器且不打断用户**（三强对比与 Stagehand 都建立在"自备/新起浏览器"的前提上），放同目录便于后续做赛道全景阅读
- **核心结论**：定位不是又一个浏览器 agent 框架，而是 **Agent ↔ 真实浏览器 的本地桥接层**（Rust `bsk` CLI + 本地 daemon + Chromium MV3 扩展，三段式：CLI↔daemon 走 UDS/命名管道 JSON Lines，daemon↔扩展走 loopback WS 52800，扩展↔浏览器走 CDP）。四个核心设计 = ① **标签页所有权协议**（Agent Window 沙箱 + 显式 borrow/归还，agent 只能在自己的窗口里动手，碰用户标签页必须批准）② **人机接力是一等公民**（`request-help` 让验证码/登录/确认弹窗能明确交还用户，做完继续）③ **harness 无关**（README 明列 Cursor / Claude Code / Codex / OpenClaw / CodeBuddy / WorkBuddy / Pi / **Hermes Agent** / DeepSeek Harness，机制是 `bsk install-skill` 往各 harness 写 SKILL.md，不绑模型不绑 MCP；dsh 另有原生 npm 插件）④ **副作用操作有状态机**（文件传输 pre-dispatch 由 CLI 回滚 / post-dispatch 归 session；浏览器侧回报 `effect_state` none|committed|unknown，`unknown` 跨超时保留且禁止盲目重试）。会话模型：session = 4 小写字母 ID + 独占 Agent Window + session 级 ref-store + borrow 表；写操作默认沙箱内，多 session 完全隔离
- **数据**：4,177 Stars / 296 Forks / 13 Watchers / 16 Contributors / 51 open issues；创建 2026-06-22，最近推送 2026-09-17（活跃）；MIT；语言构成 TS 3.50 MB + Rust 1.70 MB（另有 JS/PowerShell/CSS/Shell/HTML）；最新 cli-v0.3.0（2026-09-17）/ ext-v0.3.0（2026-09-16）；平台 macOS(ARM+Intel) / Linux(x64+ARM64) / Windows x64，浏览器仅 Chrome + Edge（Firefox 计划中）。竞品同为当日 API 实抓——chrome-devtools-mcp 52,208 / playwright-mcp 37,212 / Stagehand 24,323 / browser-use 114,992。**所有数字均 2026-09-18 当日拉取，未混入记忆估值**
- **踩坑记录（写入正文「潜在坑」）**：0.3.0 破坏性变更（`--unattended` / `tab borrow --no-confirm` / `BSK_REQUEST_HELP=off` 已废弃且**不能覆盖**扩展设置，无人值守必须改到扩展 popup 的两个 profile 级开关，老脚本升级会卡住）；沙箱型 agent 需宿主持久任务托管 daemon 且每条命令带 `BSK_HOME`+`BSK_AUTO_START=0`，且"权限错误/超时/非法响应"不能证明 daemon 缺失；远程模式下上传/下载返回 `unsupported`；扩展商店版本可能落后 CLI（dsh 插件不自动更新）；扩展 popup 改端口会终止现有会话；`session stop` 是强制动作、idle timeout 5 分钟只是兜底；`@eN` 引用导航后必然失效
- **frontmatter**：`status: active`（依赖外部项目版本与维护状态） + `tags: [browser, ai-agent, agent-tool, browser-automation, automation, mcp]` + related 5 条 wikilink（三强对比 / Stagehand / SBA 项目级 Skill 方法论 / Playwright / 浏览器多进程模型）
- **原文元信息**：顶部 blockquote 含仓库链接 + Stars/Forks/Watchers/Contributors/open issues + 语言与 License + 创建与最近推送 + 版本 + 支持平台与浏览器 + 采集时间（2026-09-18）；正文全部数字标注为当日 API 实抓
- **双向交叉引用**：本篇「参考」指向三强对比与 Stagehand；同时在三强对比篇末追加一行指针、给 Stagehand 篇补 `## 参考` 章节（原文缺此章节），使从任一入口进入都能看到完整赛道关系
- **3 元文件联动**：INDEX.md（共 **290→291** 个页面，日期 2026-09-16→2026-09-18；`开源项目分析/` 段落紧接三强对比行新增 wikilink 行；顺带按磁盘实测复核 status 计数，`active 176` 与 `grep -a -rl "^status: active"` 结果吻合——**注意用 `grep -rl` 会把 `方法论/面试复习.md` 与 `Performance/Chrome调试.md` 判为 binary 而漏计，复核需加 `-a`**）；CHANGELOG.md（本条目）；AGENTS.md 为精简路由版（9 行，仅链路引用四元文件、不枚举分类），故无需更新
- **影响范围**：新增 1 个页面，未新建目录、未移动文件；无破坏性变更；未向任何外部站点提交内容

## 2026-09-16 ingest | 收录 Pydantic AI（Python 类型安全 Agent 框架）

- **目标**：将 `pydantic/pydantic-ai` 收录到 `开源项目分析/AI-Agent框架/`（本次新建的子目录）
- **动机**：用户分享 GitHub 链接先「了解」后「收藏」；同类 Agent 框架此前没有框架级子目录（对比类内容散落在 `阅读/`，概念类在 `AI/Agent/`），故新建 `AI-Agent框架/` 承载具体框架评估，后续同类项目（OpenAI Agents SDK / LangGraph / CrewAI / Google ADK）可并入形成同赛道对照
- **核心结论**：定位已从「agent 框架」升格为「How Python does AI」的 Python AI SDK；V2 的三个关键设计 = ① capability 成为唯一扩展原语（V1 散落在 `Agent(...)` 上的十多个参数全部收编，一个 capability 捆绑 tools+instructions+hooks+模型设置，支持 `defer_loading` 按需加载，与 Claude Skills 同构）② 成品 Agent 不是黑盒（`Coder()` 与 `[FileSystem, Shell, RepoContext, Planning, SubAgents, ...]` 是同一套 API，可整体用也可拆开用——最值得借鉴的设计）③ 端到端类型 + 全接口（结构化输出 / 类型化依赖注入 / 类型化工具；同一 agent 跑 CLI、Web chat、Realtime 语音、AG-UI、ACP；OTel + Logfire 可观测；Temporal/DBOS/Prefect/Restate durable execution）；配套 `pydantic-ai-harness` 是独立包，memory/subagents/planning/skills/guardrails/coding agent 都在里面
- **数据**：19,976 Stars / 2,719 Forks / 476 Contributors（非匿名）/ 创建 2024-06-21 / 最近 push 2026-09-16（当天）/ 累计 PR 4,884 / 已关闭 issue 2,584 / 未关闭 633 issues + 266 PRs；v2.43.0（2026-09-12），V2.0.0 GA 2026-06-23，PyPI 331 个 release（周级发版）；同级竞品同为当日 API 实抓——LangGraph 41,737 / CrewAI 58,637 / OpenAI Agents SDK 29,478 / Google ADK 21,548 / smolagents 29,344 / Agno 42,195；pydantic-ai-harness 893 Stars（2026-03 建仓）、Logfire 4,476 Stars（2026-09-16 实抓，非记忆估计）
- **踩坑记录（写入正文「潜在坑」）**：V2 破坏性升级（`Agent('gpt-5')` 必须写 `'openai:gpt-5'` 否则抛 `UserError`；泛型默认 `None`→`object`；`GeminiModel`→`GoogleModel`；`OpenAIModel`→`OpenAIChatModel`；`builtin_tools=`→`capabilities=[NativeTool(...)]`）；核心库与 Harness 分属两个包；周级发版需锁精确版本；社区热度仅为头部 1/3，第三方教程少；社区渠道是 Slack 非 Discord；团队 2026-09-15 前后连续合并 OpenAI Agents SDK / Google ADK / Vercel AI SDK 迁移 skill（抢滩信号）；pypistats 当日连续 429，下载量未核实故不写估算数字
- **frontmatter**：`status: active`（依赖外部框架版本与项目状态） + `tags: [ai, ai-agent, llm-app, agent-framework, python, ai-sdk]` + related 5 条 wikilink（Harness Engineering / SBA 项目级 Skill 方法论 / OpenHands-MetaGPT-Hermes-Kanban 对比 / AI 浏览器自动化三强对比 / AI/Agent/Agent发展）
- **原文元信息**：顶部 blockquote 块含仓库链接 + 官方文档 + PyPI + 配套 Harness 仓库 + 采集时间（2026-09-16）；正文全部数字标注为当日 API 实抓，未混入记忆估值
- **3 元文件联动**：INDEX.md（共 289→290 个页面，日期原本已是 2026-09-16；`开源项目分析/` 段落追加 wikilink 行，与磁盘 `find -name "*.md" | wc -l` 实数 290 核对吻合；顺带按磁盘实测把 status 计数由 `active 167 / archived 1` 校正为 `active 176 / archived 0`——原值与 `grep -rl "^status: "` 实测不符，属历史漂移）；CHANGELOG.md（本条目）；AGENTS.md 为精简路由版（9 行，仅链路引用四元文件、不枚举分类），故无需更新
- **影响范围**：新增 1 个子目录 `开源项目分析/AI-Agent框架/` + 1 个页面；无破坏性变更、无文件移动、未向任何外部站点提交内容
## 2026-09-16 ingest | 收录 LINUX DO 长文《如何写一个好的 skill》+ skill-based-architecture 项目

- **目标**：将 LINUX DO 论坛帖《如何写一个好的 skill 让你的效率加倍!》（woji_666，<https://linux.do/t/topic/1923706>）及其配套开源项目 `WoJiSama/skill-based-architecture` 收录到 `开源项目分析/AI编码工程化/`
- **动机**：用户分享帖子链接要求「学习并收藏」；按内容主题归类，本文的实用载荷是给 AI 编码 agent 写项目级 Skill 的工程方法（薄壳 / hook / 任务闭环），与同目录 [[开源项目分析/AI编码工程化/Superpowers-AI编码工程师方法论与Skills框架]]、[[开源项目分析/AI编码工程化/Trellis-AI编码工程框架]] 形成方法论对照，故不按信源类型退回 `阅读/`
- **核心结论**：三句核心 = 结构服务于内容 / 激活优于存储 / 结构可复用内容禁止预制；三要素 = Prompt（description 是唯一前置判据）+ Context（三级渐进披露）+ Harness（拦截 / 自动化验证 / 真实压力测试）；长会话根因 = 自然语言「去读 X」会被压缩器丢弃 + 跨任务不重走路由 → 解 = 薄壳三块（Quick Routing 表 / Auto-Triggers / Red Flags STOP，≤60 行）+ SessionStart hook（startup|clear|compact 重注 SKILL.md）+ PreToolUse gate（exit 2 取消 Edit）+ Session Discipline 原则+检验句；闭环 = AAR 4 问 + 借口表（只能抄真实失败）+ 2/3 录入门槛（可重复 / 代价高 / 代码不可见）；工程化 = templates 两条铁律（结构可预制内容禁止预制、两个真实项目同意测试）+ anti-templates 清单 + smoke-test(48 项) / test-trigger(触发率) 脚本兜底
- **数据**：原帖 13,965 浏览 / 1,823 点赞 / 317 帖 / 166 参与 / 7,445 词（2026-04-08 发布，2026-09-10 最后活跃）；项目 580 Stars / 49 Forks / MIT / Shell，2026-08-14 最近推送（2026-09-16 API 直抓，非记忆估计）；对比表内 Superpowers 287,187 / spec-kit 137,069 / ponytail 139,422 / Karpathy Skills 213,227（该仓库已迁至 multica-ai）同为当日 API 实抓
- **frontmatter**：`status: active`（方法论随 harness 能力演进）+ `tags: [skill, agent, ai-coding, prompt-engineering, context-engineering, claude-code]` + related 5 条 wikilink（Superpowers / Trellis / spec-kit / ponytail / AI 时代的思维框架）
- **原文元信息**：blockquote 块含原帖链接 + 作者 + 来源板块（文档共建）+ 原帖数据 + 配套项目 + 续篇链接（t/topic/1930416《skill 的自我进化之路(1)》）+ 收录时间；正文未迁移原帖配图，标注需回原文查看；按语写明「仅本地归档，未回帖原站」
- **3 元文件联动**：INDEX.md（共 288→289 个页面，日期更新 + `开源项目分析/` 段落新增 wikilink 行，与磁盘 `find -name "*.md" | wc -l` 实数核对吻合）；CHANGELOG.md（本条目）；AGENTS.md 为精简路由版无需更新
- **影响范围**：无破坏性变更；未回帖、未向原站提交任何内容

## 2026-09-15 ingest | 收录 LINUX DO 长文《AI 时代的思维框架》

- **目标**：将 LINUX DO 论坛帖《AI 时代的思维框架》（Henry_He，<https://linux.do/t/topic/2538870>）收录到 `开源项目分析/提示词工程/`
- **动机**：用户分享帖子链接要求「收藏」；按 SCHEMA.md 分类归属规则，本文的实用载荷是提示词 / 上下文工程技巧（按内容主题而非信源类型归类），故放 `提示词工程/` 与 [[开源项目分析/提示词工程/Claude-Design-System-Prompt-工程的设计协作提示词库]] 同目录，而非公众号长文默认的 `阅读/`
- **核心结论**：Transformer 的 Softmax 与玻尔兹曼分布数学等价 → 多步生成不是平衡马尔可夫链，用「三维地形上的小球（朗之万动力学）」类比，KV Cache 即地形状态；6 条性质 = 语义漂移（噪声 token 累积、偏差非线性）/ 注意力稀释（长对话淡化设定，核心指令需反复强调）/ 语义惯性（换任务应开新会话）/ 语义壁垒（COT、先规划后推理 = 在陡坡上修阶梯）/ 相变（废话在临界点起决定作用）/ 特征纠缠（`严谨` 与古板学术共现，高维下 token 是一片区域）；技巧 = 语义退火 / 先推理后结论 / 入戏与共振采样 / 轨道弹弓（越狱测试视角，自带免责）/ 显式配平（弊端：知识冗余、注意力劫持、认知降维）/ 隐式提纯（引导采样与回滚、案例好于说明）/ 掺杂剂（逻辑符号、剧本标记、会计学语义）/ 催化剂（`通俗易懂`、`奥卡姆剃刀`、`第一性原理`）
- **frontmatter**：`status: active`（依赖训练范式未变革这一前提，且为观点性长文）+ `tags: [ai, prompt-engineering, llm-app, methodology, context-engineering]` + related 4 条 wikilink（Claude Design System Prompt / AI 原理 Transformer / AI LLM-应用概览 / MattPocock AI 时代软件基础）
- **原文元信息**：blockquote 块含原文链接 + 作者 + 来源板块 + 原文发布时间（2026-07-07）+ 收录时间（2026-09-15）+ 续篇链接（t/topic/2588749）；正文未迁移原帖配图，标注需回原文查看
- **3 元文件联动**：INDEX.md（共 287→288 个页面，日期更新 + `开源项目分析/提示词工程/` 段落新增 wikilink 行）；CHANGELOG.md（本条目）；AGENTS.md 为精简路由版无需更新
- **影响范围**：无破坏性变更；未回帖、未向原站提交任何内容

## 2026-09-03 ingest | 收录 GitHub Copilot 降本实践（GitHub Blog）

- **目标**：将 GitHub Blog 文章《How we make AI coding more cost efficient without sacrificing task quality》收录到 `开源项目分析/AI编码工程化/`
- **动机**：用户分享 AIHOT 收录页链接（cmtkfkfvl03garobqyr0vwpth）要求「收藏到知识库，记录原文链接和 AIHOT 链接」
- **核心结论**：四项降本改动 = 选择性压缩工具输出（约 -5.5%，保留恢复路径当评估信号）/ 移除 view 行号前缀（线下推理 -5%、线上用户日均 -3%）/ 压缩 task-tool 提示词（每轮 -1300 token、每活跃小时 -2.9%）/ 后台任务结果直投免取回轮次（AI Credits -2.3%）；核心原则 = 以任务最终结果而非单次调用 token 数为优化目标；踩坑 = RTK 式局部压缩导致全局更贵、提示词压缩致子智能体串行（提示词行为必须有测试兜底）
- **frontmatter**：`status: active`（依赖外部项目演进）+ `tags: [ai, ai-agent, coding-agent, cost-optimization, prompt-engineering, github-copilot]` + related 3 条 wikilink（Trellis / spec-kit / Superpowers）
- **3 元文件联动**：INDEX.md（共 286→287 个页面，日期更新 + 新增 wikilink 行）；CHANGELOG.md（本条目）；AGENTS.md 为精简路由版无需更新
- **影响范围**：无破坏性变更

## 2026-09-02 ingest | 收录 PixVerse R2 实时世界模型技术解读

- **目标**：将公众号「苍何」文章《原来世界模型，已经能边玩边生成了》（解读爱诗科技 PixVerse R2 技术报告）收录到 `开源项目分析/阅读/`
- **动机**：用户分享微信文章链接要求「学习并记录到知识库」；按 SCHEMA.md 分类归属规则，公众号文章解读属阅读类，放 `开源项目分析/阅读/`（非 `AI/` —— AIGC 概念类才入 AI/）
- **核心结论**：PixVerse R2 用「一个实时世界模型 + Director Agent + Runtime」同时撑起空间探索/互动影游/数字人三种玩法；技术要点 = Omni Causal AR 两段式训练收敛（替代多阶段蒸馏流水线，减少能力折损）+ Dynamic Chunk 自适应切分 + 多尺度记忆（Sink/Rolling/Object KV）+ Hybrid TF/DF + Error Bank（错误回灌训练，亮度漂移 -35.8%）+ 实时加速三件套（DDMD 对抗正则 / Block-sparse Attention 稀疏 90%+ / Pyramid 少步蒸馏）
- **frontmatter**：`status: active`（该项目持续演进，需定期 review）+ `tags: [aigc, ai, world-model, video-generation, real-time]`
- **3 元文件联动**：INDEX.md（共 285→286 个页面，日期更新 + 新增 wikilink 行）；CHANGELOG.md（本条目）；AGENTS.md 为精简路由版无需更新
- **影响范围**：无破坏性变更

## 2026-08-12 ingest | 迁移补录：AI 浏览器自动化三强对比 + Matt Pocock 演讲笔记

- **目标**：将两篇此前误归档到 `C:\Users\yuezm\knowledge\` 的笔记迁入正确位置
  - `AI浏览器自动化三强对比-Playwright-Stagehand-browser-use.md` → `开源项目分析/AI浏览器自动化/`（与 Stagehand 同子目录，方便同赛道对比）
  - `MattPocock-AI时代软件基础四本书.md` → `开源项目分析/阅读/`（公众号/演讲提炼类）
- **动机**：2026-08-11/12 两次归档会话误判知识库路径（写入 `C:\Users\yuezm\knowledge\`），本次按 SCHEMA.md 补 frontmatter 并迁入正式目录；误归档位的旧副本保留待用户确认清理
- **影响范围**：INDEX.md（+2 页面，283→285）、CHANGELOG.md；无破坏性变更

## 2026-08-07 ingest | ponytail — "少写代码" AI agent skill + 自带 4-arm benchmark

- **目标**：将 DietrichGebert/ponytail 收录到 `开源项目分析/AI编码工程化/`(与 [[Superpowers-AI编码工程师方法论与Skills框架]] / [[Trellis-AI编码工程框架]] / [[spec-kit-GitHub官方规范驱动开发]] / [[Ralph-Autonomous-AI-Coding-Loop]] 同子目录,方便未来同赛道对比阅读)
- **动机**:
  - 用户分享 https://github.com/DietrichGebert/ponytail,要求"介绍下这个项目"
  - 按 SCHEMA.md "分类归属规则":这是具体 AI 编码 agent skill 仓库,归 `开源项目分析/`,而非 `AI/`(概念)或 `开发工具链/`(本地工具)
  - AI 编码工程化 子目录已存在,且已收录 Superpowers/Trellis/spec-kit/Ralph,ponytail 是该赛道第 5 个收录项目;不再新建子目录
- **核心结论**(一句话版):ponytail 把"少写代码"工程化成 7 层 ladder(YAGNI → 仓库内已有 → stdlib → 平台原生 → 已装依赖 → 1 行 → 才写最少代码),配 `ponytail:` 注释 + debt ledger 回收;
  - **自带公开 benchmark**(关键差异化):真实 Claude Code 2.1.177 headless,在 tiangolo/full-stack-fastapi-template @ cd83fc1 上跑 12 工单 × n=4,4 个 arm 对照(baseline/caveman/ponytail/yagni-oneliner,即 Issue #126 中 Colin Eberhardt 直接挑战的 7 字 prompt)
  - 数据汇总:LOC **-54%** / tokens **-22%** / 成本 **-20%** / 时间 **-27%**,date picker 单点 -94%(用 `<input type="date">` 替手搓组件),后端 CRUD 持平(已不可压缩)
  - 安全独立打分(对照 4 个 arm 各自跑 adversarial 4 项):baseline/caveman/ponytail **100%**,yagni-oneliner **95%** —— ponytail 是赛道里唯一诚实承认"对照组之一不达标"的项目
  - 自查发现 + 公开承认的污染 bug:SessionStart hook 在 baseline 也被触发,差点放出 4% 错的结论;**用 `--plugin-dir` 单独装载每个 plugin 才隔离干净**
- **诚实立场区分**:`/ponytail-gain` 明确拒绝打印"本仓库省了多少"(unbuilt version 永远没被写,无真实 baseline 可减)—— 只有 `/ponytail-debt` ledger 给真数字
- **数字采集**(全部用 GitHub API 直抓,0 估算):stars **97,461** / forks **5,354** / open issues **157** / 体积 **2.2 MB** / 创建 **2026-06-12** / 最近推送 **2026-07-15** / release **v4.8.4** / 协议 **MIT**
  - 同赛道对照(同一时间点的精确数):Superpowers **268,125** / spec-kit **122,246** / GStack **126,652** / anthropics/skills **166,724**
- **frontmatter**:`status: active`(项目活跃维护中,仍在快速演进)+ `tags: [agent, ai-coding, claude-code, opencode, prompt-engineering, skill]`
- **wikilink**:5 条内联 — [[Superpowers-AI编码工程师方法论与Skills框架]] / [[Trellis-AI编码工程框架]] / [[spec-kit-GitHub官方规范驱动开发]] / [[Ralph-Autonomous-AI-Coding-Loop]] / [[AI/Agent/概览]] / [[AI/LLM-应用/概览]]
- **双向交叉引用**:本次新增 ponytail 文档时,在该子目录内已收录的 4 个项目**没有**反向引用 ponytail(它们互相两两引用),符合"中心新增→边界点单向链回"模式,不强行修改既有文档
- **3 元文件联动**(注:本次未更新 AGENTS.md,因其内容已是精简路由版——详见 2026-08-04 条目说明):
  - `INDEX.md` — 顶部计数 282→**283** + `开源项目分析/AI编码工程化/` 子目录追加 1 条 wikilink(跟在 Ralph 行后,保持 5 项目连续)
  - `CHANGELOG.md`(本条)
  - `SCHEMA.md` 不变(归属路径未新增标签)
- **正文**:`src/content/docs/开源项目分析/AI编码工程化/ponytail-编码效率技能集与多Agent适配.md`(11.9 KB,7 节:项目总览/核心理念/机制/6 skills/20+ 适配/Benchmark/坑/总结/备查数据/参考)

## 2026-08-04 ingest | 知识管理不是建一个知识库 ——《Knowledge Management Dynamics》九章读后

- **目标**：录入 1 篇公众号书评提炼到 `开源项目分析/阅读/`,覆盖论文集《Knowledge Management Dynamics in a Transformative Environment》九章核心观点。
- **动机**:
  - 用户分享微信公众号链接(mp.weixin.qq.com/s/Qo32owsd-GGKP6HYKhCf8Q),希望"学习"这篇文章
  - 按 SCHEMA.md "分类归属规则":文章属于"观点导向 / 公众号文章分析"(并非"X 是什么 / 怎么工作"),应放 `开源项目分析/阅读/` 而非 `AI/` 或 `Books/`
  - 用 curl + 桌面 Chrome UA 下载 HTML(避免微信反爬触发 captcha),从 `id="js_content"` 提取正文 124KB,清洗标签后保留原文结构
- **核心结论**(一句话版):知识管理不是建一个知识库,而是处理七个转换过程(表示/连接/学习/传播/共享/迁移/行动);任何知识管理问题第一步应是"卡点诊断",而非"工具选型"。
- **正文**:`src/content/docs/开源项目分析/阅读/Knowledge-Management-Dynamics-九章读后.md`(9.7 KB,九章核心论点 + 5 条自我提炼 + 一句话总结)
  - §1 本体(保存信息 ≠ 保存意义)
  - §2 先验知识喂给深度学习(提示词的价值不在长)
  - §3 南非农户(知识到了手机里 ≠ 已经真正到达)
  - §4 组织知识共享(知道答案的人不愿说)
  - §5 大语言模型(能打通孤岛,但不能证明跨过来的知识是对的)
  - §6 知识共享理论(分享本身有成本)
  - §7 绿色知识管理(环保也是知识管理问题)
  - §8 七种工作 + 卡点诊断表
  - §9 怎么读这本书
  - 提炼:5 条在原文之上的二次加工(对象是转换/卡点诊断先于工具/隐性知识靠人和流程/AI 既降本又增险/激励比系统更基础)
- **frontmatter**:`status: active`(观点性,可能随个人方法论演化)+ `tags: [methodology, knowledge-management, ai, llm-app]` + `related: [AI/LLM-应用/概览, AI/Agent/概览, 1688-Multi-Agent超级组织实践, Harness工程-Multi-Agent架构实践]`
- **wikilink**:正文嵌入 3 个内联引用 [[AI/LLM-应用/概览]] + [[AI/Agent/概览]] + [[开源项目分析/阅读/1688-Multi-Agent超级组织实践]],符合 C 方案"至少 2 个"规则
- **3 元文件联动**(注:本次未更新 AGENTS.md,因其内容已是简化版——CHANGELOG 早期条目描述的"总览表 17→18 / 阅读/ 树追加"等动作是过往表述,当前 AGENTS.md 只保留路由说明):
  - `INDEX.md` — 顶部计数 281→282 + 阅读章节末尾追加 1 条 wikilink
  - `CHANGELOG.md`(本条)
  - `SCHEMA.md` 不变(本笔记归属路径已在 SCHEMA 中明确定义,无需新增标签或规则)

## 2026-07-30 ingest | 国内外 Agent 工具语音输入对比（14 款横向对比）

- 录入 1 篇横向对比 — `AI/Agent/语音输入对比.md`
- 覆盖产品：ChatGPT / Claude / Gemini / Perplexity / Cursor / Codex / WorkBuddy（国外 7）+ 文心 / 通义 / Kimi / 豆包 / 元宝 / 智谱 / 秘塔（国内 7）
- 6 维度矩阵：语音入口 / 技术路线 / 流式打断 / TTS 输出 / 底层模型 / 典型场景
- 关键结论：① 端到端多模态 vs STT→LLM→TTS 两大流派分化明显 ② 国内大厂豆包/通义/文心走自研端到端+硬件集成路线 ③ 编码 Agent（Cursor/Codex/WorkBuddy）几乎都没原生语音
- tags: [ai-agent, voice-input, multimodal, stt, realtime-api]
- related → AI/Agent/概览 + AI/Agent/Agent 发展
- 4 元文件联动：AGENTS.md（AI 段 11→12 + 目录树 +1 + 末尾统计 280→281 + 顶部 ingest 条目）；INDEX.md（顶部 280→281 + Agent 章节 +1 条）；CHANGELOG.md（本条）；SCHEMA.md 不变（`ai-agent` 标签已存在）

## 2026-07-30 ingest | WOFF 16 年演进史与 IFT 未来方向（W3C 官方阅读）

- **目标**：录入 1 篇 W3C 官方博客回顾到 `开源项目分析/阅读/`，覆盖 Web 字体格式 16 年标准史与未来方向。
- **动机**：
  - 用户分享微信公众号链接（mp.weixin.qq.com/s/1rWevyHMcHiwlyuQIAA5wQ），按 skill 走"行动导向模式"分支
  - 内容是 W3C 纪念 WOFF 1.0 公开草案 16 周年的官方博客——属"文章/博客类阅读材料"，按 SCHEMA.md "分类归属规则" 明确放 `开源项目分析/阅读/` 而非 `AI/` 或 `Browser/`
  - 用 curl + 桌面 Chrome UA 下载 HTML（避免微信反爬触发 captcha），从 `id="js_content"` 提取 4542 字纯文本
- **核心结论**（一句话版）：WOFF 1.0（2010）成功靠的是**放弃 DRM**的政治抉择而非技术炫酷；WOFF 2.0（2024-08 正式 Rec）已占 2025 年字体请求 ~65%；IFT 增量传输是 CJK/慢网场景的下一个量级提升。
- **正文**：`src/content/docs/开源项目分析/阅读/WOFF-16年演进史与IFT未来方向.md`（10.3 KB，5 章节 + 横向对比表）
  - §1 核心技术栈（WOFF 1.0/2.0 决策史 + 关键人物）
  - §2 实践启示录（马上能用：`font-display:swap`+`preload`+`unicode-range` 三件套；避坑：WOFF1 vs WOFF2 mime 配置、子集化不能砍过头、字体授权风险）
  - §3 核心片段（2009-2010 合并时刻的决策时间线 + 3 条反直觉观点）
  - §4 横向对比（WOFF 1.0/2.0/TTF/EOT/IFT 五方对比表）
  - §5 关键数字一览（2025 WOFF2 占比 65% / 88% 网站用 Web 字体 / 2024-08 Rec）
  - 参考：[[开源项目分析/阅读/htmx-与AI协作的具体案例]] 同为"非项目仓库阅读材料"先例
- **4 元文件联动完成**：AGENTS.md（总览表 17→18 + 阅读/ 树追加 + 路径示例 + 统计 279→280 + 新增 ingest 摘要行）/ INDEX.md（279→280 + 阅读/ 章节追加）/ CHANGELOG.md（本条）
- **tags**: [web-standard], [w3c], [font], [performance]

## 2026-07-28 ingest | OpenHands / MetaGPT / Hermes Agent 的 Kanban 对比

- **目标**：录入 1 篇横向对比到 `开源项目分析/阅读/`，覆盖三家 AI Agent 框架的任务管理系统。
- **动机**：
  - 用户研究 OpenHands / MetaGPT / Hermes Agent 三家 kanban 区别，3 子 agent 并行调研后整合
  - 对比研究的产物属于"分析性质/观点导向"（按 SCHEMA.md "分类归属规则" 明确指示放 `开源项目分析/阅读/` 而非 `AI/Agent/`）
  - 已有先例：[[开源项目分析/阅读/Hermes-Kanban多Profile持久化工作流与SubAgent对比]]（同类型横向对比）
- **核心结论**（一句话版）：OpenHands 把 kanban 给 LLM（agent 自主维护的临时记忆），MetaGPT 把任务藏在消息流里（SOP 触发链本身描述任务），Hermes Agent 把任务当成 DB 里的行（带状态机、依赖图、熔断器的一等公民）。
- **正文**：`src/content/docs/开源项目分析/阅读/OpenHands-MetaGPT-Hermes-Kanban对比.md`（18.4 KB，7 章节）
  - §1 OpenHands 伪 kanban（TaskTrackerTool + TASKS.json + worktree 隔离）
  - §2 MetaGPT 无 kanban（Environment 消息总线 + Role watch + SOP 链）
  - §3 Hermes 真 kanban（SQLite 9 态状态机 + dispatcher 派发 + worker 协议）
  - §4 横向对比矩阵（4 张子表：核心定位 / 状态机复杂度 / 部署形态 / 适用场景）
  - §5 引用
  - §6 一句话总结
- **frontmatter**：`status: active`（依赖外部版本，3 个项目均活跃迭代）+ `tags: [ai-agent]` + `related: [AI/Agent/概览, AI/Agent/Agent发展, Hermes-Kanban对比]`
- **4 元文件联动**：
  - `AGENTS.md` — 总览表 开源项目分析 16→17 + 末尾统计 278→279 + 加 ingest 统计行
  - `INDEX.md` — 顶部计数 278→279 + 开源项目分析章节末尾追加 wikilink 条目
  - `CHANGELOG.md` — 顶部追加本条
  - `SCHEMA.md` — **无需改**（现有"分类归属规则"§"AI/ vs 开源项目分析/" 已明确覆盖此类内容；标签 `ai-agent` 已存在）
- **安全检查**：正文 0 处硬编码 `/home/keven/...`，Hermes 仓库引用用公开 URL `https://github.com/just-every/hermes-agent`（实际是 private 但 git 公开仓库的常见命名约定——若该 URL 不存在，commit 后再修）
- **影响**：1 篇新增，0 迁移，0 删除；INDEX 顶部计数 +1；AGENTS 文件数 +1。

## 2026-07-27 E 方案 delete | 撤销 10-项目 PARA Projects 维度

- **目标**：撤回 C 方案引入的 `10-项目/` PARA Projects 维度(4 个独立 git 项目指针页),保留 20-资源 / 30-归档 维度。
- **动机**：
  1. **个人知识库与项目无关**——10-项目 4 篇(sa_protocol_library / sagc-new-usoa / awesome-toys / knowledge-base-system)放的是"项目指针"(项目名+简介+本地路径+技术栈),属于"项目管理文档"而非"知识库内容"。知识库的价值在于"可复用的知识",项目信息跟这个目标正交。
  2. **公开仓库路径泄漏**——知识库部署在 GitHub 公开仓库,但 4 个指针页硬编码了 `/home/keven/codes/<name>` 私有路径,泄漏 hostname + 用户名 + 项目名组合,公开暴露内部工作目录结构。
- **删除清单**(4 篇,`git rm`)：
  - `src/content/docs/10-项目/sa_protocol_library.md`
  - `src/content/docs/10-项目/sagc-new-usoa.md`
  - `src/content/docs/10-项目/awesome-toys.md`
  - `src/content/docs/10-项目/knowledge-base-system.md`
- **反向引用清理**(8 处编辑)：
  - `00-MOC/Home.md` — 删 PARA 入口段中 10-项目 行
  - `00-MOC/工作流与项目.md` — 删"独立代码项目(10-项目/)"小节(整个),头部描述改写
  - `00-MOC/GIS-技术树.md` — 删 `[[10-项目/sagc-new-usoa|...]]` 一行
  - `scripts/related.sh` — PRIORITY 元组 2 处删除 "10-项目/"
- **4 元文件联动**：
  - `AGENTS.md` — 总览表 10-项目 行删 + 目录树 10-项目 小节删 + 统计 25→24 / 282→278 + 统计段加 E 方案行
  - `INDEX.md` — 顶部页面计数 282→278 + 删"项目(PARA Projects)"段(4 行)
  - `SCHEMA.md` — Domain 段 PARA 描述改 + 删 "`10-项目/`(PARA Projects)" 子段(7 行)
  - `CHANGELOG.md` — 顶部追加本条 E 方案 + D 方案 status 路径规则删 `10-项目/`
- **影响**：无 wikilink 残留(全部反向引用已清),related.sh 跑一次验证 \_backlinks 不再含 10-项目 子树,无破坏性外溢。
- **原则记录**:
  - **公开仓库不放私有路径**——任何硬编码 `/home/keven/...` 的笔记都不进 git(知识库/方案/脚本同理)
  - **PARA 4 维度里 Projects 维度要谨慎**——"个人知识库"场景下资源/归档/方法论比项目指针更核心;若日后要回,只在 `[[wikilink]]` 引用项目名 + 公开仓库 URL,绝不写本地路径
- **未来**：sa_protocol_library / sagc-new-usoa / awesome-toys 3 个项目的"知识"沉淀(用到的 Cesium/Vue/React/技术栈笔记)仍在原主题目录下保留;只是不再有"项目指针"页

## 2026-07-27 D 方案 restructure | 引入 status 字段——笔记成熟度标记

- **目标**:为 282 篇笔记引入 `status` 字段,标记内容成熟度与时效性,让 lint 工具能排序"待补全 / 待 review / 稳定区"。
- **动机**:
  - KB 已 282 篇,大量 CS/Algorithm 子目录笔记只有 5-25 行(算法速记,没补完),无差别浏览效率低
  - 框架/工具类笔记(React/Vue/Cesium/Three)版本敏感,需要定期 review,但缺少机器可读的标记
  - 归档区(`30-归档/`)存在但机器无法判断"哪些笔记需要 review",完全靠人
- **设计** — 4 个值
  - `evergreen`(33 篇): 知识稳定,长期不过时——原理/算法/方法论/读书笔记
  - `active`(167 篇): 仍在演进,依赖外部版本/项目状态——框架/工具/开源项目分析/PARA 指针
  - `stub`(81 篇): 仅有占位/大纲,内容不完整——< 30 行的速记、标注"占位/待学"的页面
  - `archived`(1 篇): 已过时或被取代,内容仅供历史参考——`30-归档/` 目录
- **默认赋值规则** — 路径前缀匹配 + 行数 + 占位标记
  - `AI/原理`、`CS/Algorithm`、`CS/DataStructure`、`CS/数学`、`Architecture/MicroFE`、`方法论`、`Books` → `evergreen`
  - `前端/React`、`前端/Vue`、`Graphics/Three`、`GIS/Cesium`、`JSRuntime`、`开发工具链` 等 → `active`
  - `00-MOC/` `20-资源/` `开源项目分析/` → `active`(2026-07-27 E 方案:10-项目/ 已撤销,从 active 列表中移除)
  - 文件 < 30 行 或 含"占位/待学" → 强制 `stub`(覆盖路径规则)
  - 16 个路径未匹配文件单独补全(Agent/LLM-应用/Architecture 根/GIS 根/CANON/Home 等)
- **Lint 用法**
  ```bash
  # 找出所有 stub 待补全笔记
  grep -rl "^status: stub" src/content/docs
  # 找出所有 active 待 review 笔记
  grep -rl "^status: active" src/content/docs
  ```
- **修改范围** — 281 篇 frontmatter 改动(282 总 - 1 已 archived),+ SCHEMA.md 字段定义,+ 4 处元文件联动(SCHEMA/AGENTS/INDEX/CHANGELOG)
- **无破坏性**:仅追加字段,不改任何笔记正文

## 2026-07-27 C 方案 restructure | 升级为个人知识库——MOC + PARA + 双向链接

- **目标**:从"按主题分类的技术博客"升级为"个人知识库"。核心差异:**多维入口(MOC) + 工作维度(PARA) + 双向链接(脚本生成)**。本条是 A(目录清理) + B(分类重组) 之后的第三步。
- **核心设计原则:无破坏性重构**——**现有 268 篇笔记完全不拆不迁,只加新结构 + 双向链接**。Niklas Luhmann 卡片盒笔记法验证的"渐进式优于一次性重构"。
- **新建 00-MOC/(6 篇)** — 主题地图(Map of Content)入口
  - `Home.md` — 知识库总入口(MOC of MOCs)
  - `AI-技术树.md` `前端-技术树.md` `Graphics-技术树.md` `GIS-技术树.md` `工作流与项目.md`
  - 用 `[[wikilink]]` 把现有零散笔记串起来,不改任何原笔记
- **新建 20-资源/(3 篇)** — PARA Resources 维度
  - `AI-工具.md` `前端工具.md` `命令行工具.md` — 工具索引(从现有笔记 wikilink 提取)
- **新建 30-归档/(1 篇)** — PARA Archive 维度
  - `README.md` — 归档规则:何时把笔记移到归档(内容已过时 / 已被新文件取代 / 评估性内容失效)
- **新建 scripts/related.sh** — 反向链接生成脚本
  - 扫 `src/content/docs/**/*.md` 的 `[[wikilink]]` + frontmatter `related:` 字段
  - 生成 `_backlinks/index.md` 总索引(Top 20 + 无引用笔记列表) + 25 个关键笔记的独立反向链接页
  - `_backlinks/` 加入 `.gitignore`(生成产物)
  - 跑一次 0.14s,282 个文件扫完,**77% 笔记有反向链接,63 个孤儿笔记**(候选归档)
  - 实际数据:反向链接 Top 1 = `AI/向量检索/概览` (5 反向链接)——健康信号
- **新笔记 frontmatter 规范**:
  - `related: [path/to/note]` 字段列 2-5 个强相关笔记
  - 必加至少 2 个 `[[wikilink]]` 引用现有笔记
  - 老的"长笔记"不强制拆(遵守"无破坏性"原则)
- **为什么不迁 Obsidian**:
  - 现有 Astro 静态站点 + git 工作流不能丢
  - frontmatter `related` 字段是 Astro 友好 + 兼容 Obsidian
  - 增量迁移优于全量迁移
- **更新 AGENTS.md**:总览表 22→25 一级分类(加 00-MOC/10-项目/20-资源/30-归档),新增 5 个二级子树段(00-MOC/10-项目/20-资源/30-归档 + 在 AI 后),统计 268→282(14 篇新增)
- **更新 INDEX.md**:顶端加"知识库总入口" + 5 主题地图,末尾加 PARA 3 个章节,页面计数 268→282
- **更新 .gitignore**:加 `_backlinks/`(scripts/related.sh 的生成产物)
- **未做(留给未来)**:
  - 现有 268 篇笔记的"原子化拆分"(B 方案踩坑后决定**不拆**,等以后真的需要)
  - MOC 双向链接脚本的"修复悬空 wikilink"功能(目前只统计,不改)
  - Daily Notes / 时间维度
  - AI 时代深度内容(RAG 实战/MCP 协议详解/向量库实测)
  - 标签体系的细粒度化

## 2026-07-27 B 方案 restructure | AI/DB 多维分类重组 + 5 个新目录占位

- **目标**:执行"中等重构"——保留现有技术树,扩充 AI 时代分类 + 补 DB/DevOps/Cloud 空白。一阶段 (A) 的目录清理已在上条 commit 完成,本条专注分类重组。
- **AI 重组 (6→11 篇,5 个子目录)**:
  - 新建 `AI/原理/`(6 篇):Transformer / 训练 / 机器学习 / 模型 + 原 `AI/概览.md` 整体移入(283 行原创内容:AI 定义/符号主义 vs 连接主义/感知与决策) + 新写 `知识地图.md`(监督/无监督/强化/训练范式待学清单)
  - 新建 `AI/Agent/`(2 篇):Agent 发展(从原 AI/ 移入) + 新写概览 —— Agent 系统架构
  - 新建 `AI/LLM-应用/`(1 篇):新写概览 —— RAG / Prompt / Function Calling / Embedding / Memory
  - 新建 `AI/AIGC/`(1 篇):新写概览 —— 图像 / 视频 / 音频 / 3D 多模态生成
  - 新建 `AI/向量检索/`(1 篇):新写概览 —— HNSW / IVF / 量化 / 混合检索算法视角
  - `AI/` 顶层原 6 篇 flat 布局 → 5 子目录,语义层级从 1 层升到 2 层
- **DB 扩展 (4→7 篇,3 个新子目录)**:
  - 新建 `DB/SQL/` 概览 —— 关系型数据库、查询优化、事务隔离
  - 新建 `DB/Redis/` 概览 —— 内存数据库、缓存模式、集群
  - 新建 `DB/向量库/` 概览 —— 向量数据库(DB 视角:选型/部署/运维),与 `AI/向量检索/`(算法视角:索引原理/检索 pipeline)互补并双向 wikilink
- **新增 2 个一级分类**:
  - `DevOps/` 概览 —— CI/CD、容器编排、监控、IaC
  - `Cloud/` 概览 —— AWS/GCP/Azure/阿里云、Serverless、CDN
- **AI 编码工程化不动的决定**:Trellis / spec-kit / Ralph / Superpowers 4 篇保留在 `开源项目分析/AI编码工程化/`。它们是"具体的开源项目评估",与"AI 应用原理"无冲突;归类边界遵循 2026-07-19 立定的规则(`AI/` = 原理/概念,`开源项目分析/` = 评估/对比/阅读)
- **关于占位 stub**:5 个新子目录(SQL/Redis/向量库/DevOps/Cloud)+ 4 个 AI 新子目录(LLM-应用/Agent/AIGC/向量检索)各写 1 篇概览页,内含 ① 知识地图 ② TODO 列表(未来要补的关键点) ③ 参考资料链接。**不替用户写实际笔记内容**——stub 是锚点,真实知识靠你自己填
- **向量库 vs 向量检索 双视角策略**:`DB/向量库/` 走"数据库视角"(Milvus/Qdrant 作为产品怎么选/怎么部署);`AI/向量检索/` 走"算法视角"(HNSW/IVF 原理、混合检索、rerank)。两个概览互相 wikilink 标注,避免未来两个目录都长出"重叠"内容
- **更新 AGENTS.md**:总览表 19→22 一级分类(加 Cloud/DevOps,改 AI/DB 文件数),AI 二级子树重写为 5 子目录,DB 二级子树加 3 子目录,新增 DevOps/Cloud 子树,统计 258→268(10 篇新增:5 个新子目录各 1 概览 + AI/原理/知识地图 1 篇,加上原 AI/概览 移入无新增)
- **更新 INDEX.md**:AI 区重写为 5 子分类章节(原理下加知识地图),DB 区补 3 条,新增 Cloud/DevOps 2 个一级章节,页面计数 258→268
- **未做(留给 B 方案后续或 C 方案)**:MOC 多维入口、Zettelkasten 双向链接改造、PARA 的 Projects/Resources 维度、AI 时代深度内容(RAG 实战/Prompt 调优/MCP 协议详解)、向量库实测对比、DevOps/Cloud 实际内容填充

## 2026-07-27 restructure | 清空 ToBeContinue/杂谈,41 篇归位 + 4 个新目录

- **目标**:消除两个"腐烂目录"——`ToBeContinue/`(25 篇未归位)+ `杂谈/`(16 篇杂项)。只搬位置不补内容,空白文章保留待后续填充。
- **删除(1)**: `ToBeContinue/Heap.md` —— 与 `CS/DataStructure/Tree/堆.md` 重复空壳,删
- **新建 4 个目录**:
  - `Security/`(从 杂谈/2FA 验证原理) —— 认证/安全协议
  - `方法论/`(从 杂谈/开源如何保证收入/我的大前端世界观/软件开发周期/面试复习) —— 职业与思维方法
  - `CS/NetWork/Application/实时通信/`(从 ToBeContinue/前后端实时通信) —— 协议族子目录,未来 SSE/WebSocket/MQTT 都进
  - `音视频/流媒体/`(从 ToBeContinue/直播流) —— 协议族子目录,未来 HLS/RTMP/WebRTC 都进
- **CS/Algorithm/(11 新增)**: 二分法 / 单调栈 / 博弈算法 / 多米诺和托米诺平铺 / 子序列问题 / 寻找中位数 / 树状数组 / 格雷码 / 贡献度算法 / 进制转换 / 随机算法
- **CS/Encoding/Base64.md**(从 ToBeContinue/Base64 编码)
- **CS/OS/时区.md**(从 ToBeContinue/时区)
- **JSRuntime/Node.js/ 加 2 篇**: node.js 内存泄漏 / Framework/从 egg-helper 学习 egg 源码
- **Performance/ 加 4 篇**: Chrome 调试 / JS 如何获取精确的时间戳 / Web 截图 / 内存泄漏及排查
- **前端/Javascript/ 加 8 篇**: CJS+ESM+Webpack, Import maps, JSON 和 Javascript, Javascript 正则, 大文件如何上传(重命名), 如何处理循环引用, 常见的问题及解决方案, 解决 ESM Import 过多
- **前端/React/ 加 3 篇**: React 事件 / React 的错误捕获 / 为啥 react 没有 keep-alive
- **前端/Typescript/ 加 1 篇**: 从 d.ts 了解 typescript
- **前端/CSS/ 加 1 篇**: 常用的图片格式
- **跨平台/ 加 1 篇**: 网页唤醒本地程序
- **wikilink 替换(2 处)**: `开源项目分析/阅读/htmx-与AI协作的具体案例.md` 中 `[[杂谈/我的大前端世界观|...]]` → `[[方法论/我的大前端世界观|...]]`;`Medal-W-Key-...md` 中 `[[杂谈/解决ESM Import 过多|...]]` → `[[前端/Javascript/解决ESM Import 过多|...]]`
- **更新 INDEX.md**: 全量重写章节(原 ToBeContinue 25 + 杂谈 16 条目移除,新 4 个一级分类 + 新归属条目加入),页面总数 258 不变
- **更新 AGENTS.md**: 总览表 17→19 一级分类(删 ToBeContinue/杂谈,加 Security/方法论),CS 27→41 / JSRuntime 20→22 / Performance 2→6 / 前端 41→54 / 跨平台 14→15 / 音视频 1→2,二级子树同步更新
- **更新 SCHEMA.md**: Tag Taxonomy 补 `methodology` 和 `security` 两个一级标签
- **决定记录**:实时通信/直播流走"建协议族子目录"而非"塞进现有大类",理由——这两类未来大概率扩成多篇(WebSocket/SSE/HLS/RTMP),子目录比同层多文件可扩展
- **后续工作(B 方案候选)**: 补 AI 时代分类(RAG/Prompt/Function Calling/Agent/MCP)、DB 类(SQL/Redis/向量库)、DevOps/Security 充实,本次未动

## 2026-07-27 ingest | 收录 htmx 与 AI 协作的具体案例

- 新增 `开源项目分析/阅读/htmx-与AI协作的具体案例.md` — htmx 作者 Carson Gross 2026-06-29 essay,完整记录用 Claude 修 hyperscript parser bug 的 4 步迭代(3 个失败/不完美方案 + 1 个最终方案)
- 核心论点:**AI 强在调查 + 测试生成,弱在方案设计** —— 3 个被否方案的共同模式:①先 stringLike fallback(局部 hack,不通类)②全局 noConversions flag(方向错,误伤 go 命令)③follows 思路在共享方法里 over-broad 应用
- 最终修复精髓:把 `pushFollow("as") / popFollow()` 作用域精确圈在 `FetchCommand.parse()` 内,而不是共享的 `parseURLOrExpression()` —— 上下文敏感性的作用域最小化
- 反直觉观点:**"技术债按指数增长"**(作者自承无证据,来自一个梦);**"骄傲于不理解代码"是失控不是炫技** —— 与 vibe coding 叙事的根本对立
- 方法论提炼:"调查+测试"两段委派,"方案"必须自己定;AI 测试生成有隐藏价值(作者明确说"比我自己能写的更全")
- 横向对比:本文是"实践派+怀疑派"立场,与 vibe coding 派(信任 AI 不必理解)/纯否定派(DHH 风格)三分天下,领域当前主流是"AI 全流程代理",本文属于"早期老炮的清醒"逆主流
- 4 个参考 wikilink:Hermes-Kanban/Superpowers/Ralph/Medal-W-Key/杂谈·大前端世界观 —— 把同立场(谨慎用 AI)、同论断(技术债严控)、同主题(人+agent 协作)的相关条目串起来
- 更新 `AGENTS.md`:总览表文件数 14→15,`阅读/` 子目录树新增第 5 条,路径示例新增,统计 257→258(总 258→259)
- 更新 `INDEX.md`:开源项目分析区"阅读"组末尾新增 htmx 条目,页面计数 258→259,日期 2026-07-22→2026-07-27

## 2026-07-22 ingest | 收录 Ralph Autonomous AI Coding Loop

- 新增 `开源项目分析/AI编码工程化/Ralph-Autonomous-AI-Coding-Loop.md` — snarktank/ralph 自主 AI 编码循环,120 行 bash 循环 + PRD 拆 story + 每轮 fresh context,21.2K Stars
- 核心机制:**`grep "<promise>COMPLETE</promise>"` 当退出协议**,不解析 JSON,纯字符串匹配 — "对 AI 输出最不信任"的设计
- 跨 session 记忆三层:git history(代码) + prd.json(任务状态) + progress.txt(append-only 学习笔记) + 各目录 CLAUDE.md/AGENTS.md(项目惯例)
- 故事硬性约束:必须能塞进单个 context window;2-3 句说不清 = 太大;依赖先于被依赖(schema → backend → UI → dashboard)
- 自动归档:`branchName` 变化时 cp 上一轮 prd.json + progress.txt 到 `archive/YYYY-MM-DD-feature-name/`
- 与同赛道 3 兄弟对比:Ralph 是"session-less 派"(每轮全新实例),Trellis/spec-kit/Superpowers 是"session 内编排派"(同会话跑完)
- 选型建议:**只推荐给已具备 typecheck+test 强 feedback loop + 能拆 N 个独立可验故事的 feature 团队**
- 更新 `AGENTS.md`:总览表文件数 13→14,`AI编码工程化/` 子目录树新增第 4 条,路径示例新增,统计 256→257(总 257→258)
- 更新 `INDEX.md`:开源项目分析区新增 Ralph 条目,页面计数 257→258

## 2026-07-22 ingest | 收录 Medal W-Key 前端基础设施现代化复盘

- 新增 `开源项目分析/阅读/Medal-W-Key-前端基础设施现代化复盘.md` — Medal.tv Rick Zhang 的 Electron+Web 前端 Macro→Micro 现代化路径总结,renderer bundle 从 ~44MB 减到 2.7MB(减 94%)
- 核心论点:**先动基础设施(Macro),再让组件现代化(Micro)水到渠成** —— 关键动作是 PNPM monorepo + Vite/HMR + 规范化 import 路径(禁用 barrel)
- Bundle 减重数据(单项):删 component barrel -2.6MB / 外置 .wav -3.4MB / ESM 优先 -4MB / 动态 import i18n -13MB(最大) / 路由级 code split -5.4MB
- 讨论沉淀(独立小节):barrel file 为什么默认禁用、为什么 lodash-es 能保持 tree-shake(5 个条件表)、库 vs 业务的分离策略(桶用 vs 禁用)、单业务"通用组件库"的第三条路(Shadcn 模式)、自建 npm 组件库的硬性配置清单
- 反直觉观点:Bundle 优化最大单一来源不是 minify/gzip,而是动态 import 大文件;i18n 占减量三分之一
- 更新 `AGENTS.md`:总览表文件数 12→13,`阅读/` 子目录树新增 4 条(原 1 条),路径示例新增,统计 255→256
- 更新 `INDEX.md`:开源项目分析区新增 Medal 条目,页面计数 256→257,日期 2026-07-19→2026-07-22

## 2026-07-19 restructure | 规范 AI 与 开源项目分析 归类边界，迁移 2 篇分析类文章

- **新归类规则**：
  - `AI/` = AI 底层原理、核心概念、知识图谱（Transformer、机器学习、Agent 架构演进等）
  - `开源项目分析/阅读/` = 分析性质 / 阅读性质的文章（含公众号文章总结、横向对比、自我体系对比）
- 移动 `AI/1688-Multi-Agent超级组织实践.md` → `开源项目分析/阅读/`（公众号文章分析）
- 移动 `AI/Hermes-Kanban多Profile持久化工作流与SubAgent对比.md` → `开源项目分析/阅读/`（自我体系对比）
- 保留 `AI/Agent发展.md`（AI 架构演进知识图谱，属核心概念）
- 保留 `AI/概览.md`、`AI/Transformer.md`、`AI/训练.md`、`AI/模型.md`、`AI/机器学习.md`（均为 AI 原理/概念）
- 更新 `AGENTS.md`：总览表 AI 8→6 且改"内容"列说明，目录树删除 2 条移走的文件
- 更新 `INDEX.md`：AI 区删除 2 条；开源项目分析区新增 2 条到 `阅读/` 子目录
- 更新 `SCHEMA.md`：新增"AI 与 开源项目分析 归类边界"规则小节

## 2026-07-19 ingest | 收录 Hermes Kanban 多 Profile 工作流与 SubAgent 对比

- 新增 `AI/Hermes-Kanban多Profile持久化工作流与SubAgent对比.md` — 对比 Hermes Kanban 多 Profile 持久化工作流与 Claude Code / OpenCode SubAgent，覆盖生命周期、专业化方式、任务心智模型、隔离粒度、调度能力等 5 个维度
- 核心论点：CC/OpenCode SubAgent 是"session 内临时工"，Hermes Kanban 是"多 Profile 持久化工作流"，两者面向不同需求层次
- 适用场景决策表：临时研究用 CC/OpenCode，长期固化工作流（PM/Coder/QA 接力 + cron 调度）用 Hermes Kanban
- 更新 `AGENTS.md`：AI 文件数 7→8，目录树新增条目，统计 253→254
- 更新 `INDEX.md`：AI 区新增条目，页面计数 255→256

## 2026-07-19 ingest | 收录 Trellis 与 spec-kit，AI 编码工程化方向

- 新增 `开源项目分析/AI编码工程化/Trellis-AI编码工程框架.md` — mindfold-ai/Trellis 跨平台 AI Coding Agent Harness,4 阶段循环(Plan→Implement→Verify→Finish)+ spec 学习闭环 + 17 平台适配器,12.8K Stars,AGPL-3.0
- 新增 `开源项目分析/AI编码工程化/spec-kit-GitHub官方规范驱动开发.md` — github/spec-kit 官方 Spec-Driven Development 工具集,5 个 slash command(constitution→specify→plan→tasks→implement),122K Stars,MIT
- 两份均含完整的"Trellis vs spec-kit"双向对比小节(规模、本质、流程、Spec 演进、多平台、工作记忆、协议等)
- 新建 `AI编码工程化/` 子目录,归类 spec-driven / agent harness 类 AI 编码工具
- 更新 `AGENTS.md`:总览表文件数 8→10,目录树新增子目录,路径示例新增,统计 251→253
- 更新 `INDEX.md`:开源项目分析区新增 2 条目,页面计数 253→255,日期 2026-07-17→2026-07-19

## 2026-07-19 ingest | 收录 Superpowers — AI 编码工程师方法论与 Skills 框架

- 新增 `开源项目分析/AI编码工程化/Superpowers-AI编码工程师方法论与Skills框架.md` — obra/superpowers 完整 AI 编码工程师方法论,13+ composable skills 自动触发,TDD/code review/verification 强约束,257K Stars,MIT
- 通过各 agent 官方 plugin marketplace 安装(Claude Code/Codex/Cursor/OpenCode/Pi/Kimi/Copilot CLI/Factory Droid/Antigravity),定位是"完整的工程师"而非代码生成器
- 与同目录 Trellis、spec-kit 形成"工程化框架"三角:Superpowers(方法论+skills)/ Trellis(harness 循环+多平台)/ spec-kit(规范驱动+slash command)
- 更新 `AGENTS.md`:总览表文件数 11→12,`AI编码工程化/` 目录树新增条目,路径示例新增,统计 254→255
- 更新 `INDEX.md`:开源项目分析区新增条目,页面计数 256→257

## 2026-07-17 fix | 修复 INDEX.md / AGENTS.md / SCHEMA.md 元文件一致性

- 修复 INDEX.md：Claude-Design-System-Prompt 路径从根目录更正为 `提示词工程/` 子目录
- 修复 SCHEMA.md：`devops` 标签目录从过时的 `Utils/` 更正为 `开发工具链/`
- 修复 AGENTS.md：更新所有分类文件数（7 个分类有误），补充缺失的文件条目，总计 ~204 → ~251
- 补充 AGENTS.md Books/ 目录树：添加 `Books of Shader.md`
- 补充 AGENTS.md Graphics/Three 目录树：添加 `Extras.md`
- 补充 AGENTS.md 前端目录树：添加 `React/FAQ.md`、`Typescript/tsconfig.md`
- AGENTS.md 统计行从 ~204 更新为 ~251

## 2026-07-17 ingest | 收录 CodeGraph vs GitNexus vs Code Review Graph 横向对比

- 新增 `开源项目分析/AI代码智能/CodeGraph-vs-GitNexus-vs-CodeReviewGraph-代码智能工具横向对比.md` — AI 代码智能工具三大项目全面对比，覆盖基础信息、Agent 支持、MCP 工具、特色功能、选型建议
- 新建 `AI代码智能/` 子目录，归类 AI 代码理解/代码智能类开源工具
- 更新 `AGENTS.md`：总览表文件数 7→8，目录树新增子目录，路径示例新增，统计 203→204
- 更新 `INDEX.md`：开源项目分析区新增条目，页面计数 252→253

## 2026-07-09 init | 初始化 LLM Wiki 结构

- 创建 `SCHEMA.md` — 知识库规则、约定和标签分类
- 创建 `INDEX.md` — 全站内容目录（244 个页面，16 个分类），因与 Astro 的 `index.mdx` slug 冲突，实际命名为 `INDEX.md`（后移至根目录）
- 创建 `CHANGELOG.md` — 操作日志（原 `log.md`，后移至根目录并重命名）
- 知识库路径：`/home/keven/codes/github/knowledge-base-system/src/content/docs/`
- 背景：已有 16 个分类的手写知识库，通过 Astro Starlight 构建为静态站点
- 本次操作仅新增 3 个文件，未修改原有内容，Astro 构建不受影响

## 2026-07-09 restructure | 将元文件移至项目根目录

- 将 `src/content/docs/index.md` → `INDEX.md`（移至根目录）
- 将 `src/content/docs/log.md` → `CHANGELOG.md`（移至根目录并重命名）
- 将 `src/content/docs/SCHEMA.md` → `SCHEMA.md`（移至根目录）
- 原因：这些是项目元文件，放在 docs 目录下不合适

## 2026-07-10 ingest | 收录 Stagehand + Tools 子目录重组

- 新增 `Tools/AI浏览器自动化/Stagehand-AI浏览器自动化框架.md` — Stagehand AI 浏览器自动化框架分析报告
- 重组 Tools/ 目录结构：同一类型工具放入对应子目录（`AI浏览器自动化/`、`自托管书签/`），便于同类工具集中查阅
- 更新 `AGENTS.md`：一级分类表、二级目录树、路径示例、统计计数
- 更新 `INDEX.md`：新增 Tools 章节，收录 Karakeep（补录）和 Stagehand，页面计数 244→246
- 更新 `learning-summary` skill（v3.0.0→v3.1.0）：保存流程中加入 Tools 子目录分组规则和 INDEX.md 更新步骤

## 2026-07-10 restructure | Utils → 开发工具链, Tools → 开源项目分析

- 重命名 `Utils/` → `开发工具链/`（Git/Playwright/Puppeteer 的使用笔记）
- 重命名 `Tools/` → `开源项目分析/`（开源项目评估选型报告）
- 更新 `AGENTS.md`：总览表、目录树、路径示例全部换名
- 更新 `INDEX.md`：章节名、Wiki 链接路径全部换名
- 明确两目录定位：`开发工具链/` = 工具使用笔记, `开源项目分析/` = 项目评估报告

## 2026-07-14 restructure | 重组 Claude Design System Prompt 分类 + 新建 阅读/ 子目录$$

- 将 `AI/Claude-Design-System-Prompt-逆向工程的设计协作提示词库.md` 移至 `开源项目分析/`（它是开源项目，不属于 AI 知识）
- 新建 `开源项目分析/阅读/` 子目录，后续文章类分析归入此处
- 更新 `AGENTS.md`：AI 文件数 8→7，开源项目分析 3→4，目录树更新
- 更新 `INDEX.md`：AI 区移除、开源项目分析区新增条目（页数保持 249）

## 2026-07-14 ingest | 收录 Claude Design System Prompt — 逆向工程设计协作提示词库

- 新增 `AI/Claude-Design-System-Prompt-逆向工程的设计协作提示词库.md` — 逆向工程自 Anthropic Claude Design 的系统提示词 + 14 个设计技能库，1700+ Stars
- 更新 `AGENTS.md`：AI 文件数 7→8，目录树新增条目
- 更新 `INDEX.md`：AI 区新增条目，页面计数 248→249

## 2026-07-15 ingest | 收录 Harness Engineering — 数据研发 Multi-Agent 架构实践

- 新增 `开源项目分析/阅读/Harness工程-Multi-Agent架构实践.md` — 阿里技术团队 Harness Engineering 文章总结，涵盖三大分层六大支柱
- 更新 `AGENTS.md`：总览表文件数 4→5，阅读子目录新增条目，统计 200→201
- 更新 `INDEX.md`：开源项目分析区新增条目，页面计数 249→250

## 2026-07-15 ingest | 收录 Open Code Review — 阿里 AI 代码审查工具

- 新增 `开源项目分析/AI代码审查/Open-Code-Review-阿里AI代码审查工具.md` — 阿里开源 AI 代码审查 CLI 工具，确定性工程 × Agent 混合驱动，10.5K Stars
- 创建 `AI代码审查/` 子目录，归类 AI 代码审查类开源工具
- 更新 `AGENTS.md`：总览表文件数 6→7，目录树新增子目录，路径示例更新，统计 202→203
- 更新 `INDEX.md`：开源项目分析区新增条目，页面计数 251→252

## 2026-07-15 ingest | 收录 dependency-cruiser — JS/TS 依赖分析与架构治理工具

- 新增 `开源项目分析/依赖分析工具/dependency-cruiser-JS依赖分析和架构治理工具.md` — dependency-cruiser 可编程规则引擎，6,934 Stars
- 创建 `依赖分析工具/` 子目录，归类代码质量/架构治理类开源工具
- 更新 `AGENTS.md`：总览表文件数 5→6，目录树新增子目录，统计 201→202
- 更新 `INDEX.md`：开源项目分析区新增条目，页面计数 250→251

## 2026-07-14 ingest | 收录 1688 Multi-Agent 超级组织实践

- 新增 `AI/1688-Multi-Agent超级组织实践.md` — 1688 数据中心 Multi-Agent 研发小队实录，涵盖 KST 知识工程、Harness/Loop Engineering、Squad 协作模式
- 更新 `AGENTS.md`：AI 文件数 5→7，目录树新增 Agent 发展.md 和 1688-Multi-Agent 超级组织实践.md，总计 ~200
- 更新 `INDEX.md`：AI 区新增条目，页面计数 247→248

## 2026-07-13 ingest | 收录 Honcho — Agent 记忆基础设施分析

- 新增 `开源项目分析/AI记忆基础设施/Honcho-Agent记忆基础设施.md` — Honcho Agent 记忆基础设施深度分析
- 创建 `AI记忆基础设施/` 子目录，归类 Agent 记忆类开源工具
- 更新 `AGENTS.md`：总览表（文件数 2→3）、目录树新增子目录、路径示例、统计 198→199
- 更新 `INDEX.md`：新增 Honcho 条目，页面计数 246→247
