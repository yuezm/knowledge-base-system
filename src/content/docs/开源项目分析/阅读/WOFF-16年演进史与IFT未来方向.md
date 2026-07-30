---
title: WOFF 16 年演进史与 IFT 未来方向
description: W3C 官方纪念 WOFF 1.0 公开草案 16 周年：Web 字体格式从 @font-face 到 WOFF 1.0/2.0 的标准史，DRM 争议、艾美奖、IFT 增量传输的下一步
sidebar:
  hidden: true
status: active
---

# WOFF 16 年演进史与 IFT 未来方向

> 原文：https://mp.weixin.qq.com/s/1rWevyHMcHiwlyuQIAA5wQ
> 原文来源：W3C Blog（2026 年 7 月，纪念 WOFF 1.0 公开草案发布 16 周年）
> 类型：标准史 / 行业回顾 ｜非项目仓库

## 1. 核心技术栈/场景

- 解决的痛点：Web 字体（Web Fonts）"技术早就有（CSS2 @font-face，1998）但十几年没普及"的死结——根因是字体授权/DRM/根字符串等争议让浏览器厂商不敢内建实现。WOFF 1.0（2010）的关键突破是**彻底放弃 DRM**，用"足够好"的工程折衷解开了死结
- 涉及的技术/工具/模式：
  - **WOFF 1.0**（2010 首个工作草案 / 2012 正式推荐）：在 OpenType/TrueType 基础上用 Zlib 容器压缩，**无加密、无根字符串、无混淆**——明确放弃 DRM 是政治抉择
  - **WOFF 2.0**（2014 工作草案 / **2024-08 正式 W3C 推荐标准**）：MicroType Express 预处理 + Brotli 熵压缩（Raph Levien 2012 提案），**比 WOFF 1.0 体积再小 40%**
  - **IFT（Incremental Font Transfer）**：当前工作组研究重点，支持**部分/增量下载**而不破坏字距/连字等排版细节
  - **PFE（Progressive Font Enhancement，渐进式字体增强）**：2020 评估报告的核心理念
  - 关键人物：Vladimir Levantovsky（Monotype→W3C，工作组主席）、Raph Levien / Jyrki Alakuijala / Garret Rieger（Google）、Chris Lilley（W3C，1996 起就写字体理论）、Tal Leming & Erik van Blokland、John Hudson

## 2. 实践启示录

### 【马上能用】

- **WOFF 2 已成为事实标准，无需犹豫**：2025 年 HTTP Archive 数据显示 WOFF2 占桌面+移动字体请求的 **~65%**，2024-08 正式成为 W3C Recommendation。新项目直接用 WOFF2，不要再考虑 TTF/EOT
- **@font-face 调优三件套**（这是 Web 性能基础但常被忽视）：
  1. `font-display: swap`——避免 FOIT（不可见文字），先降级字体立刻渲染
  2. `unicode-range` 子集化——只下发页面实际需要的字符
  3. `preload` 关键字体——`<link rel="preload" as="font" type="font/woff2" crossorigin>` 必须带 `crossorigin` 否则重复请求
