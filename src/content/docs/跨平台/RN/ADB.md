---
title: ADB
description: ADB
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

全名 Android Debug Bridge，是 Android SDK 提供的一个命令行工具，用于与 Android 设备进行通信，例如安装应用、调试应用、查看设备信息等

## 常用命令

1. 查看设备列表：`adb devices`
2. 连接设备：`adb connect 127.0.0.1:7555`
3. 断连设备：`adb disconnect 127.0.0.1:7555`
4. 查看日志：`adb logcat`
