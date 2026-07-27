---
title: Hermes Kanban 多 Profile 持久化工作流与 SubAgent 对比
description: Hermes Agent Kanban 多 Profile 协作体系与 Claude Code / OpenCode SubAgent 的对比，覆盖生命周期、专业化、隔离粒度、调度能力等维度
status: active
---

# Hermes Kanban 多 Profile 持久化工作流与 SubAgent 对比

> **核心命题：** Claude Code / OpenCode 的 SubAgent 是 session 内临时工，Hermes Kanban 是多 Profile 持久化工作流。两者面向完全不同的需求层次。

---

## 一句话核心区别

**CC/OpenCode 的 SubAgent 是 session 内临时工，Hermes Kanban 是多 Profile 持久化工作流。**

---

## 详细对比

### 1. 生命周期

| 体系                  | 行为                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------- |
| CC Task / OpenCode delegate | 跑完就扔，skills / 记忆 / 配置都不继承，下个任务从零开始                            |
| Hermes Kanban Profile | 持久配置（skills / plugins / cron / memories 各自独立），跨 session 积累能力，长期进化 |

**影响：** Hermes 的 PM / Coder / QA 三个 Profile 越用越专业，CC 的 sub-agent 每次都是白板。

### 2. 专业化方式

| 体系                  | 行为                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------- |
| Claude Code           | 靠 system prompt 扮演不同角色（"你现在是 explore agent"），工具、模型、视野完全一样     |
| OpenCode              | 类似 CC，prompt 模拟，物理层不隔离                                                       |
| Hermes Kanban         | Profile 维度硬隔离。Coder 关掉 web 工具专注编码，QA 专门跑测试——是物理隔离不是 prompt 模拟 |

**关键点：** Hermes 是 OS 级别的资源隔离，CC 是"角色扮演"。隔离的稳定性、可控性、Token 经济性都不同。

### 3. 任务心智模型

| 体系                  | 行为                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------- |
| CC / OpenCode         | Fork-join 模式，结果合流回主对话。简单并发，无状态机                                     |
| Hermes Kanban         | 项目管理心智。PM 卡 / Coder 卡 / QA 卡 的 workflow；`kanban_block` 表达阻塞，`kanban_complete` 表达完成，`kanban_comment` 做 handoff。模拟的是真实工作流不是简单并发 |

**关键点：** Kanban 把 LLM 调用映射成"项目协作"语义。跨 Agent 协调靠留言（kanban_comment），不是返回值。

### 4. 隔离粒度

| 体系                  | 行为                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------- |
| CC / OpenCode         | Context 隔离，共享同一个项目和模型                                                       |
| Hermes Kanban         | Profile 隔离 + Context 隔离。不同 Profile 可同时跑不同项目，互不干扰                    |

### 5. 调度能力

| 体系                  | 行为                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------- |
| CC / OpenCode         | Sub-Agent 跑完回主线程。无定时、无批处理、无跨 session 调度                              |
| Hermes Kanban         | Dispatcher 跨 Profile 派发，配合 cron 跑长周期批处理（每日归档、每周审计），这层 CC/OpenCode 完全没有 |

---

## 场景选择指南

### 什么时候用 CC / OpenCode SubAgent

- "现在并行帮我查 3 个库的 README" → fork-join 直接出
- 临时性研究，5 分钟内出结果
- 不想维护任何配置

### 什么时候用 Hermes Kanban

- "我有一个 4 步研发流程，每步不同 agent 接力" → PM → Coder → QA
- "每天早上自动跑测试、归档昨天的文章" → Kanban + cron
- 长期固化的角色分工（PM / Coder / QA / Researcher）
- 跨项目复用同一套工作流

### 什么时候都不需要

- 单次问答、单文件改动、简单任务
- 复杂度低于"需要 2 个 agent 配合"

---

## Hermes Kanban 的核心机制

### 4 个 Profile 分工

| Profile       | 角色            | 典型配置                                          |
| ------------- | --------------- | ------------------------------------------------- |
| `default`     | 编排者          | 全工具，处理用户请求 + 派发到其他 profile         |
| `coder`       | 编码 worker     | 关闭 web 工具，专注文件系统 + terminal            |
| `pm`          | 项目管理 worker | 走 Kanban workflow，管理任务卡片                  |
| `qa`          | 测试审核 worker | 跑测试、检查 lint、verify diff                    |

### Profile ≠ Agent

**Profile 是配置**（独立的 skills / plugins / cron / memories 目录），Agent 是运行实例。一个 Profile 可以起多个 Agent session。

### 关键工具

- `kanban_*` 工具族：卡片的创建、完成、阻塞、评论
- `delegate_task`：跨 Profile 派发任务，结果异步回传
- `cronjob`：定时触发，自动派发到指定 Profile

---

## 代价与权衡

| 维度        | CC / OpenCode              | Hermes Kanban                                    |
| ----------- | -------------------------- | ------------------------------------------------ |
| 上手成本    | 零，开箱即用               | 高（4 个 Profile、SOUL.md、disabled_toolsets、dispatcher） |
| 配置维护    | 无                         | 需要持续调优 Profile 边界                       |
| 轻量任务    | ✅ 更直接                  | ❌ 杀鸡用牛刀                                    |
| 重型工作流  | ❌ 不支持                  | ✅ 唯一解                                        |
| 长周期批处理| ❌ 无能力                  | ✅ cron + Kanban 闭环                            |
| 跨 session 记忆 | ❌ 无                    | ✅ Profile 级 memory 持久化                      |

---

## 总结

> **CC/OpenCode SubAgent 是"快招工"——叫一个临时工干活，干完走人。**
> **Hermes Kanban 是"建公司"——招不同岗位的人，分配固定职责，配 SOP，跑长期项目。**

轻量场景用 CC/OpenCode；长期固化的工作流才值得上 Hermes Kanban。两者不是替代关系，是不同抽象层次。

---

## 参考

- [[开源项目分析/阅读/1688-Multi-Agent超级组织实践|1688 Multi-Agent 超级组织实践]] — 团队级 Multi-Agent 协作的真实工程案例
- [[AI/Agent/Agent发展|AI 系统演进]] — 从规则驱动到 Multi-Agent 的完整脉络