- **复杂脚本（CJK/印度系/阿拉伯文）应关注 IFT**：CJK 上万字符完整子集动辄几 MB，传统方案是按 unicode-range 切很多文件；IFT 增量下载能**首次只下小段、用时再请求剩余**，是 CJK Web 字体的实用破局点
- **跟踪 W3C 工作组方式**：[W3C Groups](https://www.w3.org/groups/) 公开所有 WG 状态，订阅 public-font 邮件列表能看到原始讨论——比二手解读早 1-2 年

### 【避坑指南】

- **别用 EOT / 早期 IE 私有格式**：IE 已退役，EOT 没压缩、还带 DRM 包袱。新项目全弃
- **WOFF1 vs WOFF2 服务端配置**：CDN/静态服务器 mime 要加 `font/woff` 和 `font/woff2`，缺一会被部分服务器按默认 octet-stream 处理导致 CORS 报错
- **子集化不能砍过头**：用 `unicode-range` 切字符时**保留常见标点 + ASCII + 数字**——很多页面的 fallback 系统字体对罕见字符的渲染细节（如引号方向）容易错
- **字体授权风险是真实存在的**：WOFF 放弃 DRM 是"标准化"层面的妥协，但**部署者仍需购买合法授权**（Google Fonts / 思源 / OFL 字体是免费且商业友好的）。下载付费字体后用 WOFF2 打包分发仍属侵权
- **WOFF2 压缩是离线预计算，不能在运行时开**：字体文件传到客户端时已经是 Brottli 压好的；运行时再开 gzip/brotli 不会有显著收益
- **艾美奖应用范围不只 Web**：WOFF 也被电视/广播流媒体标准采纳（如节目指南 UI），做 OTT/流媒体客户端的团队也能用上

## 3. 核心片段

WOFF 演进的"决策时刻"是 2009-2010 那一年的合并——三家方案最终统一：

```
2009-07  Jonathan Kew (Mozilla)        → ZOT 格式（Zlib 容器，无 DRM）
2009-07  Tal Leming + Erik van Blokland → .webfont（含许可信息链接，无加密）
2009-08  三家合并                       → WebOTF → 改名 WOFF
2010-03  W3C 成立字体工作组            → Vladimir Levantovsky 主持
2010-07  WOFF 1.0 首个公开工作草案
2012     → WOFF 1.0 正式 Recommendation，全球采用率从 0 → 80%（到 2020）
2014-05  → WOFF 2.0 工作草案（Brotli + MTX）
2022-04  → 工作组领取艾美奖（标准化 + 电视应用）
2024-08  → WOFF 2.0 正式 Recommendation
2026+    → IFT（增量字体传输）成为下一个研究焦点
```

**反直觉观点**：
1. **"放弃 DRM 才能成功"**——一个开放标准的成功靠的是**不做什么**（不做加密、不做根字符串），而不是技术多炫酷。这与 Web Platform 整体设计哲学一致
2. **字体文件居然能拿艾美奖**——因为 WOFF 已被电视/广播标准采纳，工程贡献被广电行业认可；提醒我们"Web 技术"边界远比想象广
3. **CJK 终于有解**——IFT 对拉丁字母是"锦上添花"，但对 CJK/印度系文字是"从不可用到可用"的质变；这是少数"为小众语言设计"反而**先惠及小众语言**的标准例子

## 4. 横向对比 — 同类方案/观点对比

### 4.1 定位分析

- 本文是一份**标准制定史 + 工程决策复盘**的官方纪念文章。定位是"行业级权威叙事"——W3C 官方博客，自指 WO 十多年推动
- 它不是工具评测、不教你怎么用 @font-face、也不比较 CDN/字体服务；它解决"为什么 WOFF 存在并长成什么样"这个 why 层面
- 覆盖人群：Web 性能工程师、字体设计师/排版师、标准制定感兴趣者、做 CJK/多语言本地化的工程师、做流媒体 OTT 的客户端工程师

### 4.2 同类对比表

字体格式/标准的横向对比（数字为 2025 HTTP Archive 字体年鉴数据）：

| 维度       | WOFF 1.0              | **WOFF 2.0**         | 原始 TTF/OTF         | EOT（IE 私有）       | IFT（未来）           |
| ---------- | --------------------- | -------------------- | -------------------- | --------------------- | --------------------- |
| 发布       | 2010 / 2012 Rec       | 2014 / **2024-08 Rec** | 1980s 起              | 2007 (CSS 2.1)        | 研究中，未标准化      |
| 压缩       | Zlib                  | MTX + Brotli         | 无                   | 无                    | 流式增量              |
| 体积       | 基线                  | **比 WOFF1 小 ~40%** | 最大                  | 较大                  | 首次小、按需增         |
| 2025 占比  | 退居次要               | **~65%**             | 边缘                  | 0%（IE 已退役）       | N/A                    |
| 浏览器支持 | 全（遗留）            | 全（现代默认）       | 全（fallback）       | 仅 IE（已废）         | Chrome 实验           |
| DRM        | 无                    | 无                   | 无                   | **有（已无意义）**    | 无                     |
| CJK 实用性 | 子集化可用            | 子集化可用           | 太大不现实           | 太大不现实            | **首次实用**           |
| 适用       | 遗留系统兼容           | **新项目默认**       | 系统字体/fallback    | 仅历史                | CJK/超大字体/慢网     |

### 4.3 选择建议

- 📌 **新 Web 项目**：直接 WOFF 2.0 + 思源/Google Fonts 授权清晰的字体 + `font-display: swap`
- 📌 **CJK/多语言项目**：等浏览器普遍支持 IFT，或用 Google Fonts Noto + 子集化 + WOFF2 暂时顶
- 📌 **流媒体/OTT 客户端**：WOFF 已被电视标准采纳，可以放心在节目指南/EPG UI 用 WOFF
- 📌 **完全不需要**：EOT（IE 已死）、ZOT/.webfont（已并入 WOFF）、自研容器格式（永远不要）

### 4.4 领域趋势

- **主流方向**：WOFF2 一统天下 + IFT 解决 CJK/慢网 + 字体子集化自动化（pyftsubset、glyphhanger 工具链成熟）+ variable font（可变字体）减少文件数
- 本文方案**就是**主流——它是 W3C 官方对过去 16 年主导叙事的回顾；WOFF2 在 2024-08 正式 Recommendation 后地位固化
- **下一个拐点**：IFT 标准化 + 浏览器实现落地，预计 2-3 年内 CJK Web 字体体验会有量级提升

## 5. 关键数字一览

| 指标                          | 数值                            | 来源                  |
| ----------------------------- | ------------------------------- | --------------------- |
| WOFF 1.0 首版草案             | 2010-07-27                      | W3C WD                |
| WOFF 2.0 正式推荐             | **2024-08**                     | W3C Recommendation    |
| WOFF2 比 WOFF1 体积减小        | ~40%                            | W3C Blog              |
| 2025 WOFF2 请求占比            | ~65%（桌面+移动合计）            | 2025 HTTP Archive     |
| 2025 使用 Web 字体的网站占比    | ~88%（2024 年 ~87%）            | 2025 HTTP Archive     |
| Web 字体全球使用率 2011→2020  | 0 → 80%                          | 渐进式字体增强评估报告  |
| 艾美奖颁发时间                | 2022-04                         | W3C Blog              |
| IFT 当前状态                  | W3C 研究重点 / 演示已上线         | garretrieger.github.io/ift-demo |

## 参考

- [[开源项目分析/阅读/htmx-与AI协作的具体案例|htmx 与 AI 协作的具体案例]] — 同样为"非项目仓库的阅读材料"放 `开源项目分析/阅读/`，W3C 标准史 + htmx essay 同属"行业一手观察"
- [[前端/性能优化|JS 优化]]（如已收录）— WOFF2 + `font-display: swap` + `preload` 是 Web 字体性能三件套
- [[CS/Encoding/Unicode|Unicode]]（如已收录）— IFT/unicode-range 子集化都依赖 Unicode 码点体系
- W3C Web 字体工作组：https://www.w3.org/groups/wg/webfonts/
- IFT 演示：https://garretrieger.github.io/ift-demo/
- 2025 HTTP Archive 字体年鉴：https://almanac.httparchive.org/en/2025/fonts
