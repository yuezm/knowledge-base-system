---
title: htmx 与 AI 协作的具体案例
description: htmx 作者 Carson Gross 用 Claude 修 hyperscript parser bug 的全过程,演示 AI 在调查/测试环节强,在方案设计环节弱
sidebar:
  hidden: true
---

# htmx 与 AI 协作的具体案例

> 原文：https://htmx.org/essays/working-with-ai/
> 作者：Carson Gross（htmx / hyperscript 作者）｜2026-06-29
> 类型：观点/方法论 essay ｜非项目仓库

## 1. 核心技术栈/场景

- 解决的痛点：作者反思「与 AI 协作写代码」的真实边界——不是宣传、不是否定，而是用一次完整的 bug 修复过程，演示 AI 在哪里强、在哪里弱、为什么必须有懂行的人在 loop 里把控
- 涉及的技术/工具/模式：
  - **hyperscript**（xTalk 风格、context-sensitive 的 JS 解释器，递归下降 parser，grammar 动态定义）
  - **Claude**（作者的工作流：调查 + 测试生成环节重度依赖）
  - **"follows" 机制**：parser 关键概念——子解析器可以"让出"token 给上层命令
  - **技术债的指数增长假设**（作者自承"无证据，来自一个梦"）

## 2. 实践启示录

### 【马上能用】

- **"调查 + 测试"两段委派，"方案"必须自己定**——这是作者验证过的分工模型。AI 善于在已有代码里定位（grep 式推理 + 解释器）、生成边界用例；但提解决方案时倾向"局部最小修"，容易引入"半 hack 半工程债"
- **用 "follows/token 声明"思路解决二义性**——当两个语法都想抢一个关键字（如 `fetch` 的 `as JSON` vs 表达式转换的 `as Int`），不要加 flag、不要在底层 fallback，而是上层命令显式 `pushFollow("as")` → parse → `popFollow()`，把上下文敏感性控制住、作用域最小化
- **AI 测试生成的隐藏价值**：作者明确说"Claude 写的测试比我能写得更全"——把"我懒得写的边界用例"作为委派清单交付物

### 【避坑指南】

- **AI 第一个方案大概率是 hack**：先解析 `stringLike` 再 fallback 到 `expression`。能修当前 case 但没修通类（如变量作 URL 的 `fetch $url as JSON` 就漏了）。"看到能跑就合"是技术债主要来源
- **第二个方案可能"更工程化但方向错"**：加 `noConversions` flag 全局禁用 `AsExpression` 解析。问题不是它"脏"，而是它把"修 fetch 的 as 冲突"泛化到"所有命令都不能用 as 转换"，损害了 go 命令的合法用法
- **"AI 夸你对了" ≠ "AI 真的对"**——作者指出 fix 3 用了 follows 思路看着漂亮，但因为 `parseURLOrExpression()` 是 fetch 和 go 共享的，follows 实际上把"as 转换"在 go 命令里也禁掉了；只有 author 亲自看代码才发现这个 over-broad 影响
- **年纪越大 AI 越像拐杖，但也会钝化思维**——作者 50 岁自承：AI 补偿了记忆和精力下降，但同时"加速了我本来就在发生的智力退化"。不解决"该不该用 AI"的问题，但提出"必须保留不被 AI 替代的理解链路"

## 3. 核心代码片段

最终修复——把 follows 推/弹的作用域精确圈在 fetch 命令里，而不是共享的 `parseURLOrExpression()` 里：

```javascript
// FetchCommand.parse()
parser.pushFollow("as");
try {
    var url = parser.parseURLOrExpression();
} finally {
    parser.popFollow();
}

if (parser.matchToken("as")) {
    // ... 处理 as JSON / as Text
}
```

**反直觉 / 最新颖的观点**：
- "技术债按指数增长"是本文核心论断。作者没给数学证明（脚注：a dream），但用它解释了为什么一个看起来"能跑就行"的 AI 修法足以毁掉一个项目——你今天叠加的 hack 是明天所有新功能的税基
- "我作为人类在 loop 里要当 sorcerer 而不是 sorcerer's apprentice"——作者对 vibe coding 的反对浓缩成一句口号：骄傲于"不理解发生了什么"不是炫技，是失控

