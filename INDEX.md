---
title: 知识库索引
description: 全站内容目录，按分类列出所有页面
sidebar:
  hidden: true
---

# 知识库索引

> 内容目录。共 **281** 个页面（含 Home.md），按分类列出。最后更新：2026-07-30
>
> **status 字段**(2026-07-27 D 方案引入): 每篇笔记 frontmatter 标记 `evergreen`(知识稳定 33 篇) / `active`(仍在演进 167 篇) / `stub`(待补全 81 篇) / `archived`(归档 1 篇)。可通过 `grep -rl "^status: stub" src/content/docs` 找出待补全笔记列表。

## 知识库总入口

- [[00-MOC/Home|知识库总入口]] — 所有主题地图的入口(MOC of MOCs)

## 主题地图

- [[00-MOC/AI-技术树|AI 技术树]] — AI 知识地图
- [[00-MOC/前端-技术树|前端技术树]] — 前端工程地图
- [[00-MOC/Graphics-技术树|Graphics 技术树]] — 图形学地图
- [[00-MOC/GIS-技术树|GIS 技术树]] — 地理信息地图
- [[00-MOC/工作流与项目|工作流与项目]] — 项目/工具/归档入口

## AI - 人工智能

### 原理（AI 底层原理，不依赖 LLM）

- [[AI/原理/概览|概览]] — AI 定义 / 符号主义 vs 连接主义 / 感知与决策（283 行原创）
- [[AI/原理/知识地图|知识地图]] — 监督 / 无监督 / 强化 / 训练范式 待学清单
- [[AI/原理/Transformer|Transformer]]
- [[AI/原理/训练|AI 训练全解：从预训练到后训练]]
- [[AI/原理/机器学习|机器学习]]
- [[AI/原理/模型|模型]]

### LLM-应用（LLM 工程化技术）

- [[AI/LLM-应用/概览|概览]] — RAG / Prompt / Function Calling / Embedding / Memory

### Agent（Agent 系统）

- [[AI/Agent/概览|概览]] — MCP / Tool Use / 工作流 / 记忆
- [[AI/Agent/Agent发展|AI 系统演进]]
- [[AI/Agent/语音输入对比|语音输入对比]] — 14 款 Agent 工具语音实现横向对比（端到端 vs STT）

### AIGC（多模态生成）

- [[AI/AIGC/概览|概览]] — 图像 / 视频 / 音频 / 3D

### 向量检索（算法视角）

- [[AI/向量检索/概览|概览]] — HNSW / IVF / 量化 / 混合检索

## Architecture - 架构设计

- [[Architecture/Build/SourceMap|SourceMap]]
- [[Architecture/MicroFE/微前端|微前端]]
- [[Architecture/Monorepo/Lerna|Lerna]]
- [[Architecture/SPA VS MPA|SPA VS MPA]]
- [[Architecture/Separation/前后端分离|前后端分离]]
- [[Architecture/权限设计|权限设计]]
- [[Architecture/架构|架构]]
- [[Architecture/测试/概览|测试]]

## Books - 读书笔记

- [[Books/Books of Shader|Books of Shader]]
- [[Books/编程珠玑|编程珠玑]]

## Browser - 浏览器

- [[Browser/Performance|Devtools之Performance]]
- [[Browser/浏览器多进程模型|浏览器多进程模型]]
- [[Browser/浏览器指纹|浏览器指纹]]

## Cloud - 云计算

- [[Cloud/概览|概览]] — AWS/GCP/Azure/阿里云、Serverless、CDN（占位）

## CS - 计算机基础

