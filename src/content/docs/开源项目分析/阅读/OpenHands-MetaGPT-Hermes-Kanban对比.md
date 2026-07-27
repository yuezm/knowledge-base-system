---
title: OpenHands / MetaGPT / Hermes Agent 的 Kanban 对比
description: 三家 AI Agent 框架的任务管理系统横向对比 — OpenHands 伪 kanban、MetaGPT 无 kanban（消息总线）、Hermes 完整真 kanban（SQLite 状态机）
status: active
tags: [ai-agent]
related:
  - AI/Agent/概览
  - AI/Agent/Agent发展
  - 开源项目分析/阅读/Hermes-Kanban多Profile持久化工作流与SubAgent对比
---

# OpenHands / MetaGPT / Hermes Agent 的 Kanban 对比

> **核心命题：** 三家框架代表三种完全不同的"任务管理"设计哲学——OpenHands 把 kanban 交给 LLM（agent 自主维护三态清单）、MetaGPT 把任务藏在消息流里（SOP 触发链）、Hermes Agent 把任务当成数据库里的一等公民（带状态机、依赖图、熔断器的真 kanban）。

## 一句话总览

| | OpenHands | MetaGPT | Hermes Agent |
|---|---|---|---|
| **有真 kanban?** | ❌ 伪 kanban（LLM 自维护） | ❌ 完全没有 | ✅ 完整真 kanban |
| **任务存储** | 每 conversation 一个 `TASKS.json` | 内存变量 `Role.rc.todo` | SQLite 多表 + 跨进程锁 |
| **状态机** | 3 态 `todo/in_progress/done` | 无状态机，靠 SOP 触发链 | 9 态含 triage/scheduled/review/blocked/archived |
| **多 agent 编排** | `ConversationService` + worktree | `Team` + `Environment` 消息总线 | 6 profile + 嵌入式 dispatcher + worker 派发 |
| **核心范式** | LLM 工具调用 | SOP + Message Bus | DB 一等公民 |

## 设计哲学差异

**OpenHands** 把"任务"当成 **agent 推理时的辅助记忆**——kanban 是 LLM 上下文的一部分，不是基础设施。所以它轻量、零状态、和 conversation 同生共死。

**MetaGPT** 把"任务"当成 **SOP 协作的消息触发器**——根本不需要状态机，`Action + Watch` 链本身就在描述流程。所以它没有"任务"的实体概念，只有"消息流"。

**Hermes Agent** 把"任务"当成 **一等公民基础设施**——和数据库表、跨进程锁、profile 配额、worker fork 协议绑在一起。所以它有真正的依赖图、熔断器、审计日志、跨 board 通知回推。代价是复杂度。

---

## 1. OpenHands — "伪 kanban"（LLM 自维护三态清单）

**没有真正的 kanban 系统**，它的"任务跟踪"是 `TaskTrackerTool`——一个 LLM 工具调用，agent 自己在 prompt 里维护一张清单。

```python
# openhands-tools/openhands/tools/task_tracker/definition.py
TaskTrackerStatusType = Literal["todo", "in_progress", "done"]
```

`TaskTrackerAction` 暴露 `view` / `plan` 两个命令，agent 通过 LLM 工具调用维护任务列表，持久化到 `save_dir/TASKS.json`（Pydantic `model_dump` JSON），按 conversation 隔离。

### 架构分层

```
┌── OpenHands Cloud (TS/React) ──┐
│  Agent Canvas UI              │
└──────┬────────────────────────┘
       │ REST + WebSocket
┌──────▼─── Agent Server (FastAPI) ──┐
│  ConversationService ──> EventService(PubSub) ──> LocalConversation
│  CONVERSATION_WORKTREE_ROOT = /tmp/conversation-worktrees
└──────┬────────────────────────────────┘
       │
┌──────▼────────── openhands-sdk ──────────────┐
│  Agent (CriticMixin+ResponseDispatch) ──> step() loop ──> LLM ──> Tools
│  Conversation / ConversationState / Event bus / Subagent registry
└──────┬──────────────────────────────────────┘
       │
┌──────▼────────── openhands-tools ────────────┐
│  TerminalTool / FileEditorTool / TaskTrackerTool / BrowserUseTool / …
└────────────────────────────────────────────┘
```

