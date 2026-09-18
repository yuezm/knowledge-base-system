---
title: Stagehand — AI 浏览器自动化框架
description: Browserbase 出品的浏览器 agent SDK——v4 已完全脱离 Playwright，自研 CDP + 浏览器扩展，三个原语 observe/act/extract 覆盖"确定性选择器 + 自然语言兜底"，TS/Python/Go 三语言，24,323 Stars，MIT
status: active
tags: [browser, automation, ai-agent, agent-tool, typescript, sdk]
related:
  - 开源项目分析/AI浏览器自动化/AI浏览器自动化赛道对比
  - 开源项目分析/AI浏览器自动化/BrowserSkill-复用真实登录态浏览器给Agent
  - 开发工具链/Playwright/Playwright
  - 开源项目分析/阅读/MattPocock-AI时代软件基础四本书
---

# Stagehand — AI 浏览器自动化框架

> 仓库：https://github.com/browserbase/stagehand ｜ 官网：https://stagehand.dev ｜ 文档：https://docs.stagehand.dev
> Stars: ⭐ 24,323 | Forks: 1,686 | Open issues: 387
> 语言：TypeScript / Python / Go（monorepo 内各自独立包）| 许可证：MIT | 当前包版本：`@browserbasehq/stagehand` **4.1.0**
> 建仓：2024-03-24 | 最近推送：2026-09-18（日更级）
> 数据采集：**2026-09-18**（与 [[开源项目分析/AI浏览器自动化/AI浏览器自动化赛道对比|赛道对比页]] 同一时间窗实抓，横向可比）

## 一句话

**它不替你做决定，只替你处理"页面变了"这件事**——确定性的步骤你用真实选择器写死，模糊的步骤交给 `act()` 自愈，数据用 schema 约束着 `extract()` 出来。

## 项目总览

| 维度     | 评价                                                                                     |
| -------- | ---------------------------------------------------------------------------------------- |
| 项目类型 | 浏览器 agent SDK（库，不是应用；编排放给你的代码）                                        |
| 技术壁垒 | 中高 — 表层是"AI 操作层"，真正的工程在自研 CDP 驱动 + 扩展内执行 + 自愈与缓存              |
| 学习价值 | 高 — `observe()` 只回选择器不回凭据的设计、三原语的粒度切分，都值得抄进自己的 agent 工具 |
| 商业价值 | 高 — Browserbase 云浏览器 + Stagehand 开源库形成闭环，开源是获客入口、云是盈利点          |
| 适合人群 | 要把浏览器自动化嵌进产品代码（而非自用）的 TS/Python/Go 团队                              |
| 核心创新 | **混合驱动**：开发者决定哪些操作用 AI、哪些写死代码，而不是全黑盒交给 agent                |
| 兄弟页   | ↔ 赛道全景、关键分歧点与选型见 [[开源项目分析/AI浏览器自动化/AI浏览器自动化赛道对比\|AI 浏览器自动化赛道对比]] |

## 三个原语（v4 现行 API）

v4 的入口从 `new Stagehand()` 变成工厂方法 `Stagehand.create()`，浏览器实例独立传入：

```typescript
import { localBrowser, Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod/v4";

// userDataDir 持久化 cookie：下次运行已经处于登录态
const browser = await localBrowser.launch({ userDataDir: "./browser-data" });
const stagehand = await Stagehand.create({ browser, model: { modelName: "…" } });
const [page] = await browser.context.pages();

// ① observe() 只返回真实选择器 —— 凭据永远不经过模型
const { data: email } = await stagehand.observe("find the email input");
await page.locator(email[0].selector).fill(process.env.APP_EMAIL!);

// ② act() 自然语言，站点改版时自愈
await stagehand.act("click the sign in button");

// ③ extract() schema 校验后的结构化数据
const { data } = await stagehand.extract(
  "extract every invoice in the table",
  z.object({ invoices: z.array(z.object({ number: z.string(), amount: z.number() })) }),
);
```

三个原语的分工是它最值得学的部分：

- `observe(意图)` — **不执行**，只把页面上符合意图的可操作元素连同真实 selector 列出来，供模型规划或供你直接拿 selector 写死。**这是"让模型看页面但不给模型碰凭据"的关键设计。**
- `act(意图)` — 单步操作，自然语言进、浏览器动作出，站点改版时 self-healing。
- `extract(意图, schema)` — 自然语言 + zod/pydantic schema → 类型安全的结构化 JSON。