- [[CS/Algorithm/二分法|二分法]]
- [[CS/Algorithm/单调栈|单调栈]]
- [[CS/Algorithm/博弈算法|博弈算法]]
- [[CS/Algorithm/多米诺和托米诺平铺|多米诺和托米诺平铺]]
- [[CS/Algorithm/子序列问题|子序列问题]]
- [[CS/Algorithm/寻找中位数|寻找中位数]]
- [[CS/Algorithm/树状数组|树状数组]]
- [[CS/Algorithm/格雷码|格雷码]]
- [[CS/Algorithm/贡献度算法|贡献度算法]]
- [[CS/Algorithm/进制转换|进制转换]]
- [[CS/Algorithm/随机算法|随机算法]]
- [[CS/Algorithm/压缩算法|压缩算法]]
- [[CS/Algorithm/快速幂|树形常用算法]]
- [[CS/Algorithm/树形常用算法|树形常用算法]]
- [[CS/Algorithm/线形常用算法|线形常用算法]]
- [[CS/Algorithm/DP/经典扔鸡蛋|经典扔鸡蛋]]
- [[CS/Algorithm/DP/股票算法|股票算法]]
- [[CS/DataStructure/Linear/位图|位图]]
- [[CS/DataStructure/Linear/线形|线形]]
- [[CS/DataStructure/Map/图形|图形]]
- [[CS/DataStructure/Tree/单词查找树|单词查找树]]
- [[CS/DataStructure/Tree/堆|堆]]
- [[CS/DataStructure/Tree/并查集|并查集]]
- [[CS/DataStructure/Tree/构建树|构建树]]
- [[CS/DataStructure/Tree/树形|树形]]
- [[CS/数学|数学]]
- [[CS/Docker/Docker|Docker]]
- [[CS/Encoding/Base64|Base64]]
- [[CS/Encoding/BOM|BOM]]
- [[CS/Encoding/Unicode|Unicode]]
- [[CS/NetWork/Application/GRPC/GRPC|GRPC]]
- [[CS/NetWork/Application/HTTP/HTTP|HTTP]]
- [[CS/NetWork/Application/HTTP/HTTP状态码|HTTP状态码]]
- [[CS/NetWork/Application/HTTP/RESTful API|RESTFUL]] — RESTFUL API
- [[CS/NetWork/Application/HTTP/URI、URL、URN、Data URI、Object URL|URI、URL、URN、Data URI、Object URL]]
- [[CS/NetWork/Application/实时通信/前后端实时通信|前后端实时通信]]
- [[CS/NetWork/Network|HTTP]]
- [[CS/OS/Linux|Linux]]
- [[CS/OS/OS|OS]]
- [[CS/OS/时区|时区]]
- [[CS/OS/Ubuntu/包管理|包管理]] — 包管理.md

## DB - 数据库

- [[DB/MongoDB/API|API]]
- [[DB/MongoDB/MongoDB|MongoDB]]
- [[DB/MongoDB/权限|权限]]
- [[DB/MongoDB/索引|索引]]
- [[DB/SQL/概览|SQL 概览]] — 关系型数据库、查询优化、事务（占位）
- [[DB/Redis/概览|Redis 概览]] — 内存数据库、缓存模式（占位）
- [[DB/向量库/概览|向量库概览]] — Milvus / Qdrant / Weaviate / pgvector（DB 视角）

## DevOps - 运维与基础设施

- [[DevOps/概览|概览]] — CI/CD、容器编排、监控、IaC（占位）

## GIS - 地理信息系统

- [[GIS/Cesium/Camera|Camera]]
- [[GIS/Cesium/Entity|Entity]]
- [[GIS/Cesium/Events|Events]]
- [[GIS/Cesium/Imagery|Imagery]]
- [[GIS/Cesium/Material|Material]]
- [[GIS/Cesium/Model|Model]]
- [[GIS/Cesium/Particle|Particle]]
- [[GIS/Cesium/Plugins|Plugins]]
- [[GIS/Cesium/Post Processing|Post Processing]]
- [[GIS/Cesium/Property|Property]]
- [[GIS/Cesium/Terrain|Terrain]]
- [[GIS/Cesium/Viewer|Viewer]]
- [[GIS/Cesium/Widget|Widget]]
- [[GIS/Cesium/坐标和投影|坐标和投影]]
- [[GIS/FAQ|FAQ]]
- [[GIS/Leaflet/Layer|Layer]]
- [[GIS/Leaflet/投影|投影]]
- [[GIS/Leaflet/源码学习|源码学习]]
- [[GIS/坐标系|坐标系]]
- [[GIS/数据模型/3D Tiles|3D 瓦片]]
- [[GIS/数据模型/Tiles|瓦片]]
- [[GIS/数据模型/概览|GIS 数据]]
- [[GIS/概览|概览]]

