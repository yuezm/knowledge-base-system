---
title: Ralph — Autonomous AI Coding Loop
description: snarktank/ralph 自主 AI 编码循环,跑 Amp/Claude Code 直到 PRD 全完成
sidebar:
  hidden: true
---

# Ralph — Autonomous AI Coding Loop

> 一句话定位:把 PRD 拆成"单上下文窗口能完成"的小故事,**反复起全新的 AI 实例**直到所有 `passes:true`,记忆只走 git history + progress.txt + prd.json。

## 项目总览

| 维度     | 评价                                                                               |
| -------- | ---------------------------------------------------------------------------------- |
| 项目类型 | AI Coding Agent Loop / PRD 驱动的 autonomous coding harness                        |
| 技术壁垒 | 低 — 120 行 bash 循环 + 几份 Markdown prompt,核心是"模式"而非代码                  |
| 学习价值 | 高 — 重新思考"AI 编码 session"的最小可行闭环                                       |
| 商业价值 | 中 — 不是产品,是工程方法论的开源化载体;星标 21K 自带流量                           |
| 适合人群 | 已经在用 Amp/Claude Code 做长 feature 的工程师、agent 编排设计者                   |
| 核心创新 | **每次迭代都是 fresh-context** + 用文件系统/JSON 跨轮持久化,而不是把历史塞回上下文 |
| Stars    | 21,202(2026-07-22)                                                                 |
| Forks    | 2,055                                                                              |
| License  | MIT                                                                                |
| 代码分布 | TypeScript 12.6K(主要是 flowchart 可视化) + Shell 3.5K(ralph.sh) + CSS 2.9K        |
| 最近推送 | 2026-02-02(代码本身极简,迭代在生态)                                                |

> 数据来源:GitHub API `snarktank/ralph` @ 2026-07-22。

## 它到底在解决什么问题

普通 AI 编码流程的痛点:

1. **"长 feature 一把梭"必爆** — 让 Claude Code 直接实现"加个 dashboard",上下文必爆,后半段代码质量断崖
2. **多轮对话的"上下文腐烂"** — 同一 session 越聊越笨,早期决策被后期错误覆盖
3. **人工 checkpoint 打断心流** — 工程师必须守着、点确认、看输出

Ralph 的暴力解法:

- **拆小到能塞进一个 context window**(单 story 单次完成)
- **每次起全新 session**(干净上下文)
- **跨 session 的"记忆"全靠文件系统**:`prd.json`(任务状态) + `progress.txt`(append-only 学习笔记) + `git history`(代码本身)
- **停机条件是机器可识别的 token**:`<promise>COMPLETE</promise>`,`grep` 命中即退出

> 这套思路来自 Geoffrey Huntley 提出的 "Ralph pattern" —— 名字来源于《辛普森一家》的 Ralph Wiggum(傻到不会累,只会一直跑)。

## 仓库结构

```
snarktank/ralph/
├── ralph.sh                 # 120 行 bash 循环,核心引擎
├── prompt.md                # Amp 用的 prompt 模板
├── CLAUDE.md                # Claude Code 用的 prompt 模板
├── prd.json.example         # PRD 数据结构样例
├── prd.json                 # (运行时生成) 任务状态机
├── progress.txt             # (运行时生成) append-only 学习笔记
├── skills/
│   ├── prd/                 # Amp/Claude Code skill:从对话生成 PRD
│   └── ralph/               # Amp/Claude Code skill:把 PRD 转 prd.json
├── .claude-plugin/          # Claude Code marketplace 清单
├── flowchart/               # 独立 Vite 项目,流程可视化
│   ├── src/
│   ├── package.json
│   └── ... (Vite + TS)
├── AGENTS.md                # (下游项目用) AI 编码约定
├── README.md
├── ralph.webp               # 项目 logo
├── ralph-flowchart.png      # 流程图静态版
└── LICENSE                  # MIT
```

**值得注意**:`ralph.sh` 本身只有 ~120 行,**真正的"复杂度"在 prompt 模板和 prd.json 格式**。仓库里 12.6K 行 TypeScript 几乎全在 `flowchart/` 那个独立可视化项目里。

## 核心机制拆解

### 1. `ralph.sh` 循环逻辑(完整骨架)

```bash
for i in $(seq 1 $MAX_ITERATIONS); do
  if [[ "$TOOL" == "amp" ]]; then
    OUTPUT=$(cat "$SCRIPT_DIR/prompt.md" | amp --dangerously-allow-all 2>&1)
  else
    OUTPUT=$(claude --dangerously-skip-permissions --print < "$SCRIPT_DIR/CLAUDE.md" 2>&1)
  fi

  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    exit 0
  fi
  sleep 2
done
exit 1
```