### 多 agent 机制

`openhands-sdk/openhands/sdk/subagent/` 文件式 agent 注册（`.agents/agents/*.md` / `.openhands/agents/*.md` / `~/.openhands/agents/*.md`），通过 `AgentDefinition` + YAML frontmatter。优先级：编程注册 > 插件 > 项目 > 用户 > 内置。Subagent 复用父 LLM（`model: inherit`）。

### 关键代码

```python
# definition.py:148-266
class TaskTrackerExecutor(ToolExecutor):
    def __init__(self, save_dir: str | None = None):
        self.save_dir = Path(save_dir) if save_dir else None
        self._task_list: list[TaskItem] = []
        if self.save_dir: self._load_tasks()

    def __call__(self, action: TaskTrackerAction, conversation=None):
        if action.command == "plan":
            self._task_list = action.task_list
            if self.save_dir: self._save_tasks()
            return TaskTrackerObservation(...)
```

```python
# conversation_service.py:78-101
CONVERSATION_WORKTREE_ROOT = Path("/tmp/conversation-worktrees")

def _build_worktree_guidance(*, source_workspace, worktree_root, workspace_dir, branch) -> str:
    return (f"This conversation uses a dedicated git worktree.\n"
            f"- Original workspace: {source_workspace}\n"
            f"- Worktree root: {worktree_root}\n"
            f"- Active workspace: {workspace_dir}\n"
            f"- Branch: {branch}\n"
            "Do all file and git work inside this worktree...")
```

### 仓库迁移说明

原 `All-Hands-AI/OpenHands` 仓库已变成 TS/React 的 "Agent Canvas" 控制面板，经典 Python 架构已迁到 `OpenHands/software-agent-sdk` monorepo（含 `openhands-sdk/` + `openhands-tools/` + `openhands-workspace/` + `openhands-agent-server/` 四个子包）。

---

## 2. MetaGPT — 完全没有 kanban，靠 SOP + 消息总线

**GitHub code 搜 `repo:FoundationAgents/MetaGPT kanban` 命中 0 个代码。** 仓库无 `kanban/`、`board/`、`workspace/`、`tasks/` 目录。`metagpt/management/` 只有 `__init__.py` 和 `skill_manager.py`（管理"技能注册"，不是任务看板）。

### 核心机制：SOP（标准操作程序）+ Message Bus

```
UserRequirement → WritePRD → WriteDesign → ProjectManager.WriteTasks
  → Engineer._act(ExecuteTask) → WriteCode → QAEngineer → ...
```

每步是 `Action`，`Role._watch([ActionA, ActionB])` 监听上游 Action 产出的 `Message`，触发下一步。

| 机制 | 实现 | 路径 |
|---|---|---|
| 团队容器 | `Team` 类持有 `env: Environment` | `metagpt/team.py` |
| 角色注册 | `Environment.roles: dict[str, BaseRole]` | `metagpt/environment/base_env.py` |
| 消息路由 | `Environment.member_addrs: Dict[BaseRole, Set]` 按 `send_to` 字段分发 | 同上 |
| 发布消息 | `Environment.publish_message(msg)` | 同上 |
| 接收消息 | `Role.put_message(msg)` → `Role.msg_buffer`（私有缓冲） | `metagpt/roles/role.py` |
| 订阅消息 | `Role._watch([ActionA, ActionB])` 订阅特定 Action 产出的消息 | 同上 |
| 任务分解 | `ProjectManager` 角色用 `WriteTasks` Action 拆解 PRD | `metagpt/roles/project_manager.py` |
| 任务执行 | `ExecuteTask` Action + `Role.rc.todo` 当前任务 + `Role.states` 状态 | `metagpt/actions/execute_task.py` + `roles/role.py` |
| 轮次驱动 | `Team.run(n_round)` → `Environment.run(k=1)` 异步并发所有角色 | `team.py` |

### 关键代码

```python
# metagpt/team.py - 团队容器
class Team(BaseModel):
    env: Environment = Field(default_factory=Environment)
    investment: float = 10.0
    idea: str = ""

    def run_project(self, idea, send_to):
        self.idea = idea
        self.env.publish_message(Message(content=idea, send_to=send_to))
        self.env.run()
```