## Graphics - 图形学

- [[Graphics/Babylon/Algebra|Algebra]]
- [[Graphics/Babylon/Animation|Animation]]
- [[Graphics/Babylon/AssetsManager|AssetsManager]]
- [[Graphics/Babylon/Audio|Audio]]
- [[Graphics/Babylon/Camera|Camera]]
- [[Graphics/Babylon/Engine|Engine]]
- [[Graphics/Babylon/Light|Light]]
- [[Graphics/Babylon/Material|Material]]
- [[Graphics/Babylon/Mesh|Mesh]]
- [[Graphics/Babylon/Particle|Particle]]
- [[Graphics/Babylon/Scene|Scene]]
- [[Graphics/Babylon/SceneLoader|SceneLoader]]
- [[Graphics/Babylon/Shadow|Shadow]]
- [[Graphics/Babylon/Sprite|Sprite]]
- [[Graphics/Babylon/Vec|Vector]]
- [[Graphics/CANON/API|API]]
- [[Graphics/Three/Addons|Addons]]
- [[Graphics/Three/Animation|动画]]
- [[Graphics/Three/Camera|Camera]]
- [[Graphics/Three/Controls|Controls]]
- [[Graphics/Three/Extras|Extras]]
- [[Graphics/Three/GUI|GUI]]
- [[Graphics/Three/Geometory|Geometry]]
- [[Graphics/Three/Helper|Helper]]
- [[Graphics/Three/Light|Light]]
- [[Graphics/Three/Loader|Loader]]
- [[Graphics/Three/Material|Material]]
- [[Graphics/Three/Mesh|Mesh]]
- [[Graphics/Three/Model|模型]]
- [[Graphics/Three/Other|其他]]
- [[Graphics/Three/QA|QA]]
- [[Graphics/Three/Renderer|Renderer]]
- [[Graphics/Three/Scene|Scene]]
- [[Graphics/Three/Texture|纹理]]
- [[Graphics/Three/Three|Three]]
- [[Graphics/Three/Transform|变换]]
- [[Graphics/WebGL/API|API]]
- [[Graphics/WebGL/GLSL|GLSL]]
- [[Graphics/WebGL/概览|概览]]
- [[Graphics/WebGPU/WGSL|WGSL]]
- [[Graphics/WebGPU/概览|WebGPU]]
- [[Graphics/WebGPU/渲染管线|渲染管线]]
- [[Graphics/WebGPU/计算管线|计算管线]]
- [[Graphics/图形学|图形学]]

## JSRuntime - JS 运行时

