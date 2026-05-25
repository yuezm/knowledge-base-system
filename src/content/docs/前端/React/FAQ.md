---
title: FAQ
description: FAQ
---

## React 库设计原则

React 库设计时，一般分为 2 层。Core 是库运转的核心、Binding 是如何将库和 React 结合

1. 外部 Binding: 在 React 生命周期外初始化，避免收到 React 生命周期的影响，然后通过观察者模式、useSyncExternalStore 来插入
2. 内部 Binding: 使用 Conetext + Provider + 自定义 Hooks 来 插入
