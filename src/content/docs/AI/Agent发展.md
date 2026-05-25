---
title: AI 系统演进
description: AI 系统演进
---

## AI 系统的演进

### 规则驱动时代（专家系统）

早期计算机科学的核心思想是：**人类把世界的逻辑写成规则，让机器执行**

典型形式：

```text
if 条件:
   执行动作
else:
   执行另一动作
```

典型系统：

1. Expert System（专家系统）
2. 早期客服机器人
3. 规则搜索系统

特点：

1. 高度确定性：相同输入必然得到相同输出
2. 逻辑透明：所有决策路径都可解释
3. 几乎没有泛化能力：一旦输入超出开发者预设的规则范围，系统就会失效

就像一个死板的售票员，“按 1 查询余额，按 2 修改密码”。如果你说：“我钱丢了想查余额”，系统往往无法理解，因为它只匹配预设关键词

### 机器学习时代（特征工程）

随着互联网数据爆发，人类开始放弃手写规则：**让机器从数据中学习规律**

典型形式，机器学习模型通过训练数据建立：

```text
Input → Model → Prediction
```

典型应用：

1. 搜索排序
2. 推荐系统
3. 图像识别
4. 语音识别

特点：

1. 具备统计预测能力
2. 可以泛化到新数据
3. 不具备复杂推理能力务

就像一个背过书的图书管理员，他不会真正理解你的需求，只是在找关键词。如果你说：“我不记得登录凭证了，想换个新的”，系统可能找不到关键词 “密码”，就无法处理

机器学习模型擅长**识别“模式”**，但并不真正**理解任务**

### 大模型时代（LLM）

随着算力增长和 Transformer 架构的出现，大规模语言模型成为可能

典型模型：

1. GPT-4
2. Claude
3. Gemini

LLM 的核心能力：

1. 自然语言理解
2. 复杂推理
3. 知识整合
4. 工具调用

与传统机器学习不同，LLM 不再只是做统计预测，而是可以在一定程度上**理解问题并进行推理**

可以把它类比为，一个受过广泛教育的知识工作者。它不仅能理解你说的话，还可以通过常识推理出你的真实需求。例如：“我不记得登录凭证了。”，LLM 能推断出：你可能想 重置密码

## Agent 架构的演进

随着 LLM 出现，人们开始构建 AI Agent（智能体）

Agent 的目标是：**让 AI 不仅能回答问题，还能自主完成任务**

```
Agent =
LLM
+ Memory
+ Tools
+ Planning
+ Reflection
```

### 什么是 Agent？