设计哲学:

- **`grep` 当协议** — 不用解析 JSON、不用 callback、不用进程间通信,纯字符串匹配决定停机。**这是"对 AI 输出最不信任"的设计**:你不知道模型下一步会不会正常返回,所以用一个最朴素的、最难误判的字符串作为终态信号。
- **`--dangerously-skip-permissions` / `--dangerously-allow-all`** — 自主模式必须绕过交互式确认;配合下面"feedback loop 强约束"才能安全
- **`--print` 把输出当 stdout 捕获** — Claude Code 走非交互模式,便于 grep
- **`sleep 2` 是抖动 buffer** — 让上一轮的 git 写入/锁文件彻底落盘

### 2. 单次迭代的 10 步契约(来自 CLAUDE.md)

```
1. 读 prd.json(任务状态)
2. 读 progress.txt(先看 Codebase Patterns 段)
3. 切到正确分支(branchName 字段)
4. 选 passes:false 中 priority 最高的 story
5. 只实现这一条
6. 跑质量门禁(typecheck/lint/test)
7. 发现可复用模式就更新 CLAUDE.md
8. 通过就 commit:`feat: [Story ID] - [Story Title]`
9. 把 prd.json 里这条的 passes 改成 true
10. 追加 progress.txt
```

**为什么这样设计**:

- **第 1-3 步强制"先读盘"** — fresh context 不知道项目任何事,唯一信源是磁盘,这强制了"信息外部化"
- **第 4 步"挑最高优先级"** — 让人来排序(PRD 阶段)、让机器来执行
- **第 6 步质量门禁是命脉** — Ralph 文档原话:"Ralph only works if there are feedback loops"。**没有 typecheck/test 的项目不能用 Ralph**,broken code 会在迭代间指数级累积
- **第 7 步更新 CLAUDE.md** — 让 AI 编码工具后续直接读到这些"约定/坑"
- **第 8 步原子 commit** — 失败时 `git revert` 就能回到上一轮,rebase 单 story 极方便

### 3. prd.json:任务状态机

```json
{
  "project": "MyApp",
  "branchName": "ralph/task-priority",
  "description": "Task Priority System - Add priority levels to tasks",
  "userStories": [
    {
      "id": "US-001",
      "title": "Add priority field to database",
      "description": "As a developer, I need to store task priority so it persists across sessions.",
      "acceptanceCriteria": [
        "Add priority column to tasks table: 'high' | 'medium' | 'low' (default 'medium')",
        "Generate and run migration successfully",
        "Typecheck passes"
      ],
      "priority": 1,
      "passes": false,
      "notes": ""
    }
    // ... more stories
  ]
}
```

**关键约束(写在 skills/ralph/SKILL.md 里)**:

> **Each story must be completable in ONE Ralph iteration (one context window).**

正例(单次能完成):

- 加一个数据库列 + migration
- 在已有页面加一个 UI 组件
- 更新一个 server action
- 列表加一个 filter 下拉

反例(必须拆):

- "Build the entire dashboard"
- "Add authentication"(拆成 schema/middleware/login UI/session)
- "Refactor the API"

**规则**:2-3 句说不清的需求 = 太大,必须拆。

**故事排序:依赖先于被依赖**

1. Schema/数据库变更(migrations)
2. Server actions / 后端逻辑
3. 使用后端的 UI 组件
4. 聚合视图 / dashboard

UI 在 schema 之前 = 必坏。这是写 PRD 时的硬性约束。

### 4. 跨 session 记忆的三层结构

| 层           | 载体                             | 内容                                       | 写入时机           |
| ------------ | -------------------------------- | ------------------------------------------ | ------------------ |
| **代码本身** | git commits                      | 所有实现,自然可 `git diff`/`git log` 反查  | 每个 story 通过后  |
| **任务状态** | `prd.json`                       | 哪些 story 已完成、优先级、acceptance 列表 | 每个 story 通过后  |
| **学习沉淀** | `progress.txt`(append-only)      | 模式、坑、上下文,带时间戳                  | 每个 story 通过后  |
| **项目惯例** | 各目录的 `CLAUDE.md`/`AGENTS.md` | 跨故事的可复用模式(同模块/同技术栈)        | 跨故事出现 2+ 次时 |

**为什么 progress.txt 不是 JSON**:

- 人类可读、可 grep、append-only 天然不会丢历史
- AI 在 fresh context 里只需要 `cat progress.txt` 就能拿到所有前情
- "Codebase Patterns" 段是结构化沉淀区,后续会被同 session 的 AI 在每个新 story 开始前重读