- [[JSRuntime/Deno/JSR|JSR]]
- [[JSRuntime/Javascript运行时|Javascript运行时]]
- [[JSRuntime/Node.js/API/Error|Error]]
- [[JSRuntime/Node.js/API/Module|Module]]
- [[JSRuntime/Node.js/API/buffer|buffer]]
- [[JSRuntime/Node.js/API/child_process|child_process]]
- [[JSRuntime/Node.js/API/cluster|cluster]]
- [[JSRuntime/Node.js/API/console|console]]
- [[JSRuntime/Node.js/API/process|process]]
- [[JSRuntime/Node.js/API/string_decoder|string_decoder]]
- [[JSRuntime/Node.js/API/timer|timer]]
- [[JSRuntime/Node.js/CommonJS|CommonJS]]
- [[JSRuntime/Node.js/Deploy/node使用docker部署|node使用docker部署]]
- [[JSRuntime/Node.js/Framework/Egg|Egg]]
- [[JSRuntime/Node.js/Framework/从egg-helper学习egg源码|从egg-helper学习egg源码]]
- [[JSRuntime/Node.js/node.js内存泄漏|node.js内存泄漏]]
- [[JSRuntime/Node.js/Node.js 特性|Node.js 特性]]
- [[JSRuntime/Node.js/Packages/NPM|NPM]]
- [[JSRuntime/Node.js/Packages/PNPM|PNPM]]
- [[JSRuntime/Node.js/Packages/Yarn|Yarn]]
- [[JSRuntime/Node.js/Packages/npm和yarn的区别|npm和yarn的区别]]
- [[JSRuntime/Node.js/Packages/package.json|package.json]]

## Performance - 性能优化

- [[Performance/Chrome调试|Chrome调试]]
- [[Performance/Javascript优化|Javascript优化]]
- [[Performance/JS如何获取精确的时间戳|JS如何获取精确的时间戳]]
- [[Performance/Web截图|Web截图]]
- [[Performance/内存泄漏及排查|内存泄漏及排查]]
- [[Performance/preload, prefetch, prerender|preload, prefetch, prerender]]

## Security - 安全

- [[Security/2FA验证原理|2FA验证原理]]

## 方法论 - 思考与职业

- [[方法论/开源如何保证收入|开源如何保证收入]]
- [[方法论/面试复习|面试复习]]
- [[方法论/软件开发周期|软件开发周期]]
- [[方法论/我的大前端世界观|我的大前端世界观]]

## 开发工具链 - 工具链与使用笔记

- [[开发工具链/Git/Git hooks husky lint-staged|Git hooks husky lint-staged]]
- [[开发工具链/Git/Git原理|Git 原理]]
- [[开发工具链/Git/Git命令|Git]]
- [[开发工具链/Git/Git工作流|Git工作流]]
- [[开发工具链/Playwright/Playwright|Playwright]]
- [[开发工具链/Puppetter/Puppetter优化|Puppetter优化]]

## 开源项目分析 - 开源项目评估与选型