## 4. 横向对比

本文是**观点/方法论类**文章（不是工具方案），横向对比改对比"AI 协作的不同流派"。

### 4.1 定位分析

在"AI 协作"这场大讨论里属于什么定位：**实践派 + 怀疑派**——既不喊"AI 取代程序员"，也不喊"AI 是玩具"，而是把一次具体任务分层拆开给精确结论。
读者画像：5+ 年经验的工程师、库/框架维护者、对 vibe coding 警惕的资深开发者。

### 4.2 同类对比表

| 维度 | 本文（Carson Gross） | 流派 B：vibe coding 派 | 流派 C：纯否定派（DHH/老派） |
| --- | --- | --- | --- |
| 核心理念 | 人主导 + AI 委派可验证子任务 | 信任 AI、不必理解实现 | 拒绝 AI、坚持手写一切 |
| 证据支撑 | 一次完整 bug 修复的 4 步迭代 | 演示视频 + "它能跑" | 经验主义 + 长期主义论证 |
| AI 适用范围 | 调查、测试生成、辅助记忆 | 全流程 | 几乎不适用 |
| 对技术债态度 | 指数增长假设、必须严控 | "能跑就行，后期重构" | 凭纪律避免，从来就不该有 |
| 争议点 | "follows" 这种"邪道解法"本身就被传统派视作技术债 | 严重依赖 prompt 工程，模型一换代就崩 | 拒绝使用等于放弃生产力放大 |
| 适合谁 | 维护复杂基础设施的中高级工程师 | 快速原型 / 内部工具 / 个人项目 | 教育场景 / 安全关键 / 极致性能 |

### 4.3 选择建议

- 📌 **什么情况按本文方式协作**：你在维护一个有历史包袱/约定/不寻常设计的基础库；要修的 bug 涉及到底层结构（parser/状态机/分布式协议），AI 不知道你的项目哲学
- 📌 **什么情况可以 vibe coding**：一次性脚本、内部 demo、原型阶段 throwaway 代码；或者 AI 写的代码你不打算长期维护
- 📌 **什么情况坚持不用 AI**：安全/形式化验证场景；学习一门新语言/新系统，你想真正内化它；或者你的项目哲学就是"绝不接受 AI 写的代码进库"

### 4.4 领域趋势

- 当前主流：**AI 全流程代理**（Copilot Workspace、Cursor Composer、Devin 等）+ 营销叙事"agent 自己 ship 软件"
- 本文立场：**逆主流但具说服力**——在 AI 越吹越神的 2026，作者用一次平淡的 parser bug 修复告诉你"AI 还没聪明到能替你做架构决定"。属于"早期老炮的清醒"，和 Andrej Karpathy、DHH、Simon Willison 等"谨慎用 AI"派同调
- 是否超前：是——和业界"AGI 即将取代程序员"叙事完全相反。**但因为是 htmx 这种有真实项目维护经验的人写的，不容易被当成 Luddite 立场**

## 参考

- [[开源项目分析/阅读/Hermes-Kanban多Profile持久化工作流与SubAgent对比|Hermes Kanban vs SubAgent]] — 同样讨论"人 + agent 协作"的边界，Kanban 6 profile 派发 vs 裸 SubAgent 5 维对比
- [[开源项目分析/AI编码工程化/Superpowers-AI编码工程师方法论与Skills框架|Superpowers]] — 同样强调 TDD/code review/verification 强约束，但走"AI 工程师方法论"工程化路线，可对照
- [[开源项目分析/AI编码工程化/Ralph-Autonomous-AI-Coding-Loop|Ralph]] — session-less 派，每轮 fresh context；与本文"人盯人管"立场形成镜像
- [[开源项目分析/阅读/Medal-W-Key-前端基础设施现代化复盘|Medal W-Key 复盘]] — 同样主张"先基础设施后组件"的工程纪律，与本文"技术债指数增长"论断同源
- [[方法论/我的大前端世界观|大前端世界观]] — 视野类长文，对照"谨慎用 AI"立场的另一份参考
