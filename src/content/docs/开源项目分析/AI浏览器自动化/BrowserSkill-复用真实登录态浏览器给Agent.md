---
title: BrowserSkill — 复用真实登录态浏览器给 Agent
description: 腾讯开源 bsk CLI + Chromium 扩展，把用户已登录的真实浏览器借给任意 harness 的 agent——Agent Window 沙箱 + 显式 tab borrow 归还协议 + request-help 人机接力，harness 无关（官方支持 Hermes Agent），4,177 Stars，MIT
status: active
tags: [browser, ai-agent, agent-tool, browser-automation, automation, mcp]
related:
  - 开源项目分析/AI浏览器自动化/AI浏览器自动化赛道对比
  - 开源项目分析/AI浏览器自动化/Stagehand-AI浏览器自动化框架
  - 开源项目分析/AI编码工程化/Skill-Based-Architecture-项目级Skill编写方法论
  - 开发工具链/Playwright/Playwright
  - Browser/浏览器多进程模型
---

# BrowserSkill — 复用真实登录态浏览器给 Agent

> 仓库：https://github.com/Tencent/BrowserSkill
> Stars: ⭐ 4,259 | Forks: 300 | Watchers: 13 | Contributors: 16 | Open issues: 51
> 语言：TypeScript（3.50 MB）+ Rust（1.70 MB）| 许可证：MIT
> 创建：2026-06-22 | 最近推送：2026-09-17（活跃）| 最新版本：cli-v0.3.0（2026-09-17）/ ext-v0.3.0（2026-09-16）
> 支持系统：macOS（Apple Silicon + Intel）/ Linux（x64 + ARM64）/ Windows x64
> 支持浏览器：Chrome + Microsoft Edge（其他 Chromium 系未打包扩展可用）；Firefox 计划中
> 采集时间：**2026-09-18**（当日 GitHub API 实抓）；同日复采时 Star 已由 4,177 涨至 4,259（数小时内 +82），本页统一采用复采值，与同目录 [[开源项目分析/AI浏览器自动化/AI浏览器自动化赛道对比|赛道对比页]] 处于**同一时间窗**，横向可比

## 一句话

它不给你造一个干净的隔离浏览器，而是**把你正在用的那个浏览器借给 agent**——agent 在独立的 Agent Window 里干活，要碰你的标签页必须显式 `borrow` 且结束时归还，用人不被打断。

## 项目总览

| 维度     | 评价                                                                                       |
| -------- | ------------------------------------------------------------------------------------------ |
| 项目类型 | Agent ↔ 真实浏览器 的本地桥接层（CLI + 本地守护 + 浏览器扩展）                              |
| 技术壁垒 | 中高 — 桥接架构本身不难，难的是「标签页所有权」语义与本地 IPC/WS/CDP 三层协议的一致性工程    |
| 学习价值 | 高 — 人机接力协议、会话沙箱、ref-store 生命周期、CLI↔daemon↔扩展 三段式协议都值得抄           |
| 商业价值 | 中 — 解决企业内网系统 / 需登录 SaaS 的自动化刚需；但本体是基础设施，不直接变现（腾讯 WXG 背景） |
| 适合人群 | 想让 agent 操作已登录站点的重度 AI 编码用户；做 agent 工具链 / 企业自动化的工程师            |
| 核心创新 | **标签页所有权协议** — Agent Window 沙箱 + 显式 borrow/归还 + request-help 人工接管          |
| 替代品   | ↔ 见下方「横向对比」（MCP 系与 SDK 系走的是完全不同的路线）                                  |

## 为什么需要它（它补的那一半）

现有工具几乎都在做同一件事：**给 agent 起一个干净的新浏览器**。这在 CI、E2E 测试里没问题，但一碰到「我后台那个系统、那个内网工具、那个需要登录的 SaaS」就散架了——要么让 agent 自己登录（等于把密码/2FA 交出去），要么你把 cookie 导出成文件（安全问题更大），要么你手动把浏览器开成调试端口再让 agent 接管（此时你的浏览器被抢占，你没法干活了）。

