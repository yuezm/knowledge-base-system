---
title: cluster
description: cluster
---

cluster 可以在单线程（node.js 主线程为单线程）运行时，利用计算机的多核优势

## 快速使用

```javascript
const { isMaster, fork } = require("cluster");

if (isMaster) {
  const worker = fork();
  console.log('I am master');
} else {
  console.log('I am Worker');
}
```

isMaster、isWorker 是 cluster 的属性，用于标识 master 进程、worker 进程

需要注意的是，不能用原来的作用域的方式来全局存储一些信息了，需要其他的共享机制了

```javascript
const { isMaster, fork } = require("cluster");
const store = {};

if (isMaster) {
  const worker = fork();
  store.name = 'test';
} else {
  console.log(store.name); // undefined
}
```

## 常用 API

### setupMaster

```javascript
cluster.setupMaster([settings])
```

**使用 setupMaster 优化代码**

```javascript
const { isMaster, fork } = require("cluster");
const store = {};

if (isMaster) {
  const worker = fork();
  store.name = 'test';
} else {
  console.log(store.name); // undefined
}
```

以上代码 master 进程和 worker 进程代码拢在一起，可读性较差，我们可以使用 setupMaster 来优化下

```javascript
// master.js
const { fork, setupMaster } = require("cluster");

setupMaster({ exec: './worker.js' })
fork();
```

```javascript
// worker.js
const { worker } = require('cluster');
console.log(worker.id);
```

这样将 master 进程和 worker 进程代码拆分开，可读性较好

### fork() 和 fork 事件

```javascript
cluster.fork([env]);  // fork worker 进程
```

当 fork 成功后，会触发 cluster 的 fork 事件，可以如下监听

```javascript
cluster.on('fork', worker => { ... });
```

### disconnect() 和 disconnect 事件

```javascript
cluster.disconnect([callback]); // master进程可用，断开所有worker进程

worker.disconnect(); // worker进程或主进程皆可用，断开单个worker进程
```

当 disconnect 成功后，会触发 worker 和 cluster 的 disconnect 事件

```javascript
cluster.on('disconnect', () => { ... });

worker.on('disconnect', () => { ... });
```

### kill() 和 exit 事件

```javascript
worker.kill([signal='SIGTERM'])
```

kill 后，触发 cluster 和 worker 的 exit 事件

```javascript
cluster.on('exit', () => { ... });

worker.on('exit', () => { ... });
```

### send() 和 message 事件

```javascript
// master 向 worker 发送信息
worker.send(message[, sendHandle][, callback]);
// worker.process.send(message[, sendHandle[, options]][, callback]);

// master 接收 worker 传输的信息
worker.on('message',() => { ... });
```

```javascript
// worker 向 master 发送信息
worker.send(message[, sendHandle][, callback]);
// worker.process.send(message[, sendHandle[, options]][, callback]);

// worker 接收 master 传输的信息
worker.on('message',() => { ... });
```

## 深入理解

### cluster

cluster 无论是 master 进程 还是 worker 进程内，都是一个 EventEmitter 的实例

```typescript
// lib/internal/cluster/master.js
...
const cluster = new EventEmitter();

// lib/internal/cluster/child.js
...
const cluster = new EventEmitter();
```

但是他会根据是主进程还是子进程来返回不同的对象，这也得力于 require 是在运行时加载

```typescript
// lib/cluster.js
// 根据 NODE_UNIQUE_ID 来判断是 master还是worker，从而引入不同的模块
const childOrMaster = 'NODE_UNIQUE_ID' in process.env ? 'child' : 'master';
module.exports = require(`internal/cluster/${childOrMaster}`);
```

所以，你在代码中看似都为 `const cluster = required('cluster')`，其实引入是不同的

### fork

fork 是 cluster 的核心 API，fork 是由 child_process.fork 实现的，fork 主要分为一下几个步骤

- setupMaster：设置 fork 参数
- createWorkerProcess：创建子进程
- Worker 实例添加一些事件：譬如上述的 disconnect 事件
- 加入 workers 数组：此时我们可以通过 cluster.workers 来获取所有的 worker 进程

#### setupMaster

设置 fork 参数，其实就是设置 child_process.fork 参数，该参数赋值于 cluster.setting，可以通过 setup 事件或者 cluster.setting 读取

```javascript
cluster.setupMaster = function (options) {
  // 通过 options 来覆盖默认 settings
  const settings = {
    args: process.argv.slice(2),
    exec: process.argv[1],
    execArgv: process.execArgv,
    silent: false,
    ...cluster.settings,
    ...options
  };
  ....

  cluster.settings = settings; // 将settings赋值存储

  ...

  // 以下两句保证
  if (initialized === true) return process.nextTick(setupSettingsNT, settings);
  initialized = true;

  ...

  schedulingPolicy = cluster.schedulingPolicy;  // 设置调度策略，通过 initialized 控制只能设置一次，具体调度策略下面再说

  ....

  process.nextTick(setupSettingsNT, settings);

  ...
};
```

