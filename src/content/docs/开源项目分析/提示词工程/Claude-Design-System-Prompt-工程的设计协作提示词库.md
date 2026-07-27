---
title: Claude Design System Prompt — 逆向工程设计协作提示词库
description: 一个逆向工程自 Anthropic Claude Design 的系统提示词和技能库，将 LLM 变为有观点、无障碍友好、反 AI 套话的设计协作者
tags: [Claude, system-prompt, design-system, LLM-agent, skill-library, MIT]
status: active
---

# Claude Design System Prompt

- **GitHub**: [Trystan-SA/claude-design-system-prompt](https://github.com/Trystan-SA/claude-design-system-prompt)
- **Stars**: ⭐ 1,707 (截至 2026-07)
- **License**: MIT
- **作用**: 将 LLM（Claude/GPT/Gemini 等）转化为有观点、无障碍友好、拒绝 AI 套话的设计协作者

## 概述

这是一个逆向工程自 Anthropic Claude Design 的系统提示词（system prompt）库。大多数"设计助手"提示词产出的是千篇一律的 SaaS 模板——激进渐变、emoji 装饰、圆角左边框卡片、全篇 Inter 字体。这套提示词明确拒绝这些模式，代之以完整的设计哲学：

- **内容纪律**：无填充——每个元素都要有存在的理由
- **美学纪律**：避免 AI 套话，承诺使用统一的调色板和基调
- **视觉层级与韵律**：大小、颜色、重量、位置、密度、间距比例
- **无障碍**：WCAG、语义 HTML、键盘导航、焦点环、动效偏好
- **交互与反馈**：hover、active、disabled、focus、loading、验证状态
- **系统思维**：组件与 token，而非一次性页面
- **尊重媒介**：真实的 CSS Grid、`oklch()`、`text-wrap: pretty`、真正的交互原型
- **质量重于数量**：深度重于广度，雕琢每一个细节

## 项目结构

```
claude-design-system-prompt/
├── claude/                           # Claude Code / Claude.ai 版本
│   ├── system-prompt.md              # 主系统提示词 — 20 章
│   └── skills/                       # 14 个可调用的技能
│       ├── discovery-questions.md
│       ├── frontend-aesthetic-direction.md
│       ├── wireframe.md
│       ├── make-a-deck.md
│       ├── make-a-prototype.md
│       ├── make-tweakable.md
│       ├── generate-variations.md
│       ├── design-system-extract.md
│       ├── component-extract.md
│       ├── accessibility-audit.md
│       ├── ai-slop-check.md
│       ├── hierarchy-rhythm-review.md
│       ├── interaction-states-pass.md
│       └── polish-pass.md
├── codex/                            # OpenAI Codex 版本（单循环，无子代理）
│   ├── AGENTS.md
│   ├── system-prompt.md
│   └── skills/                       # 相同技能，顺序审查而非并行代理
├── README.md
└── LICENSE
```

## 系统提示词 20 章

| #   | 章节           | 说明                                |
| --- | -------------- | ----------------------------------- |
| 1   | 身份与角色     | 定义 agent 的设计身份               |
| 2   | 工作流         | 设计流程的步骤规范                  |
| 3   | 先提问         | 动手前先了解上下文                  |
| 4   | 扎根现有语境   | 基于已有品牌/设计                   |
| 5   | 内容原则       | 无填充——每个元素都有意义            |
| 6   | 美学原则       | 有目的性的视觉设计                  |
| 7   | 视觉层级与韵律 | 大小、颜色、重量、位置              |
| 8   | 字体系统       | 排版规范                            |
| 9   | 色彩系统       | 调色板规范                          |
| 10  | 无障碍与包容性 | WCAG、语义、键盘                    |
| 11  | 交互与反馈     | hover/active/disabled/focus/loading |
| 12  | 简洁与单一 CTA | 一个主要行动点                      |
| 13  | 系统思维       | 组件与 token                        |
| 14  | 尊重媒介       | 真实的 CSS、真交互                  |
| 15  | 理解用户       | 以用户为中心                        |
| 16  | 质量重于数量   | 深度重于广度                        |
| 17  | 输出原则       | 输出格式规范                        |
| 18  | 协作与交付     | 如何交付成果                        |
| 19  | IP 与内容边界  | 知识产权边界                        |
| 20  | 可用技能       | 14 个可调用技能                     |

## 技能分类

**Production（生产）** — 构建产出

- `discovery-questions` · 发现提问
- `frontend-aesthetic-direction` · 前端美学方向
- `wireframe` · 线框图
- `make-a-deck` · 制作演示文稿
- `make-a-prototype` · 制作交互原型
- `make-tweakable` · 浮动调整面板
- `generate-variations` · 生成多个变体

**System（系统）** — 提取结构

- `design-system-extract` · 提取设计系统 token
- `component-extract` · 梳理可复用组件

**Review（审查）** — 审计与修复

- `accessibility-audit` · WCAG 无障碍审计
- `ai-slop-check` · AI 套话检测（渐变 / emoji / 字体的套路）
- `hierarchy-rhythm-review` · 层级韵律审查
- `interaction-states-pass` · 交互状态审查
- `polish-pass` · 全面润色审查

典型的从零开始流程：

```
discovery-questions → frontend-aesthetic-direction → wireframe → make-a-prototype → polish-pass
```

有品牌的流程：

```
design-system-extract → generate-variations → make-tweakable → polish-pass
```

## 关键技术特点

1. **模型校准**：针对 Claude Fable 5 / Opus 4.7+ 等新模型优化，使用条件式表达而非配额式命令（"当 X 时做 Y" 而非 "你必须问 N 个问题"）
2. **明确的技能触发条件**：每个技能描述都说明了何时调用
3. **覆盖优先的审查**：审查 agent 报告所有发现（含置信度），由聚合步骤过滤
4. **防 AI 套话**：`ai-slop-check` 技能可检测渐变背景、过度装饰、默认字体等常见 AI 设计套路
5. **跨平台**：Claude 和 Codex 两个变体，也可适配其他 LLM

## 使用方式

1. 直接粘贴 `system-prompt.md` 作为任意 LLM 的系统提示词
2. agent 会自动遵循设计哲学，在匹配任务时引用技能
3. 可根据目标平台调整——Figma 插件、纯代码助手、纯聊天设计教练均可适配
4. MIT 许可，可商用，无需署名

## 亮点

- 逆向工程自 Anthropic 官方 Claude Design 产品
- 1700+ Stars，社区热度高
- 提供了 14 个可落地的设计流程技能
- 对 AI 生成设计的"套话"有系统性防御
- 可与 Claude Code、Claude.ai、GPT、Gemini 等配合使用
