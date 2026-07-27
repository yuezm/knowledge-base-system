---
title: process
description: process
status: stub
---


## exit 事件和 beforeExit

beforeExit：在事件循环被清空，没有额外的工作任务下被调用。但是正常情况下，如果没有工作任务调度了，则会退出，但是可以在此事件回调继续进行异步调用以保证 node.js 进程继续运行，**process.exit() 无法触发该事件**

exit：在结束时被调用，此时进程无法再保持继续运行了


## exit() 和 abort()

exit：进程会尽快退出，并触发 exit 事件
abor：进程立刻退出，并生成一个核心文件，且不触发 exit 事件