## v4 的架构变化（本节修正旧笔记的两处错误）

旧版本笔记里写的"底层封装 Playwright 的 CDP 协议"和 `stagehand.agent().execute(...)` **都已失效**：

1. **已完全脱离 Playwright**（v1–v3 才是 Playwright 封装）。证据在依赖层：`packages/sdk-ts/package.json` 的 `dependencies` 只有 `@browserbasehq/sdk` + `@opentelemetry/api` + `@opentelemetry/core` + `zod`，**没有任何 playwright 依赖**；仓库内仅剩 `packages/docs/v4/migrations/playwright.mdx` 这样的迁移文档与 evals 里的对照实现。README 原话：「Playwright was built for testing. Stagehand is built for agents, in TypeScript, Python, and Go.」
2. **自研驱动层 + 浏览器扩展**：monorepo 结构是 `packages/{sdk-ts, sdk-python, sdk-go, protocol, extension, cli, evals, integrations, docs}` —— 自研 CDP 客户端 + chrome-launcher 本地起 Chrome + 浏览器扩展（在扩展内执行以降低远程调用延迟）。API 刻意保留 Playwright 风格（`goto` / `locator` / `waitForLoadState`）降低迁移成本。
3. **v4 移除了内置 `agent()` 编排器**：官方不替你控制流程了，改推 **code mode**（让 coding assistant 写 Stagehand 脚本 → 人 review → 运行，确定步骤用 locator、模糊步骤用 act/extract）+ tool calling 备选。**没有 test runner**，测试组织/报告/CI 要自建。
4. **登录态可用 `userDataDir` 持久化**（README 的 "Sign in once, keep the session"）。注意口径：这是**另起一个独立 profile 并让它记住登录**，不等于接管你正在用的那个浏览器实例——与 [[开源项目分析/AI浏览器自动化/BrowserSkill-复用真实登录态浏览器给Agent|BrowserSkill]] / browser-harness 的"接你真浏览器"是两件事。
5. **inference caching**：稳定流程的 LLM 结果可缓存，用来砍重复推理成本。

## 潜在坑

- ⚠️ **文档按版本分目录**（`packages/docs/v2`、`v3`、`v4` 并存），搜到的教程大概率是 v2/v3 的。查 API 先确认 URL 里的版本前缀；升级前必读 `packages/docs/v4/migrations/playwright.mdx`。
- ⚠️ **v4 是破坏性重写**，不是渐进升级：入口、编排器、浏览器实例的传法都变了。存量代码照抄 v3 教程会直接跑不起来。
- ⚠️ **核心功能依赖 LLM**，有延迟与成本（inference caching 只能缓解稳定路径）。
- ⚠️ **只在 Chromium 上最佳**：自研 CDP 驱动，没有 Playwright 的三引擎（Firefox/WebKit）覆盖——做跨浏览器兼容测试不是它的主场。
- ⚠️ **需要 Node >= 22.18.0**（`engines` 字段硬约束）。
- ⚠️ **最佳体验偏向 Browserbase 云浏览器**；纯本地是 `localBrowser` 这条路，功能面比云窄。
- ⚠️ 三语言 SDK 在同一个 monorepo（`sdk-ts` / `sdk-python` / `sdk-go`），但**各自独立发包**，版本号不保证同步——锁版本时按语言分别确认。

## 参考

- [[开源项目分析/AI浏览器自动化/AI浏览器自动化赛道对比|AI 浏览器自动化赛道对比]] — 七家全景、三个范式、关键分歧点与选型建议（本篇只保留 Stagehand 自身事实）
- [[开源项目分析/AI浏览器自动化/BrowserSkill-复用真实登录态浏览器给Agent|BrowserSkill — 复用真实登录态浏览器给 Agent]] — 同为浏览器自动化但路线相反：Stagehand 是可嵌入产品代码的 SDK（profile 需自备／另建），BrowserSkill 是 harness 无关的本地桥接层（直接借你已登录的真实浏览器）
- [[开发工具链/Playwright/Playwright|Playwright]] — Stagehand 的 API 风格与它高度同源（刻意如此以降低迁移成本），理解 Playwright 有助读 Stagehand 代码
- [[开源项目分析/阅读/MattPocock-AI时代软件基础四本书|Matt Pocock：AI 时代软件基础]] — "设计接口，委托实现"正是 Stagehand code mode 的方法论表述