- [[开源项目分析/自托管书签/Karakeep-自托管书签全能工具|Karakeep — 自托管书签全能工具]]
- [[开源项目分析/AI浏览器自动化/Stagehand-AI浏览器自动化框架|Stagehand — AI 浏览器自动化框架]]
- [[开源项目分析/AI记忆基础设施/Honcho-Agent记忆基础设施|Honcho — Agent 记忆基础设施]]
- [[开源项目分析/提示词工程/Claude-Design-System-Prompt-工程的设计协作提示词库|Claude Design System Prompt]] — 逆向工程设计协作提示词库，1700+ Stars，14 个设计技能
- [[开源项目分析/阅读/Harness工程-Multi-Agent架构实践|Harness Engineering]] — 数据研发 Multi-Agent Harness 工程实践，阿里技术团队
- [[开源项目分析/阅读/1688-Multi-Agent超级组织实践|1688 Multi-Agent 超级组织实践]] — 1688 数据中心 Multi-Agent 研发小队实录，KST 三层知识工程 + Harness/Loop Engineering + Squad 协作模式
- [[开源项目分析/阅读/Hermes-Kanban多Profile持久化工作流与SubAgent对比|Hermes Kanban vs SubAgent]] — Hermes Kanban 多 Profile 持久化工作流与 CC/OpenCode SubAgent 5 维对比
- [[开源项目分析/阅读/Medal-W-Key-前端基础设施现代化复盘|Medal W-Key 前端基础设施现代化]] — Medal.tv Electron+Web 前端 Macro→Micro 现代化路径，barrel file 与 tree-shaking 实战权衡
- [[开源项目分析/阅读/htmx-与AI协作的具体案例|htmx 与 AI 协作的具体案例]] — htmx 作者 Carson Gross 用 Claude 修 hyperscript parser bug 全过程，AI 调查/测试强、方案设计弱，技术债指数增长论
- [[开源项目分析/AI代码审查/Open-Code-Review-阿里AI代码审查工具|Open Code Review]] — 阿里 AI 代码审查 CLI 工具，确定性工程×Agent 混合驱动，10.5K Stars
- [[开源项目分析/依赖分析工具/dependency-cruiser-JS依赖分析和架构治理工具|dependency-cruiser]] — JS/TS 依赖分析与架构治理工具，可编程规则引擎，6,934 Stars
- [[开源项目分析/AI代码智能/CodeGraph-vs-GitNexus-vs-CodeReviewGraph-代码智能工具横向对比|CodeGraph vs GitNexus vs CRG]] — AI 代码智能工具三大明星横向对比，60K/44K/19K Stars
- [[开源项目分析/AI编码工程化/Trellis-AI编码工程框架|Trellis — AI 编码工程框架]] — 跨平台 AI Coding Agent Harness，4 阶段循环 + spec 学习闭环 + 17 平台适配器，12.8K Stars
- [[开源项目分析/AI编码工程化/spec-kit-GitHub官方规范驱动开发|spec-kit — GitHub 官方规范驱动开发]] — GitHub 官方 Spec-Driven Development 工具集，122K Stars，MIT，含与 Trellis 详细对比
- [[开源项目分析/AI编码工程化/Superpowers-AI编码工程师方法论与Skills框架|Superpowers — AI 编码工程师方法论与 Skills 框架]] — obra/superpowers 13+ composable skills 自动触发，TDD/code review/verification 强约束，257K Stars，MIT
- [[开源项目分析/AI编码工程化/Ralph-Autonomous-AI-Coding-Loop|Ralph — Autonomous AI Coding Loop]] — snarktank/ralph 自主 AI 编码循环，PRD 拆小 story + 每轮 fresh context，21.2K Stars，MIT
- [[开源项目分析/阅读/OpenHands-MetaGPT-Hermes-Kanban对比|OpenHands / MetaGPT / Hermes Agent 的 Kanban 对比]] — 三家 AI Agent 框架任务管理横向对比，OpenHands 伪 kanban（TaskTrackerTool 三态清单）/ MetaGPT 无 kanban（SOP + 消息总线）/ Hermes 真 kanban（SQLite 9 态状态机）
- [[开源项目分析/阅读/WOFF-16年演进史与IFT未来方向|WOFF 16 年演进史与 IFT 未来方向]] — W3C 官方纪念 WOFF 1.0 公开草案 16 周年：Web 字体格式标准史（WOFF 1.0→2.0）、DRM 放弃、艾美奖、IFT 增量传输未来方向

## 前端