```python
# metagpt/environment/base_env.py - 消息总线核心
class Environment(BaseModel):
    desc: str = Field(default="")
    roles: dict[str, BaseRole] = Field(default_factory=dict)
    member_addrs: Dict[BaseRole, Set] = Field(default_factory=dict)
    history_memories: list[Message] = Field(default_factory=list)

    def publish_message(self, message: Message) -> bool:
        # 路由：根据 message.send_to 找到目标 role set
        ...

    async def run(self, k=1):
        # 异步并发所有 role._observe() / _think() / _act()
        ...
```

```python
# metagpt/roles/role.py - Role 抽象类的 watch 机制
class Role(BaseRole, BaseModel):
    states: list[str] = []
    todo: Action = None

    def _watch(self, actions: list[Type[Action]]):
        # 订阅这些 Action 产出的消息
        self.watch = actions

    async def _observe(self):
        # 从 msg_buffer 过滤出 cause_by ∈ self.watch 的消息
        ...
```

**没有专门的"Project Management"子系统**——`metagpt/actions/project_management.py` 只是单个 Action 而已。**没有 mermaid/AIRD 画 kanban，也没有真实任务看板 UI。** 它的 dashboard 输出是文件树 + git log（`Environment.archive()` 用 `GitRepository.archive()` 归档到磁盘）。

### 仓库迁移说明

`geekan/MetaGPT` 已迁移到 `FoundationAgents/MetaGPT`。

---

## 3. Hermes Agent — 完整真 kanban + 多 profile 派发

### 存储

**SQLite**，每 board 一个 `kanban.db`（`~/.hermes/kanban/boards/<slug>/kanban.db`）+ `board.json` 元数据。WAL + 跨进程排他锁（fcntl）。

- 单库 3 张主表 + 5 张关联表（含 `task_events` 审计日志、`task_links` 依赖图、`kanban_notify_subs` 跨 board 订阅回推）
- Board 跨 profile 共享（故意设计，避免 dispatcher/worker handoff 被 profile 切碎）

### 状态机（9 态）

```python
# kanban_db.py:102
VALID_STATUSES = {"triage", "todo", "scheduled", "ready", "running", "blocked", "review", "done", "archived"}
```

完整流转：`triage → todo → (scheduled →) ready → running → {done, blocked, review → todo}`

- `todo` 须等所有 parent（`task_links`）done 才被 promote 到 `ready`
- `blocked.block_kind` 区分 `dependency`（回 `todo` 等父任务）vs 其他（留在 `blocked` 等人介入）
- 连续失败由 `consecutive_failures` 计数，达 `failure_limit`（默认 3，可 per-task 覆盖）自动 block（熔断器）

### 多 profile 架构

`~/.hermes/profiles/{architect, coder, pm, qa, retro}`：
- task 有 `assignee`（== profile 名称）+ `tenant` 做租户隔离
- `kanban.max_in_progress_per_profile` 每 profile 并发配额
- 完整契约链：architect 产 `metadata.test_checklist` → coder 据此实现 → qa 据此验证 → retro 聚合 `lessons_learned`

### Dispatcher 派发（`kanban_db.py:7843` `_dispatch_once_locked`，每 60s tick）

```
reap zombies → release_stale_claims(TTL 过期)
  → detect_stale_running(心跳超时)
  → detect_crashed_workers(PID 死亡)
  → promote todo→ready(父任务门控)
  → claim ready tasks + spawn_fn fork worker (hermes -p <profile> --kanban-worker ...)
```

- **嵌入式**：默认跑在 `hermes gateway` 进程内（`kanban.dispatch_in_gateway=true`），无需独立 daemon；全局 `.dispatcher.lock` 防多 gateway 抢同一块板
- **Worker 协议**：必须用 `kanban_complete` / `kanban_block` 结束，否则 `kanban_stop` 注入 nudge，再不然 dispatcher 记为 `protocol_violation` 并自动 block
- **Goal-mode**：`goal_mode=1` 时 worker 同一 session 循环（judge 评估 → 续 prompt）直到 judge 同意完成或 `goal_max_turns` 用完（Ralph-style）

