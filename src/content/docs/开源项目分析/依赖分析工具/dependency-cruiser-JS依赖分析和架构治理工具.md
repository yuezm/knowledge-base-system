---
title: dependency-cruiser — JS/TS 依赖分析与架构治理工具
description: 可编程规则引擎，验证 JS/TS/ CoffeeScript 项目中依赖关系是否合规，支持 CI 集成和多格式可视化输出
---

# dependency-cruiser — JS/TS 依赖分析与架构治理工具

> GitHub: [sverweij/dependency-cruiser](https://github.com/sverweij/dependency-cruiser)
> Stars: ⭐ 6,934 | License: MIT | 活跃维护 9 年

## 核心能力

- **依赖验证**：通过 `from.path` → `to.path` 规则引擎，定义架构约束（如"utils 不可引用 components"）
- **规则可编程**：支持正则、否定（`pathNot`）、通配，覆盖几乎所有架构约束场景
- **多格式输出**：`dot`（GraphViz 渲染）、`mermaid`、`json`、`csv`、`html`（自包含交互图）、`err`（eslint 风格文本）
- **CI 就绪**：CLI 命令行，在 CI pipeline 中作为检查步骤阻断违规

## 快速上手

```bash
npm install --save-dev dependency-cruiser
npx depcruise --init          # 交互式生成配置
npx depcruise src             # 验证依赖，输出 eslint 风格违规报告
npx depcruise src --output-type dot | dot -T svg > graph.svg  # 生成图
```

## 规则示例

禁止测试目录引用业务代码以外的模块：

```json
{
  "forbidden": [{
    "name": "not-to-test",
    "severity": "error",
    "from": { "pathNot": "^test" },
    "to": { "path": "^test" }
  }]
}
```

## 对比与选型

| 工具 | 定位 | dependency-cruiser 的差异化优势 |
|------|------|-------------------------------|
| Madge | 快速检测循环依赖 | 规则引擎 + 可视化输出 + 支持 TypeScript/Vue/Svelte 等更多格式 |
| ESLint import plugin | import 路径规范 | 不依赖 ESLint 体系，更灵活的 `from`/`to` 跨文件约束 |
| Knip | 死文件/死导出检测 | 专注方向不同，dc 做架构约束而非死代码清理 |

## 适用场景

- 中型~大型 JS/TS 项目需要在 CI 中强制执行架构规范
- 团队希望可视化项目模块依赖关系用于架构评审
- Monorepo 中约束跨 package 引用边界
- 老项目重构前需摸清依赖关系网

## 技术要点

- 基于 acorn（JS）和 TypeScript compiler API 做 AST 解析
- 支持 Webpack alias 和 TypeScript path mapping
- 支持 JSX/TSX/Vue/Svelte 等非标准语法
- `depcruise --init` 交互式问询降低配置门槛