### 5. 自动归档机制

`ralph.sh` 启动时检测 `branchName` 是否变化:

```bash
if [ "$CURRENT_BRANCH" != "$LAST_BRANCH" ]; then
  DATE=$(date +%Y-%m-%d)
  FOLDER_NAME=$(echo "$LAST_BRANCH" | sed 's|^ralph/||')
  ARCHIVE_FOLDER="$ARCHIVE_DIR/$DATE-$FOLDER_NAME"
  mkdir -p "$ARCHIVE_FOLDER"
  cp "$PRD_FILE" "$ARCHIVE_FOLDER/"
  cp "$PROGRESS_FILE" "$ARCHIVE_FOLDER/"
  # 重置 progress.txt
fi
```

切换 feature 时自动 `cp` 上一轮的 prd.json + progress.txt 到 `archive/YYYY-MM-DD-feature-name/`,然后清空 progress.txt 重新开始。**所有过去的工作通过 `archive/` + git branches 完整可回溯**。

### 6. CLI 接入方式(三种)

```bash
# 方式 1:复制到项目里
mkdir -p scripts/ralph
cp /path/to/ralph/ralph.sh scripts/ralph/
cp /path/to/ralph/CLAUDE.md scripts/ralph/CLAUDE.md

# 方式 2:作为 Amp/Claude Code skill 全局安装
cp -r skills/ralph ~/.claude/skills/

# 方式 3:Claude Code 插件市场
/plugin marketplace add snarktank/ralph
/plugin install ralph-skills@ralph-marketplace
```

安装后自动注册 `/prd`(生成 PRD)和 `/ralph`(转 prd.json)两个 slash command。

## 横向对比 — AI 编码工程化赛道

> 本仓库的姊妹篇见知识库同目录 `Trellis-AI编码工程框架.md` / `spec-kit-GitHub官方规范驱动开发.md` / `Superpowers-AI编码工程师方法论与Skills框架.md`。

| 项目        | 核心思路                             | 学习成本 | 上下文策略        | 反馈门禁               | 适用规模          | Stars |
| ----------- | ------------------------------------ | -------- | ----------------- | ---------------------- | ----------------- | ----- |
| **Ralph**   | PRD → 拆小 story → 反复起 fresh 实例 | 低       | **每轮全新**      | typecheck+test(强依赖) | 中小型 feature 串 | 21.2K |
| Trellis     | 4 阶段循环(Spec→Impl→Test→Review)    | 中       | 同一 session 持续 | TDD 强约束             | 中型项目          | 12.8K |
| spec-kit    | 先写 spec/constitution 再写代码      | 中       | 同一 session 持续 | 用户审批闸门           | 大型/合规项目     | 122K  |
| Superpowers | 13+ 可组合 skills,自动触发约束       | 中高     | 同一 session 持续 | TDD+review+verify      | 团队级            | 257K  |

**核心差异一句话**:

- **Ralph** 是"**session-less 化**"的极端派 — 它根本不要 session 状态,每次都是新人
- **Trellis/spec-kit/Superpowers** 是"**session 内编排**"派 — 同一会话里把流程跑完

**选 Ralph 当**:

- 你的 feature 可以清楚拆成 N 个 < 1 上下文窗口 的子任务
- 你受够了"AI 聊到第 20 轮开始胡说"
- 项目已经有强 feedback loop(测试/类型检查齐全)
- 你想凌晨启动脚本睡一觉醒来看到 PR

**选 Trellis/spec-kit/Superpowers 当**:

- 单次任务太大、拆不动(必须保持 session 记忆)
- 需要人在 loop 里审批关键决策
- 团队多人协作,需要 spec 留痕

## 深入分析

### 架构亮点

1. **"反 session"是真正的创新** — 整个生态都在做"如何让 session 更长、记忆更多",Ralph 反向走"不要 session"。这跟 Unix 哲学"do one thing well + compose"惊人一致 — 每次实例只做一件事,跨次靠文件系统组合。
2. **`<promise>COMPLETE</promise>` 字符串即协议** — 在 AI 编码领域,大家热衷于做"结构化输出解析",Ralph 直接用最 dirty 的 grep。**优势**:模型再怎么降级,这个字符串仍然唯一;**代价**:无法做复杂的退出条件(比如"完成 90% 也算 ok")。
3. **CLAUDE.md + AGENTS.md 演化式沉淀** — 不是要求一开始写完所有约定,而是"每轮发现新模式才加一行"。这是符合现实的:工程师也不知道全部约定,跑过才知道。
4. **自动归档解决了"feature 切换"现实问题** — 真实工程很少一气呵成一个 feature,中断重启是常态。

