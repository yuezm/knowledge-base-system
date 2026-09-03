---
title: AI 浏览器自动化三强对比：Playwright / Stagehand / browser-use
description: Playwright(确定性测试框架)/ Stagehand(agent 原语 SDK)/ browser-use(自主 agent)三家横向对比——都已从 Playwright 封装走向自研 CDP 驱动,含 qa-use 参考实现评估与选型建议
status: active
related:
  - 开源项目分析/AI浏览器自动化/Stagehand-AI浏览器自动化框架
---

# AI 浏览器自动化三强对比:Playwright / Stagehand / browser-use

来源:GitHub API 实时分析(2026-08-12,数字均为当日拉取)+ 官方 README/源码/迁移文档
性质:三家横向对比 + 选型指南,附 browser-use 官方参考实现 qa-use 的评估附录

## 一句话

Playwright 是确定性测试框架(零 AI),Stagehand 是 agent 原语 SDK(白盒编排),browser-use 是自主 agent(黑盒任务)——三家的浏览器驱动层都曾或正在基于 Playwright,但 Stagehand v4 与 browser-use 均已自研 CDP 驱动,如今是"同层竞争"而非"套娃关系"。

## 三家定位速览

| 项目 | 定位 | 一句话 | 核心 API |
|---|---|---|---|
| Playwright (微软) | 确定性 E2E 测试框架 | 你写精确选择器,它 100% 按意图执行,零 AI | locator / expect / trace viewer |
| Stagehand (Browserbase) | Agent 原语 SDK | 自然语言表达意图,LLM 决定操作,确定性兜底 | act / extract / observe + locator |
| browser-use (Browser Use Inc) | 自主浏览器 Agent | 你把任务扔进去,它自己规划、执行、记忆、完成 | Agent(task=...).run() |

## 硬数据(GitHub API,2026-08-12)

| 指标 | Playwright | Stagehand | browser-use |
|---|---|---|---|
| Stars | 94,370 | 23,900 | 108,837(+browser-harness 16,652) |
| 语言 | TS/JS/Python/Java/.NET | TypeScript/Python/Go | 仅 Python(官方) |
| 最新版本 | 1.x 系列 | 4.0.0 | 持续迭代 |
| License | Apache 2.0 | MIT | (browser-use 无 LICENSE 文件,README 声称 MIT) |
| 维护方 | 微软 | Browserbase(商业) | Browser Use Inc(商业) |
| 云服务 | Playwright Service | Browserbase 云浏览器 | Browser Use Cloud + 自有模型 bu-2-0 |
| 活跃度 | 2026-08-11 推送 | 2026-08-11 推送 | 2026-08-11 推送 |

## 架构图谱(核心洞察)

三家的演化史几乎一样:早期都是"Playwright 封装 + 上层逻辑",如今各自自研驱动层:

- **Playwright**:自研浏览器协议(Chromium patch + 自定义 wire protocol),自己管理浏览器进程。协议层是它最深的壁垒。
- **Stagehand**:v1–v3 构建在 Playwright 之上(用 Playwright 驱动 + AI 层);**v4 完全脱离**——自研 CDP 客户端 + chrome-launcher 本地起 Chrome + 浏览器扩展(扩展内执行降低远程调用延迟),自研 locator/page/rpc 层,package.json 无 playwright 依赖。但 API 刻意保持 Playwright 风格(goto/locator/waitForLoadState)以降低迁移成本。
- **browser-use**:早期直接包装 Playwright;现驱动层拆成独立仓库 **browser-harness**(自研 CDP,依赖 cdp-use + fetch-use),主库不再直接依赖 playwright。browser-use 自有 agent 循环:agent/service.py 编排 + message_manager 管理对话历史 + 多套 system prompt 变体(flash/no-thinking/Anthropic/自有模型专用)+ 12 种 watchdog 自愈(captcha、弹窗、崩溃、下载、权限、about:blank 等)。

结论:三者已无"上下游依赖",是三个独立实现;但 Stagehand 与 browser-use 的 CDP 层都无法替代 Playwright 的三引擎覆盖(Firefox/WebKit)。

## 核心能力对比

### 1. 页面操作
- Playwright:locator + 精确选择器(text/css/xpath/role),auto-wait 自动等元素可操作,web-first assertions。回放 100% 一致,但页面结构一变选择器就失效,维护成本在重写选择器。
- Stagehand:同样有 locator/goto(确定性路径),杀手锏是 act("click on the stagehand repo")——自然语言指令,LLM 解析 DOM 找元素,网站改版能自愈(self-healing)。
- browser-use:纯 AI 驱动,LLM 基于 DOM 提取 + 视觉截图自主决定每一步,watchdog 处理异常。

### 2. AI 能力
- Playwright:无。要 AI 得自己接(Playwright MCP 或让 coding agent 写脚本)。
- Stagehand 三大原语:
  - act(意图 → 单步操作)
  - observe(不执行,列出页面上符合意图的可操作元素,供模型规划)
  - extract(自然语言 + zod/pydantic schema → 结构化 JSON 抽取)
  - v4 新增 inference caching(稳定流程缓存 LLM 结果砍推理成本)
- browser-use:完整 agent 循环,一次 run() 自主完成多步任务;自有优化模型 bu-2-0(README 示例首选);多 prompt 变体适配不同模型。