BrowserSkill 的答案是反直觉的：**主动把 agent 扔进你最脏、登录态最全的那个真实浏览器**，然后用沙箱 + 借用协议控制风险。

## 架构（三个进程，各司其职）

```
Agent harness ──shell: bsk ...──> bsk CLI ──IPC──> bsk daemon ──WS──> 扩展 ──CDP──> Agent Window
                                                                          └─(borrow)─> 你的标签页
```

| 组件 | 位置 | 职责 |
| --- | --- | --- |
| `bsk` CLI | `crates/bsk-cli` | 动词-名词子命令（`bsk session start` / `click` / `observe` …），默认人读输出，`--json` 结构化 |
| `bsk` daemon | 同一二进制 | 单实例锁、session 路由、**每 session 一个队列串行化 RPC**（保 ref-store 安全）、空闲自动退出 |
| 扩展 | `apps/extension` | WXT / MV3，21 个 tool handler；session-manager 管 Agent Window 与 `@eN` 引用；browser-driver 调 CDP |
| 协议层 | `crates/bsk-protocol` | Rust wire types + JSON Schema，TS 侧镜像 `transport/types.ts`（靠测试与 schema dump 保同步） |

通信细节：CLI↔daemon 走 `$BSK_HOME/run/daemon.sock`（Unix）或命名管道（Windows）的 JSON Lines；daemon↔扩展走 loopback WebSocket（默认 **52800**）；`BSK_HOME` 默认 `~/.bsk`。daemon 状态文件含 `daemon.lock`（单实例）与 `daemon.json`（sock_path / pid / ws_port / version）。

### 会话与沙箱模型

- **session** = 4 个小写字母 ID + 独占 Agent Window + session 级 ref-store + borrow 表
- **沙箱优先**：写操作只允许作用于 Agent Window 内的标签页，除非该标签页是从用户 profile **borrow** 来的
- 多个 session 在同一浏览器上 → 多个 Agent Window，完全隔离；不同 session 可并行
- `tab_list` 三个 scope：`user`（默认）/ `agent`（仅本 session 的 Agent Window）/ `all`
- **`session stop` 是强制动作**（`bsk session stop <id>`），默认 5 分钟 idle timeout 只是安全网

## 四个核心设计（真正值得学的部分）

1. **所有权语义**。主流做法是"agent 能看到什么"（权限视角）；BrowserSkill 引入的是"这个标签页归谁"（所有权视角）。agent 打开的阶段属于 agent，你的标签页只能借——借要批准，用完要还，还了仍留在你窗口里。这层约束比任何 CDP 封装技巧都更有价值。
2. **人机接力是一等公民**。`request-help` 让 agent 在撞上验证码 / 登录 / 确认弹窗时可以明确把控制权交给你，你做完它继续。这是"全自动失败就报错"与"偷偷绕过"之外的第三条路。
3. **harness 无关**。README 明确列出 Cursor / Claude Code / Codex / OpenClaw / CodeBuddy / WorkBuddy / Pi / **Hermes Agent** / DeepSeek Harness，机制就是 `bsk install-skill` 往各 harness 的 skills 目录写一份 `SKILL.md`——不绑定模型、不绑定框架、不绑定 MCP。dsh 另有原生插件（npm `@wxg-prc-cpg/browser-skill-dsh-plugin`，注入 `browser_*` 工具 + Web UI 会话视图）。
4. **传输事务是有状态机的**。文件上传/下载路径分阶段说明（pre-dispatch 由 CLI 回滚、post-dispatch 归 session），浏览器侧操作回报 `effect_state`（`none` / `committed` / `unknown`）、`phase`、`cleanup_state`——**`unknown` 必须跨超时保留且不能盲目重试**。这套"确认成功优先于迟到取消"的设计，是 agent 工具做副作用操作时的正确姿势。