Agent 这个词现在被滥用得厉害，凡是能调工具的 AI 都敢叫自己 Agent，[The 2025 AI Agent Index](https://arxiv.org/abs/2602.17753) 这份报告给出了目前最严格也最清晰的入选门槛，四个条件缺一不可，如下所示：

1. 自主性：能在没有持续人工干预的情况下运行，自己做有实质影响的决策
2. 目标复杂度：能拆解高层级目标，做长链路规划，至少能连续自主调用 3 次以上工具，不需要你手把手给步骤
3. 环境交互：有写权限，能真正改变外部世界——不是只说话，是真的动手
4. 通用性：能处理模糊指令，适应新任务，不是只会一招的窄域工具

#### Agent 分类

研究团队把 Agent 分成三类，每类的技术架构和风险特征都完全不同，可参考[AI Agent Index](https://aiagentindex.mit.edu/2025/)

1. Chat 类：对话界面 + 工具调用
2. 浏览器类：直接控制电脑和网页
3. 企业工作流类：自动化业务流程

具体可以直接查看网页

#### 自主程度分类

研究团队把 Agent 自主度分级框架，分为了五个等级

4. L1：人主导，Agent 只负责执行具体指令
5. L2：人与 Agent 协作规划，共同执行
6. L3：Agent 主导执行，人在关键节点审批
7. L4：Agent 自主执行大部分，人只作为审批者
8. L5：Agent 完全自主，人只是旁观者

### Prompt 时代（问答机器）

最早的大模型应用结构非常简单

典型产品：

1. ChatGPT
2. 文本生成工具

系统结构：

```text
User
 ↓
Prompt
 ↓
LLM
 ↓
Answer
```

缺点：

1. 无法拆解任务
2. 无法执行动作
3. 上下文有限
4. 不具备长期记忆

本质上，这一阶段的大模型仍然只是一个“超级问答系统”

#### Prompt Engineering

Prompt Engineering，提示词工程

人们很快发现，LLM 对自然语言指令极其敏感。通过设计特定的 Prompt 模板，可以显著提升模型表现，这就是 Prompt Engineering

常见范式：

- Zero-Shot：零示例学习，不给任何示例，仅描述任务
- Few-Shot：少量示例学习，给模型几个示例，让模型模仿示例完成任务

### Chain 时代（线性流水线）

思维链 (CoT, Chain of Thought)。为了解决复杂逻辑，人们开始把多个 Prompt 串联起来，前一个的输出作为下一个的输入。此时已经可以构建复杂流程了

代表框架：

1. LangChain
2. LlamaIndex

系统结构：

```text
Prompt
  ↓
Tool
  ↓
Prompt
  ↓
Tool
```

问题：

1. 流程高度线性
2. 错误难以回滚
3. 缺乏动态决策能力

AI 开始能够执行流水线，例如`用户申请退货 -> 系统查订单 -> 发起退款 -> 发短信`，如果“系统查订单”发现订单已过保，流水线通常就“卡死”或报错了，它不知道该怎么跳回去问问经理能不能特殊处理

### Single Agent 时代（自主智能体）

随着研究深入，出现了真正意义上的 Agent 架构

代表框架：

1. AutoGPT

系统结构：

```text
Goal
 ↓
Plan
 ↓
Act
 ↓
Observe
```

Agent 可以：

1. 制定计划
2. 调用工具
3. 根据结果继续执行

问题：

1. 稳定性差
2. 成本高
3. 可控性弱
4. 容易陷入循环

可以把它类比为，一个刚入职但非常聪明的新人。他会主动做事，但有时会跑偏任务、忘记最初目标

#### 思考范式

为了提升 Agent 的可靠性，研究者提出了多种推理框架

1. ReAct（Reason + Act）：思考 -> 行动 -> 观察
2. Plan-and-Solve：拿到任务先不行动，而是先列出完整的步骤清单，然后再按计划执行
3. Reflexion：通过失败反馈改进策略
4. Self-Critic / Self-Refine：生成结果 → 自我审查 → 修改结果
5. Thought Generation：探索多条路径，像人类一样进行博弈决策

#### RAG

RAG（Retrieval-Augmented Generation），检索增强生成

RAG 的目标是解决三个核心问题：

1. 知识截断：LLM 的知识停留在训练时间点
2. 私有数据孤岛：企业文档无法直接训练模型
3. 幻觉问题：模型可能编造事实

RAG 通过引入外部知识库解决这些问题

标准 Pipeline 是：

```text
User Query
     ↓
Embedding
     ↓
Vector Search
     ↓
Retrieve Context
     ↓
LLM
     ↓
Answer
```

#### Function Calling

Function Calling (函数调用)

Function Calling 是 LLM 的一种输出范式。大模型本身不能运行代码，它只能输出文本。Function Calling 让模型在需要时，不再输出聊天文字，而是输出一段 **符合特定格式的 JSON 数据**

```json
{
  "function": "get_weather",
  "arguments": {
    "city": "Beijing"
  }
}
```

系统解析 JSON 后调用真实 API，再把结果返回给模型。这样 LLM 就能间接控制外部系统

提示：LLM 通过 Function Calling 发出指令，这些指令顺着 MCP 协议定义的路径，精准地送达外部工具并取回数据

### Multi-Agent 时代（协作系统）

为了提升稳定性，人们开始**角色扮演**与**多人协作**，通过互相质疑和审计来提高准确率

代表框架：

1. AutoGen
2. CrewAI

系统结构：

```text
Planner Agent
      ↓
Coder Agent
      ↓
Reviewer Agent
```

不同 Agent 负责不同角色：

1. Planner：任务规划
2. Executor：执行任务
3. Critic：结果评估

优势：

1. 任务拆分
2. 专业分工
3. 更强能力

问题：

1. 成本高
2. 调度复杂
3. 仍然难以控制

像是一个成熟的现代公司。财务 Agent 发现账户余额不足，会退回给客服 Agent 告知用户。大家互相制衡、互相审计，出错率大幅下降

### Workflow + Agent 时代（带 SOP 的精英团队）

目前最主流的架构是：Workflow 控制流程（图形化编排） + Agent 负责智能

代表框架：

1. LangGraph
2. Dify
3. Flowise
4. Coze

系统结构：

```text
Workflow
   ↓
Agent
   ↓
Tools
```

优势：

1. 流程可控
2. 稳定性更高
3. 方便产品化

就像带 GPS 导航的自动驾驶。路线（Workflow）是提前划好的，保证不会开到沟里去；但在具体的超车、避障（处理用户奇奇怪怪的语义）时，利用 AI 的自主性（Agent）来解决

#### HITL

HITL (Human-in-the-Loop)，人机回环

在 Workflow 中设置“审批点”。Agent 准备执行高危动作（如：删除 GIS 数据库图层）前，必须等待人类点击“允许”。解决了 AI 落地最后 1% 的安全性问题

#### MCP

MCP（Model Context Protocol）模型上下文协议

AI 生态面临的最大问题之一是**工具接口碎片化**

例如：

1. Google Drive API
2. GitHub API
3. Notion API

接口格式各不相同

MCP 提供了一种标准协议，使工具能够通过 MCP Server 暴露统一接口。这样 Agent 可以像使用**标准化 USB 接口**，一样调用各种工具

#### Memory Management

Memory Management (长短期记忆管理)

LLM 的最大限制之一是**上下文窗口有限**

Memory 系统用于解决：

1. 上下文溢出
2. 用户个性化
3. 长任务状态保存

Memory 通常分为两类

**短期记忆** 保存在上下文中：

1. 当前任务信息
2. 最近思考步骤
3. 工具调用结果

类似人的工作记忆

**长期记忆** 存储在数据库中：

1. 用户偏好
2. 历史任务结果
3. 重要事实

类似人的长期经验

#### Skills

Skills/Create-Skills

当任务复杂时，单个 Function Calling 太过琐碎。比如“查地图并计算面积”需要调三四个 API，每次都要 AI 重新规划非常低效且易错。于是产生了 Skills，将一系列原子动作封装成一个“复合技能”

Skill 本质是**一组工具调用的封装**。

例如：计算地图面积

可能包含：

1. 查询地图 API
2. 获取坐标
3. 计算面积

Agent 只需要调用 `calculate_area()`，而不必重新规划每一步

## 其他

### 术语

SOP：standard operating procedure，标准作业程式

### 参考

- [The 2025 AI Agent Index](https://arxiv.org/abs/2602.17753)
- [Why create an index of agentic AI systems?](https://aiagentindex.mit.edu/2025/further-details/)