- [[前端/CSS/CSS|CSS]]
- [[前端/CSS/Color|Color]]
- [[前端/CSS/Grid|Grid]]
- [[前端/CSS/Selector|Selector]]
- [[前端/CSS/常用的图片格式|常用的图片格式]]
- [[前端/HTML/HTML|HTML]]
- [[前端/HTML/meta|meta]]
- [[前端/Javascript/ArrayBuffer|ArrayBuffer]]
- [[前端/Javascript/Audio|Audio]]
- [[前端/Javascript/CJS, ESM, Webpack|CJS, ESM, Webpack]]
- [[前端/Javascript/Canvas|Canvas]]
- [[前端/Javascript/Document|Document]]
- [[前端/Javascript/Event|Event]]
- [[前端/Javascript/File System API|File System API]]
- [[前端/Javascript/Function|Function]]
- [[前端/Javascript/Import maps|Import maps]]
- [[前端/Javascript/JSON和Javascript|JSON和Javascript]]
- [[前端/Javascript/Javascript正则|Javascript正则]]
- [[前端/Javascript/Number/Bigint|Bigint]]
- [[前端/Javascript/Number/Javascript浮点数|Javascript浮点数]]
- [[前端/Javascript/Number/Number|Number]]
- [[前端/Javascript/Object/Array|Array]]
- [[前端/Javascript/Object/Javascript|Javascript]]
- [[前端/Javascript/Object/Javascript面向对象|Javascript面向对象]]
- [[前端/Javascript/Object/Javscript 属性和方法|Javscript 属性和方法]]
- [[前端/Javascript/Object/RegExp|RegExp]]
- [[前端/Javascript/Object/This|This]]
- [[前端/Javascript/Promise|Promise]]
- [[前端/Javascript/Reflect|Reflect]]
- [[前端/Javascript/Scheduler|Scheduler]]
- [[前端/Javascript/大文件上传|大文件上传]]
- [[前端/Javascript/如何处理循环引用|如何处理循环引用]]
- [[前端/Javascript/常见的问题及解决方案|常见的问题及解决方案]]
- [[前端/Javascript/作用域|作用域]]
- [[前端/Javascript/执行上下文|执行上下文]]
- [[前端/Javascript/解决ESM Import 过多|解决ESM Import 过多]]
- [[前端/React/API|API]]
- [[前端/React/FAQ|FAQ]]
- [[前端/React/Headless UI 和 React Hooks|Headless UI 和 React Hooks]] — Headless UI 和 React Hooks.md
- [[前端/React/Hooks|Hooks]]
- [[前端/React/React状态管理|React状态管理]]
- [[前端/React/React 事件|React 事件]]
- [[前端/React/React 的错误捕获|React 的错误捕获]]
- [[前端/React/Scheduler|Scheduler]]
- [[前端/React/Utils|Utils]]
- [[前端/React/为啥react没有keep-alive|为啥react没有keep-alive]]
- [[前端/Typescript/Typescript|Typescript]]
- [[前端/Typescript/tsconfig|tsconfig]]
- [[前端/Typescript/从d.ts了解typescript|从d.ts了解typescript]]
- [[前端/Typescript/类型|类型]]
- [[前端/Vue/Vue Router|Vue Router]]
- [[前端/Vue/响应式系统|响应式系统]]
- [[前端/Vue/组件|组件]]
- [[前端/动画/Lottie|Lottie 动画]]

## 跨平台开发

- [[跨平台/Electron/Electron 优化|Electron 优化]]
- [[跨平台/Electron/FAQ|FAQ]]
- [[跨平台/Electron/工具/工具|工具]]
- [[跨平台/Electron/工具/日志|日志]]
- [[跨平台/MiniProgram/概览|概览]]
- [[跨平台/RN/ADB|ADB]]
- [[跨平台/RN/三方库|三方库]]
- [[跨平台/RN/事件|事件]]
- [[跨平台/RN/优化|优化]]
- [[跨平台/RN/样式|样式]]
- [[跨平台/RN/模块|模块]]
- [[跨平台/RN/组件|组件]]
- [[跨平台/RN/踩坑|踩坑]]
- [[跨平台/RN/配置|配置]]
- [[跨平台/网页唤醒本地程序|网页唤醒本地程序]]

## 音视频

- [[音视频/流媒体/直播流|直播流]]
- [[音视频/视频/视频|视频]]

## 资源（PARA Resources）

- [[20-资源/AI-工具|AI 工具]] — AI 时代工具索引
- [[20-资源/前端工具|前端工具]] — 前端开发工具索引
- [[20-资源/命令行工具|命令行工具]] — 终端工具索引

## 归档（PARA Archive）

- [[30-归档/README|归档规则]] — 何时把笔记移到归档

## 根目录文件

- [[Home|知识库]] — 明的知识库
- [[index|Repository]] — Welcome to knowledge base.