### 文档与上手体验

- README 写得极其清晰(痛点 → 安装 → 三种安装方式 → workflow → 关键概念 → 调试 → 自定义)
- `flowchart/` 单独做了交互式可视化站点(`snarktank.github.io/ralph/`),对传播帮助巨大
- `skills/ralph/SKILL.md` 里把"story 太大/太小"的判定写得非常具体,这是真正的工程经验

### 社区与生态

- **星标增长曲线**:`2026-01-07` 创建,2 周内冲上 20K+,是当前 AI 编码工程化赛道传播最快的项目
- **作者背景**:snarktank = Ryan Carson,多次创业者(早年是 Treehouse 创始人),在 AI coding 圈有影响力
- **依赖 Amp 优先**:`ampcode.com` 是付费产品,默认推荐 Amp 而非 Claude Code,有一定商业偏向
- **贡献者**:核心非常小(本质是 prompt 工程 + bash),社区分叉主要在 prompt 模板和 skill 改造

### 潜在问题 / 踩坑

1. **强依赖 Amp/Claude Code CLI** — 不是库,不能嵌入自定义 agent 框架
2. **无 dashboard / 实时进度** — 只能 `tail` 日志或读 prd.json,长 feature 焦虑感强(配套的 flowchart 站缓解但不够)
3. **`--dangerously-skip-permissions` 风险** — 自主模式必须信任 AI 的所有写操作,要求仓库有强 quality gate
4. **拆小 story 是体力活** — 写 prd.json 比写代码还累,适合"有 PM 角色"或"你很会拆需求"的场景
5. **不支持多 branch 并行** — 一次只跑一个 feature branch,不能批量加速
6. **没有错误恢复策略** — 第 5 轮的 prd.json 写崩了,前面 4 轮的学习笔记要靠 archive/ 才能恢复
7. **代码本身接近"完全停滞"** — `pushed_at` 是 2026-02-02,核心已经稳定,新需求靠社区 fork

## 关键命令速查

```bash
# 跑 10 轮(默认)
./scripts/ralph/ralph.sh

# 跑 50 轮 + 强制用 Claude Code
./scripts/ralph/ralph.sh --tool claude 50

# 调试:看当前进度
cat prd.json | python3 -c "import json,sys; d=json.load(sys.stdin); [print(s['id'], s['title'], s['passes']) for s in d['userStories']]"
cat progress.txt
git log --oneline -10

# 切换 feature(会自动归档上一轮)
# 编辑 prd.json 的 branchName,然后再跑 ralph.sh
```

## 总结与建议

**[推荐尝试]** 使用这个项目 — 但**只推荐给已具备以下条件的团队**:

- ✅ 项目有完整 typecheck + 单元测试 + E2E 测试
- ✅ 你的 feature 真的能拆成 N 个独立可验的故事
- ✅ 你愿意花 2-4 小时写第一份 prd.json(后续会快很多)
- ✅ 你能接受"AI 凌晨跑 5 小时"这种 workflow

**不适合**:

- ❌ 新项目(还没建 feedback loop)
- ❌ Legacy 代码没有测试
- ❌ 需要大量"探索性"工作(不知道目标结构)
- ❌ 单人小项目不值得搭脚手架

**一句话总结**:**Ralph 是 AI 编码领域的"cron for AI agents"** — 它不聪明,但它会一直跑,直到你醒过来看到 PR 写好了。

## 参考

- [[开源项目分析/AI编码工程化/Trellis-AI编码工程框架|Trellis — AI 编码工程框架]] — 同赛道 4 阶段循环,对比 Ralph 的"无 session"思路
- [[开源项目分析/AI编码工程化/spec-kit-GitHub官方规范驱动开发|spec-kit — GitHub 官方规范驱动开发]] — 同赛道,先 spec 后实现,规模 122K Stars
- [[开源项目分析/AI编码工程化/Superpowers-AI编码工程师方法论与Skills框架|Superpowers — AI 编码工程师方法论与 Skills 框架]] — 同赛道 13+ skills 自动触发,257K Stars
- [[开源项目分析/阅读/Harness工程-Multi-Agent架构实践|Harness Engineering]] — 阿里 Multi-Agent Harness 实践,理论侧
- [[开源项目分析/阅读/1688-Multi-Agent超级组织实践|1688 Multi-Agent 超级组织实践]] — 真实工程团队如何用 harness + loop 协作
- 原始链接:https://github.com/snarktank/ralph
- 原始设计思路:https://ghuntley.com/ralph/(Geoffrey Huntley 原文)
- 作者实战文章:https://x.com/ryancarson/status/2008548371712135632