### 3. 编排模型(最重要的理念差异)
- Playwright:自带完整 test runner——fixtures、参数化、并行、sharding、重试、trace viewer、UI mode、codegen 录制,测试生命周期开箱即用。
- Stagehand v4:移除内置 agent() 编排器,控制流交给开发者。官方推荐 **Code mode**:让 coding assistant 写 Stagehand 脚本 → 人 review → 运行;确定步骤用 locator(零推理),模糊步骤用 act/extract。备选 Tool calling 模式(模型把 API 当工具调)。无测试运行器,测试组织/报告/CI 需自建。
- browser-use:内置编排(黑盒),但 README 也引导 agent skill 安装(Claude Code/Codex/Cursor/Hermes 一键装 browser-use)——即"让模型装工具直接用"。

微妙的一致性:Stagehand 的 code mode 与 browser-use 的 skill 化是同一个方向——都承认"模型写确定代码、代码驱动浏览器"比"模型逐步驱动浏览器"更可靠,只是 browser-use 仍保留自主 agent 为核心体验,Stagehand 直接砍掉了。

### 4. 调试与可观测
- Playwright:trace viewer(时间线+网络+DOM 快照)、UI mode 单步调试、codegen、截图/视频,E2E 调试体验行业天花板。
- Stagehand:OTel 支持 + metrics API + 截图/视频,弱于 Playwright 但够用。
- browser-use:agent 历史记录(gif/视频/截图)+ 云平台回放,侧重"agent 做了什么"而非"测试断言"。

### 5. 浏览器支持
- Playwright:Chromium/Firefox/WebKit 三引擎,跨浏览器兼容矩阵是它独有优势。
- Stagehand:仅 Chromium(CDP 驱动)。目标是最新 Chrome 上的 agent 任务,非兼容性测试。
- browser-use:仅 Chromium,本地 Chrome 或云浏览器会话。

## 选型建议

- **选 Playwright**:生产级回归测试、跨浏览器兼容矩阵、确定性断言、稳定 CI。没有争议的主场。
- **选 Stagehand**:把浏览器自动化嵌入产品代码、TS/Go 团队、要可 review 可 diff 的确定性+AI 混合流程、在乎单次操作延迟与成本(缓存+扩展内执行)。
- **选 browser-use**:委托整件任务(填表/下单/抓数/巡检)、Python 栈、想最快见效(社区与教程体量最大)、接受黑盒不确定性。
- **组合拳**:Playwright runner 管测试生命周期 + Stagehand 做需要 AI 判断的步骤;或 Stagehand 做核心操作层(白盒可控)+ browser-use 做独立任务委托。三者 API 风格兼容,混用成本低。
- **本质问题**:你更信任"模型自主完成整件事"(browser-use),还是"你写代码、模型只干判断的活"(Stagehand)?要稳妥要断言选 Playwright。

## 数据核验注意(重要)

- browser-use README 声称 "Odysseys leaderboard #1, 87.4%, ahead of OpenAI/Anthropic/Google/Microsoft"。该数字衡量 browser-use 自家 agent + 指定模型的组合表现,评测任务集与模型版本口径需读 browser-use/benchmark 仓库确认;87.4% 不等于开源库默认配置的稳定性。
- 三家 stars 均为 2026-08-12 GitHub API 实时值,非记忆估算。
- browser-use 与 Stagehand 的 License 均无 LICENSE 文件(API license: null),README 声称 MIT,使用前注意。

## 附录:qa-use(BrowserUse 官方 AI 测试平台参考实现)

- 定位:browser-use 生态的"能力展示样板间"——自然语言写测试步骤+成功标准,BrowserUse Cloud API 执行,LLM 判定 pass/fail
- 硬数据:589 stars | 74 forks | 26 commits | 2 贡献者(CTO maticzav 25 + CEO gregpr07 1)| 2025-07-22 创建 → 2025-08-08 停更(开发窗口仅 17 天,已停更一年未归档)
- 技术栈:Next.js 15 + React 19 + Drizzle/Postgres + Inngest(cron 定时跑套件)+ Resend(失败邮件)+ OpenAI SDK + zod 4(结构化输出契约)
- 核心设计(engine.ts 值得读):测试 = steps(自然语言步骤)+ evaluation(独立成功标准);SYSTEM_PROMPT 定死规则(严格按序、失败即判、禁止 workaround、终态必须精确匹配);输出契约 {status: pass|failing, steps: 已成功步骤, error: 失败原因}——步骤级失败回溯,失败可精确归因到第几步
- 结论:当教材读别当工具用——停更一年、2 人 17 天即止、强绑定付费 BrowserUse Cloud API、无 LICENSE 文件

## 个人提炼

1. 三家的"自研 CDP 化"说明:浏览器驱动层是 agent 工具的核心壁垒,Playwright 兼容 API 只是用户侧表象。
2. "确定性优先、AI 兜底模糊步骤"成为行业共识写法(Stagehand code mode、browser-use skill 化都是证据)。
3. 评估 agent 类工具时,README 的 benchmark 数字必须回到原始评测口径核验,不能当作库的默认能力。
4. qa-use 的失败模式(官方打样 → 17 天停更)提醒:生态型公司开源"能力展示"项目,产品价值通常低于展示价值。

## 参考

- [[MattPocock-AI时代软件基础四本书|Matt Pocock:AI 时代软件基础]] — "设计接口,委托实现"与 Stagehand code mode / browser-use skill 化是同一方法论在浏览器自动化上的落地