### 关键代码

```python
# kanban_db.py:7843 _dispatch_once_locked - 派发核心
def _dispatch_once_locked(self) -> int:
    """每个 tick 顺序：reap → release → detect → promote → claim → spawn"""
    self._reap_zombies()                              # 1. 清理僵尸
    self._release_stale_claims(ttl_seconds=300)       # 2. 释放 TTL 过期 claim
    self._detect_stale_running(heartbeat_timeout=120) # 3. 心跳超时
    self._detect_crashed_workers()                    # 4. PID 死亡检测
    promoted = self._promote_todo_to_ready()          # 5. todo→ready (父任务门控)
    spawned = 0
    for task in self._claim_ready_tasks():            # 6. 抢占 ready 任务
        if self._current_running_count() >= self.max_spawn:
            break
        self._spawn_worker(task)                      # 7. fork worker
        spawned += 1
    return spawned
```

```python
# agent/kanban_stop.py - worker 协议守卫
class KanbanStopHook:
    """Turn-end: 检查 worker 是否调用了 kanban_complete / kanban_block"""
    def check(self, conversation_state):
        if not conversation_state.tool_calls_made(["kanban_complete", "kanban_block"]):
            return StopInjection(
                nudge="⚠️ 你在跑 kanban worker 任务，但没调用 kanban_complete/block。"
                      "请现在就调一个，否则 dispatcher 会判 protocol_violation。"
            )
```

### 关键源码

| 路径 | 行数 | 作用 |
|---|---|---|
| `hermes_cli/kanban_db.py` | 9584 | SQLite schema、Task/Board 数据类、`claim_task`、`dispatch_once`、`release_stale_claims`、状态校验、SQLite WAL + cross-process 锁 |
| `hermes_cli/kanban.py` | 3087 | `hermes kanban` argparse CLI 树、`kanban_command` 派发、文本/JSON 输出、slash-string 解析（`/kanban ...`） |
| `gateway/kanban_watchers.py` | 1286 | `GatewayKanbanWatchersMixin`：嵌入 gateway 的 dispatcher 主循环（60s tick）、singleton 锁、notifier watcher、artifact delivery |
| `tools/kanban_tools.py` | 2030 | LLM 工具：`kanban_complete` / `kanban_block` / 等（worker 端调用） |
| `agent/kanban_stop.py` | 108 | Turn-end 守卫：worker 忘记调 `kanban_complete/block` 时注入 nudge 防止协议违规 |
| `hermes_cli/kanban_swarm.py` | 278 | Swarm/多 agent 编排（`kanban decompose`、`kanban swarm`） |

UI 是 plugin：`plugins/kanban/dashboard/` Python 后端 + 单文件 React build。

---

## 4. 横向对比矩阵

### 4.1 核心定位

| 维度 | OpenHands | MetaGPT | Hermes Agent |
|---|---|---|---|
| 是否有独立 kanban UI | ❌（仅 task_tracker Tool 维护三态清单） | ❌（无看板概念） | ✅（plugins/kanban/dashboard Web UI） |
| 任务持久化 | `TASKS.json` per conversation | 内存变量（进程结束就丢） | SQLite 多表（带审计日志） |
| 任务管理范式 | LLM-driven tool 调用（agent 自己写 plan） | SOP + Message Bus 触发链 | DB 一等公民 + 状态机 + 熔断器 |
| 多 agent 调度 | `Subagent`（文件注册 + 优先级链） | `Role` + `Environment` 消息路由 | `profile` + dispatcher 派发 + worker fork |
| 工作区隔离 | 每 conversation 一个 **git worktree** | 无 | profile-scoped worker 进程 |
| 事件流 | `PubSub[Event]` + WebSocket | Environment 内存 message 队列 | `task_events` 审计表 + gateway 轮询 |
| 任务依赖图 | ❌ | ❌ | ✅（`task_links` parent/child） |
| 熔断器 / 失败计数 | ❌ | ❌ | ✅（`consecutive_failures` + `failure_limit`） |
| 跨会话通知回推 | ❌ | ❌ | ✅（`kanban_notify_subs`） |
| 实时看板 UI | ❌ | ❌ | ✅（plugin dashboard） |
| Goal-mode 自循环 | ❌ | ❌ | ✅（`goal_mode=1` + judge 评估） |