## 差异化定位（七家全景见赛道页）

七家横向对比的完整表在 [[开源项目分析/AI浏览器自动化/AI浏览器自动化赛道对比|AI 浏览器自动化赛道对比]]。本页只保留**最容易与它混淆的三家**的区分点：

| 差异点 | BrowserSkill | browser-harness | MCP 系（chrome-devtools-mcp / playwright-mcp） |
| --- | --- | --- | --- |
| 接你的真实浏览器 | ✅ 装扩展即可，**不需要开远程调试端口** | ✅ 直连 CDP 端点，需 `chrome://inspect` 打勾授权 | ➖ 通常指向某个实例，默认不带你的登录态 |
| 隔离 | ✅ 强制：独立 Agent Window + borrow 批准 | ❌ 无：共享同一浏览器 lane，靠串行化纪律 | ➖ 取决于怎么配 |
| 人机接力 | ✅ `request-help` 协议 | ➖ 无协议化交接 | ➖ 无 |
| 表达力 | ❌ 有限：`bsk` 子命令 + 21 个 tool | ✅ 无限：agent 直接 exec Python 并落盘 helper | ➖ 取决于工具集 |
| 云与规模 | ➖ 仅自托管 remote mode，无云 | ✅ Browser Use Cloud（并行/代理/隐身/CAPTCHA） | ➖ 无 |

> ⚠️ **一个必须纠正的常见误判**：本页初版曾把「复用已登录态」写成 BrowserSkill 独有的卖点——**对着 MCP 系与 SDK 系成立，对着 browser-harness 不成立**（它的自我描述第一句就是 "Connect an LLM directly to your real browser"）。BrowserSkill 真正的差异化是**隔离 + 人机接力的协议化**，以及「受管机器禁用调试端口时仍可用（走扩展）」。

## 选型建议

- ✅ **选 BrowserSkill 当**：要让 agent 操作你**已登录**的站点，且 ① 需要多 agent 并行 ② 要「不批准就不能碰我的标签页」的强约束 ③ 需要正规人机接力点 ④ 受管机器禁用远程调试端口但允许装扩展。**注意：仅「复用登录态」不足以构成理由——browser-harness 也能。**
- ✅ **选 chrome-devtools-mcp / playwright-mcp 当**：纯开发调试、性能分析、CI 里的确定性自动化——不需要你的登录态，只需要一个能跑脚本的浏览器。
- ✅ **选 Stagehand / browser-use 当**：你要在自己的 Python/TS 代码里嵌入浏览器 agent 编排逻辑，做的是产品而非自用工具。
- 🔀 **组合拳**：BrowserSkill 管"已登录的真实世界"，MCP 系管"干净的开发调试世界"，两者不冲突。
- **本质问题**：你要的是"agent 帮我操作我的账号"，还是"agent 帮我测我的页面"？前者只有 BrowserSkill 这条路线走得通。

## 上手（Hermes Agent 用户视角）

```powershell
# 1) 装 CLI（Windows PowerShell，装到 ~/.local/bin）
irm https://raw.githubusercontent.com/Tencent/BrowserSkill/main/install.ps1 | iex

# 2) 装扩展（Chrome Web Store / Edge Add-ons）

# 3) 装 skill（空格选择 harness → Hermes Agent → Enter）
bsk install-skill
bsk install-skill --harness hermes --json   # 非交互

# 4) 验证
bsk doctor
```

更省事的一行法（README 推荐，交给任意有 shell 的 agent 自己装）：

```text
Set up browser-skill on this machine by following https://raw.githubusercontent.com/Tencent/BrowserSkill/main/AGENT_INSTALL.md
```

Skill 的 agent 工作流固定四步：`session start --json` 拿 id → `navigate` + `observe` 取 `@eN` 引用 → 用新鲜引用执行动作（导航或 DOM 大变后必须重新 observe）→ **无论成败都 `session stop <id>`**。