setupMaster 可以多次调用，每次调用都可能修改 cluster.setting，但只对后续的 fork 生效，对前面已 fork 的 worker 进程无影响

#### createWorkerProcess

createWorkerProcess 为 fork 的核心代码，在此步骤创建子进程

```javascript
function createWorkerProcess(id, env) {
  // NODE_UNIQUE_ID 在此处赋值，可根据此环境变量来判断是否为worker进程
  const workerEnv = {...process.env, ...env, NODE_UNIQUE_ID: `${id}`}; //  设置 child_process.fork 环境变量
  const execArgv = cluster.settings.execArgv.slice(); // 设置 child_process.fork execArgv

  // ... 其他参数设置 ...


  // createWorkerProcess 或者说 cluster.fork 核心代码，通过 child_process.fork 创建子进程，各个参数意义可以查阅child_process.fork
  return fork(cluster.settings.exec, cluster.settings.args, {
    cwd: cluster.settings.cwd,
    env: workerEnv,
    silent: cluster.settings.silent,
    windowsHide: cluster.settings.windowsHide,
    execArgv: execArgv,
    stdio: cluster.settings.stdio,
    gid: cluster.settings.gid, // 保持父子进程为一个组
    uid: cluster.settings.uid // 设置子进程用户id
  });
}
```

#### worker 添加事件

```javascript
worker.on('message', ...);

worker.process.once('exit', ...);

worker.process.once('disconnect', ...);

worker.process.on('internalMessage', ...);

process.nextTick(emitForkNT, worker); // 触发上面说过的 fork 事件
```

fork 完整版如下所示

```javascript
cluster.fork = function (env) {
  cluster.setupMaster(); // 设置fork参数
  const id = ++ids; // 以自增ID设置唯一ID，也就是 createWorkerProcess 的 NODE_UNIQUE_ID
  const workerProcess = createWorkerProcess(id, env); // 创建子进程


  // 实例化 Worker
  const worker = new Worker({
    id: id,
    process: workerProcess
  });

  // ...... 事件的代码太多，省略了

  process.nextTick(emitForkNT, worker); // 触发 fork 事件
  cluster.workers[worker.id] = worker; // 存储worker于workers
  return worker;
};
```

### Worker

从 fork 中发现，fork 返回的 worker 并非是子进程实例（workerProcess 才是子进程），那么 worker 是啥

先看下 Worker 对象

```javascript
// lib/internal/cluster/worker.js
function Worker(options) {
  if (!(this instanceof Worker)) return new Worker(options);
  EventEmitter.call(this);
  ...
  if (options.process) {
    this.process = options.process; // 包裹子进程
    ...
    this.process.on('message', (message, handle) =>
      this.emit('message', message, handle)
    );
  }
}

// Worker 继承可 EventEmitter 对象
Object.setPrototypeOf(Worker.prototype, EventEmitter.prototype);
Object.setPrototypeOf(Worker, EventEmitter);


// 调用 worker.send 就是调用 process.send
Worker.prototype.send = function () {
  return this.process.send.apply(this.process, arguments);
};
```

Worker 继承了 EventEmitter，对进程对象进行包裹，新增事件、属性
、方法。例如 send 方法和 message 事件，这也解释了 worker 是如何实现 IPC 的，完全是借助了 process 对象

#### cluster.worker 和 cluster.workers

```typescript
// 父进程中
cluster.workers // 获取全部的 worker，在 fork 时预先进行了存储

// 子进程中
cluster.worker // 获取当前的 worker对象
```

cluster.worker 是如何获取到当前 worker 进程的 worker 对象的？

```javascript
// lib/internal/cluster/child.js
cluster._setupWorker = function() {
  const worker = new Worker({
    id: +process.env.NODE_UNIQUE_ID | 0, // NODE_UNIQUE_ID 环境变量赋值
    process: process,
    state: 'online'
  });

  cluster.worker = worker; // 此处赋值后，即可通过 cluster.worker 获取 Worker 实例，但是此处是新的Woker实例
};
```

### 分发策略

官方给出：

cluster 模块支持两种分发连接的方法

第一种方法（也是除 Windows 外所有平台的默认方法）是循环法，由主进程负责监听端口，接收新连接后再将连接循环分发给工作进程，在分发中使用了一些内置技巧防止工作进程任务过载。

第二种方法是，主进程创建监听 socket 后发送给感兴趣的工作进程，由工作进程负责直接接收连接。

理论上第二种方法应该是效率最佳的。 但在实际情况下，由于操作系统调度机制的难以捉摸，会使分发变得不稳定。 可能会出现八个进程中有两个分担了 70% 的负载

可以通过`环境变量 NODE_CLUSTER_SCHED_POLICY、cluster.schedulingPolicy直接赋值` 来修改

```javascript
cluster.schedulingPolicy = 1 // 1 none, 2 rr(round-robin)

export NODE_CLUSTER_SCHED_POLICY = none // none、rr
```
