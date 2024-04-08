---
title: timer
description: timer
---

node.js `setInterval、setTimeout、setImmediate` 返回的时 Timer 类的子类，而非原先的句柄了

当 delay 大于 2147483647 (2^31-1)或小于 1 时， delay 将设置为 1。 非整数的延迟会被截断为整数