### 4.2 状态机复杂度

```
OpenHands (3 态):    todo ──→ in_progress ──→ done
                       └──────────┘ (可回退)

MetaGPT (0 态):      无状态机；任务状态 = Role.rc.todo 内存变量

Hermes (9 态):       triage ──→ todo ──→ scheduled ──→ ready ──→ running
                        ↑                                            │
                        │                                            ▼
                        └────── review ◄────────────────── { done, blocked }
                                       (review → todo 回流)
```

### 4.3 部署形态

| | OpenHands | MetaGPT | Hermes Agent |
|---|---|---|---|
| 运行方式 | Agent Server (FastAPI) + SDK | 进程内 `Team.run()` | `hermes gateway` 嵌入式 dispatcher |
| 持久化守护 | Agent Server 常驻 | 一次性脚本 | gateway daemon + profile worker 池 |
| 扩展性 | 多 conversation 并行 | 多 role 并发（异步） | 多 profile × 多 board × 多 worker |
| 远程协作 | WebSocket / REST | 无（单进程） | gateway 跨进程锁 + 跨 board 通知 |
| CLI | SDK Quick Start | `metagpt` CLI | `hermes kanban` 子命令树（3087 行） |

### 4.4 适用场景

- **OpenHands**：单 agent 一次性跑软件任务（小到中等），需要 worktree 隔离 + LLM 自主规划。不适合长链协作。
- **MetaGPT**：模拟公司 SOP 一次性产出完整软件（PRD → 设计 → 代码 → 测试）。适合"演示多 agent 协作"而非"长跑生产任务"。
- **Hermes Agent**：长链、并行、多角色生产任务（架构 → 编码 → QA → retro），需要审计、熔断、跨会话回推。复杂度最高。

---

## 5. 引用

### OpenHands
- SDK 仓库：https://github.com/OpenHands/software-agent-sdk
- 原论文：https://arxiv.org/abs/2407.16741
- 新 SDK 论文：https://arxiv.org/abs/2511.03690
- 官方文档：https://docs.openhands.dev/sdk/arch/overview

### MetaGPT
- 仓库主页：https://github.com/FoundationAgents/MetaGPT
- 核心消息总线源码：https://raw.githubusercontent.com/FoundationAgents/MetaGPT/main/metagpt/environment/base_env.py
- Team 容器源码：https://raw.githubusercontent.com/FoundationAgents/MetaGPT/main/metagpt/team.py
- ProjectManager 角色源码：https://raw.githubusercontent.com/FoundationAgents/MetaGPT/main/metagpt/roles/project_manager.py
- 原论文：https://arxiv.org/abs/2308.00352

### Hermes Agent
- 源码：https://github.com/just-every/hermes-agent （公开仓库，本地是开发副本）
- 核心文件：`hermes_cli/kanban_db.py` (9584 行) + `hermes_cli/kanban.py` (3087 行) + `gateway/kanban_watchers.py` (1286 行)
- 6 profile 架构：见 [[开源项目分析/阅读/Hermes-Kanban多Profile持久化工作流与SubAgent对比]]
- Web UI plugin：`plugins/kanban/dashboard/`
- 多 gateway 文档：`docs/kanban/multi-gateway.md`

---

## 6. 一句话总结

**OpenHands 把 kanban 给 LLM（agent 推理时维护的临时记忆），MetaGPT 把任务藏在消息流里（SOP 触发链本身描述任务），Hermes Agent 把任务当成 DB 里的行（带状态机、依赖图、熔断器、跨进程锁的一等公民）。**

## 相关阅读

- [[AI/Agent/概览]] — Agent 系统总览（MCP / Tool Use / 工作流 / 记忆）
- [[AI/Agent/Agent发展]] — Agent 架构演进知识图谱
- [[开源项目分析/阅读/Hermes-Kanban多Profile持久化工作流与SubAgent对比]] — Hermes Kanban 与 Claude Code/OpenCode SubAgent 的 5 维对比