`bsk install-skill` 的一处贴心设计：托管 skill 只在**内容仍与上次安装基线一致**时才自动更新（daemon 启动 / session start / doctor 触发）；本地改过的会被保留并暂停自动更新，`doctor` 会给 `WARN` 与恢复选项，且这种 WARN **不**让健康检查失败（`--json` 报 `status: "warn"` + `ok: true`）。想把自己的指令固化就用 `--source <文件>`。

## 潜在坑

- ⚠️ **0.3.0 是破坏性变更**：`--unattended`、`tab borrow --no-confirm`、`BSK_REQUEST_HELP=off` 三个开关已废弃，且**不能覆盖扩展设置**。无人值守必须改到扩展 popup 里关掉两个独立开关（Confirm before borrowing tabs / Allow requests for human help），这两个设置是浏览器 profile 级持久生效的。只靠命令行标志免等待的老脚本升级后会卡住。
- ⚠️ **沙箱型 agent 要宿主管 daemon**：如果宿主每条命令后回收后台子进程（不少 agent sandbox 与 Windows 场景如此），必须由宿主持久任务托管 daemon，并在**每条**命令上显式带 `BSK_HOME` + `BSK_AUTO_START=0`——SKILL.md 明确警告环境变量在 shell 调用之间可能不保留。且"权限错误 / 超时 / 非法响应"都**不能**证明 daemon 缺失，别据此重启。
- ⚠️ **远程模式下上传/下载直接返回 `unsupported`**，只有本地连接支持文件传输。
- ⚠️ **扩展商店版本可能落后 CLI**。full-page screenshot 等新功能要求 CLI + daemon + 扩展三者版本匹配；升级后跑 `bsk --version` / `bsk status` / `bsk doctor` 三连确认。注意 dsh 插件**不**自动更新，需单独 `dsh plugin update --latest` 并重启 profile。
- ⚠️ **改端口会杀会话**：扩展 popup 可改 52800，但保存端口会终止现有 session 并重连，改前先停掉在跑的会话。
- ⚠️ **别靠 idle timeout 收尾**：`session stop` 是 agent 工作流的强制动作，5 分钟 idle 只是兜底；也不要 stop/restart 共享 daemon 来了结任务。
- ⚠️ **ref 会失效**：`@eN` 引用在导航后必然失效，DOM 大变也可能失效；每次交互前重新 `observe`，别复用旧 ref。
- ⚠️ 生态体量差距真实存在：4,177 Stars 对 MCP 系的 37K–52K、SDK 系的 24K–115K，第三方教程与踩坑资料会少很多；Firefox 尚未支持。

## 参考

- [[开源项目分析/AI浏览器自动化/AI浏览器自动化赛道对比|AI 浏览器自动化赛道对比]] — 七家全景、三个范式与关键分歧点；本篇是该页范式三（已登录真浏览器桥接）中 BrowserSkill 一侧的事实层
- [[开源项目分析/AI浏览器自动化/Stagehand-AI浏览器自动化框架|Stagehand — AI 浏览器自动化框架]] — SDK 系代表（用 `userDataDir` 另建持久 profile），与 BrowserSkill 的 CLI+扩展桥接路线形成「库 vs 基础设施」对照
- [[开源项目分析/AI编码工程化/Skill-Based-Architecture-项目级Skill编写方法论|SBA — 项目级 Skill 编写方法论]] — BrowserSkill 用 `install-skill` 把 `SKILL.md` 分发进 9 个 harness，并做了"内容基线比对 + 本地编辑保护"的托管更新，是项目级 skill 分发的一个真实工业样本
- [[开发工具链/Playwright/Playwright|Playwright]] — BrowserSkill 走自研 CDP 而非 Playwright，正是因为要接管"用户已存在的浏览器进程"，这正是 Playwright 的架构边界之外
- [[Browser/浏览器多进程模型|浏览器多进程模型]] — 理解 Agent Window 隔离与 CDP 按 target 操作的底层前提
