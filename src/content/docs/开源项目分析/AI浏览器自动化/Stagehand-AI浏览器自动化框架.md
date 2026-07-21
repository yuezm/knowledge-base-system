---
title: Stagehand — AI 浏览器自动化框架
description: Stagehand — AI 浏览器自动化框架
---

# Stagehand — AI 浏览器自动化框架

> 仓库：https://github.com/browserbase/stagehand
> Stars: ⭐ 23,441 | Forks: 1,610 | Issues: 262 open
> 语言：TypeScript（主）+ Python 版 | 许可证：MIT
> 创建：2024-03 | 活跃：极高（日更级）| 官网：https://stagehand.dev

## 项目总览

| 维度     | 评价                                                                          |
| -------- | ----------------------------------------------------------------------------- |
| 项目类型 | AI Browser Agent SDK / 浏览器自动化框架                                       |
| 技术壁垒 | 中 — 核心是给 Playwright 套一层 AI 编排层，但 act/extract 的稳定性工程很深    |
| 学习价值 | 高 — 展示如何用 LLM 桥接自然语言与浏览器操作，架构设计值得借鉴                |
| 商业价值 | 高 — Browserbase 云浏览器 + Stagehand 形成闭环，企业自动化场景需求明确        |
| 适合人群 | 做网页自动化/数据采集/E2E 测试的前端/全栈/QA；构建 Browser Agent 的 AI 工程师 |
| 核心创新 | **混合模式** — 开发者决定哪些操作用 AI、哪些写死代码，而非纯 AI Agent 黑盒    |

## 核心 API

```typescript
// 单步动作
await stagehand.act("click on the stagehand repo");

// 多步任务
const agent = stagehand.agent();
await agent.execute("Get to the latest PR");

// 结构化数据抽取
const { author, title } = await stagehand.extract(
  "extract the author and title of the PR",
  z.object({ author: z.string(), title: z.string() }),
);
```

## 横向对比

| 对比项      | Stagehand                       | Playwright                    | Browser Use (Python)     |
| ----------- | ------------------------------- | ----------------------------- | ------------------------ |
| ⭐ Stars    | 23,441                          | 70,000+                       | 62,000+                  |
| 技术栈      | TypeScript + Python             | TS/JS/Java/.NET               | Python                   |
| 核心特色    | 自然语言 ↔ 代码混合驱动         | 跨浏览器自动化标准库          | Agent-first 操作浏览器   |
| 上手难度    | 低 — `npx create-browser-app`   | 中 — 需理解 selector/page API | 低 — pip install         |
| 文档质量    | 好 — docs.stagehand.dev         | 极好 — 业界标杆               | 好                       |
| 社区活跃    | 极活跃（2024/3 创建，日更）     | 微软稳定维护                  | 增长极快                 |
| ✅ 最大优势 | AI 编排 + 代码灵活切换          | 跨浏览器兼容性最强            | Python 生态 + Agent 成熟 |
| ❌ 最大短板 | 重度依赖 LLM API + Browserbase  | 纯代码无 AI 能力              | 纯 AI Agent 不可控性较高 |
| 🎯 差异化点 | Hybrid — 写代码还是 AI 你说了算 | 工业级测试框架                | Agent-first 设计         |

## 技术架构亮点

- **CDP 引擎优化**：底层封装 Playwright 的 CDP 协议，自动化场景做了专门优化
- **三核心 API**：`act()`（单步）→ `agent().execute()`（多步）→ `extract()`（结构化数据），粒度清晰
- **Zod Schema 集成**：`extract()` 返回类型安全的结构化数据，与 TS 类型系统无缝衔接
- **自愈 + 自动缓存**：记住操作路径，网站变化时自动用 AI 修复，降本增效

## 选型建议

- ✅ **选 Stagehand 当**：需要 AI 辅助又想保留代码控制权，或已在用 Browserbase 云浏览器
- ✅ **选 Playwright 当**：传统 E2E 测试、跨浏览器兼容性，对 AI 无需求
- ✅ **选 Browser Use 当**：Python 栈、需要纯 AI Agent 驱动的浏览器操作

## 潜在问题

- ⚠️ 核心功能依赖 LLM API，有延迟和成本（缓存可缓解）
- ⚠️ 最佳体验需要 Browserbase 云浏览器
- ⚠️ 跨浏览器支持未明确强调，AI 层可能只在 Chromium 上最佳
- ⚠️ TypeScript 和 Python 是独立仓库，版本可能不同步
