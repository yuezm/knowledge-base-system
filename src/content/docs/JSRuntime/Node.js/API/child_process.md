---
title: child_process
description: child_process
---

# child_process

源码路径 _lib/child_process.js_

将 options 相似处，抽离出来，避免充重复写

```typescript
options: -cwd - // 当前工作目录，默认为当前工作目录，也可进行指定，但如果指定不存在，则报错 ENOENT
  env - // 环境变量
  uid - // 用户表示
  gid - // 进程群组标识
  serialization - // 进程之间传递消息的类型，值可能为 json | advanced，默认为 json
  shell - // 如果为true，则在shell运行命令，也可以将shell设为字符串，即指定使用哪个shell运行
  windowsVerbatimArguments - // 在 Windows 上不为参数加上引号或转义，如果 shell 设为 CMD，则自动为true；unix自动忽略
  windowsHide; // windows 隐藏控制台窗口，默认 false
```

## spawn

```typescript
spawn(command[, args][, options]):ChildProcess;;
	- command // 命令，例如 node，ls
	- args // 命令的参数，例如node后的 main.js，ls 后的 -a
  - options // 同上options
		- argv0 // 显示的传给子进程的值，例如命令为 node main.js，node就为argv0
		- stdio // 标准输入、输出、错误流
		- detached // 使子进程独立于父进程，此属性可用于实现守护进程

spawn('node', ['main.js']);
spawn('ls', ['-a']);
```

```typescript
// lib/child_process.js
function spawn(file, args, options) {
  const opts = normalizeSpawnArguments(file, args, options); // 校验、序列化spawn参数
  const child = new ChildProcess(); // ChildProcess 定义于 lib/internal/child_process.js

  options = opts.options;
  debug("spawn", opts.args, options);

  child.spawn({
    // 调用spawn函数，并传入参数
    file: opts.file,
    args: opts.args,
    cwd: options.cwd,
    windowsHide: !!options.windowsHide,
    windowsVerbatimArguments: !!options.windowsVerbatimArguments,
    detached: !!options.detached,
    envPairs: opts.envPairs,
    stdio: options.stdio,
    uid: options.uid,
    gid: options.gid,
  });

  return child;
}
```

```typescript
// lib/internal/child_process.js
const { Process } = internalBinding('process_wrap');

function ChildProcess() {
  this._handle = new Process(); // Process 为 Builtin Module 属性，定义于 src/process_wrap.cc
}

ChildProcess.prototype.spawn = function(options) {
  ...
  const err = this._handle.spawn(options);
	...
  return err;
};
```

## execFile、exec

```typescript
execFile(file[, args][, options][, callback]):ChildProcess;
exec(command[, options][, callback]):ChildProcess;
	- command、file // 可执行命令，例如 node
	- args // 参数
	- options // 同上optiosn，并多了属性
		- encoding // 编码
		- timeout //
 		- maxBuffer // stdout、stderr允许在最大数据，如果超过限制，则子进程会被终止，并且输出会被截断，默认为 1024*1024B
		- killSignal // 默认 SIGTERM
	- callback //
		- err
		- stdout
		- stderr


execFile('node', ['main.js'], err=>{});
exec('node main.js', err=>{});
```

execFile 是 spawn 的一种衍生方法，本质还是调用的 spawn，exec 是直接调用了 execFile

```typescript
//
const MAX_BUFFER = 1024 * 1024;

function execFile(file) {
  ...
  options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: MAX_BUFFER, // maxBuffer 默认赋值
    killSignal: 'SIGTERM',
    cwd: null,
    env: null,
    shell: false, // execFile 默认不会衍生 shell，而是以可执行文件直接衍生为新的进程
    ...options
  };
  ...
  // execFile其实就是spwan的衍生
  const child = spawn(file, args, {
    cwd: options.cwd,
    env: options.env,
    gid: options.gid,
    uid: options.uid,
    shell: options.shell,
    windowsHide: !!options.windowsHide,
    windowsVerbatimArguments: !!options.windowsVerbatimArguments
  });
  ...
  return child;
}

function exec(command, options, callback) {
  const opts = normalizeExecArgs(command, options, callback);
  return module.exports.execFile(opts.file, opts.options, opts.callback);
}

function normalizeExecArgs(command, options, callback) {
  ...
  options.shell = typeof options.shell === 'string' ? options.shell : true; // exec对shell处理和execFile不同，即使你传入 shel: false，都会衍生 shell

  return {
    file: command,
    options: options,
    callback: callback
  };
}
```

###

execFile 和 exec 相差不多，只是 execFile 默认不会衍生 shell，指定执行的命令而衍生新的进程

## fork

```typescript
fork(modulePath[, args][, options]):ChildProcess;
	- modulePath // 子模块路径
	- args // 参数
	- options 同根options，并新增了属性
  	- stdio // 标准输入、输出、错误流
		- detached // 使子进程独立于父进程，此属性可用于实现守护进程
		- execPath // 用于创建子进程的可执行文件路径
		- execArgv // 传给可执行文件的参数
		- silent // 如果为 true，则子进程的 stdin、stdout 和 stderr 会被 pipe 到父进程，否则它们会继承自父进程
```

```typescript
// lib/child_process.js
function fork(modulePath) {
  ...
  var options = {};

  	// 参数长度条件判断
    options = {...arguments[pos++]};

	if (typeof options.stdio === 'string') {
    options.stdio = stdioStringToArray(options.stdio, 'ipc');
  } else if (!Array.isArray(options.stdio)) {
    // Use a separate fd=3 for the IPC channel. Inherit stdin, stdout,
    // and stderr from the parent if silent isn't set.
    options.stdio = stdioStringToArray(
      options.silent ? 'pipe' : 'inherit',
      'ipc');
  } else if (!options.stdio.includes('ipc')) {
    throw new ERR_CHILD_PROCESS_IPC_REQUIRED('options.stdio');
  }

  options.execPath = options.execPath || process.execPath;
  options.shell = false; // fork 不支持 shell

  return spawn(options.execPath, args, options);
}
```

## spawnSync

```typescript
spawnSync(command[, args][, options])
	- command //
	- args
	- options
		- input // 该值会作为 stdin 传给衍生的进程
		- argv0 // 显示的传给子进程的值，例如命令为 node main.js，node就为argv0
		- stdio
		- timeout
		- killSignal

返回值
	- pid <number> 子进程的 pid。
	- output <Array> stdio 输出的结果数组。
	- stdout <Buffer> | <string> output[1] 的内容。
	- stderr <Buffer> | <string> output[2] 的内容。
	- status <number> 子进程的退出码，如果子进程因信号而终止，则为 null。
	- signal <string> 用于杀死子进程的信号，如果子进程不是因信号而终止，则为 null。
	- error <Error> 如果子进程失败或超时的错误对象
```

```typescript
// lib/child_process.js
function spawnSync(file, args, options) {
  const opts = normalizeSpawnArguments(file, args, options); // 序列化参数
  ...
  return child_process.spawnSync(opts); // 执行spawnSync，定义于lib/internal/child_process.js
}
```

```typescript
// lib/internal/child_process.js
function spawnSync(opts) {
  const options = opts.options;
  const result = spawn_sync.spawn(options); // 运行spawn，定义于Builting Module，路径为 src/spawn_sync.cc
  ...
  return result;
}
```

## execFileSync、execSync

```typescript
execFileSync(file[, args][, options]):Buffer|string

child_process.execFileSync() 方法通常与 child_process.execFile() 相同，但该方法在子进程完全关闭之前不会返回。 当遇到超时并且已发送 killSignal 时，该方法也需等到进程完全退出后才返回。如果子进程拦截并处理了 SIGTERM 信号但未退出，则父进程仍将等待子进程退出
```

execFileSync、execSync 为 spawnSync 衍生

```typescript
// lib/child_process.js
function execFileSync(command, args, options) {
  ...
  const ret = spawnSync(opts.file, opts.args.slice(1), opts.options);
  ...
  return ret.stdout;
}

function execSync(command, options) {
  ...
  const ret = spawnSync(opts.file, opts.options);
  ...
  return ret.stdout;
}
```

## 其他

### 父子进程通信

stdio: 可以为字符串，也可以为数组

```typescript
stdio
	- 'pipe' - 相当于 ['pipe', 'pipe', 'pipe']（默认值）。
	- 'ignore' - 相当于 ['ignore', 'ignore', 'ignore']。
	- 'inherit' - 相当于 ['inherit', 'inherit', 'inherit'] 或 [0, 1, 2]。
  - 数组
		- 'pipe' // 在子进程和父进程之间创建一个管道
		- 'ipc' // 创建一个 IPC 通道，用于在父进程和子进程之间传递消息或文件描述符（不支持非node.js子进程消息传递）
		- 'ignore' // 忽略
		- 'inherit' // 将相应的 stdio 流传给父进程或从父进程传入
		- <Stream> 对象
		- 正整数 // 整数值会被解释为当前在父进程中打开的文件描述符，例如 0,1,2
		- null 或 undefined // 使用默认值
```

1. stdio、stdout 通信

```typescript
// main.js
const { spawn } = require("child_process");

const child = spawn("node", ["./child.js"]);

child.stdin.write("Hello child.js"); // 向子进程写入信息
// 接收子进程信息
child.stdout.on("data", (data) => {
  console.log("Received message from child:", data.toString());
});

// child.js
console.log("Hello main.js once"); // 向父进程输出信息
process.stdout.write("Hello main.js twice \n"); // 向父进程输出信息

// 接收父进程信息
process.stdin.on("data", (data) => {
  console.log(`Receive message from parent: `, data.toString());
});
```

2. IPC 通信

```typescript
// main.js
const { spawn } = require('child_process');

const child = spawn('node', [ 'child.js' ], {
  stdio: [
    0, // 将父进程的stdin传给子进程
    1, // 将父进程的stdout传给子进程
    2, // 将父进程的stderr传给子进程
    'ipc'
  ],

  或者
  stdio: [ 'inherit', 'inherit', 'inherit', 'ipc' ],
});;

child.send('Hello child.js');

child.on('message', data => {
  console.log('Receive Message from child: ', data);
});

// child.js

process.on('message', data => {
  console.log('receive Message from main: ', data);
})

process.send('Hello main.js');
process.stdout.write('Hello main.js twice');
```

### 杀死子进程及事件触发

```typescript
process.exit([code]);  // code 默认为0，强制进程尽量退出，在调用所有的 'exit' 事件监听器之前，Node.js 不会终止

process.kill(pid[, signal]); // 杀死进程，并传递信号量

process.abort(); // 使 Node.js 进程立即结束，并生成一个核心文件

subprocess.kill([signal]): boolean; // 默认SIGTERM，在 Linux 上，子进程的子进程在试图杀死其父进程时将不会被终止

	const { spawn } = require('child_process');
  const subprocess = spawn(
    'sh',
    [
      '-c',
      `node -e "setInterval(() => {
        console.log(process.pid, 'is alive')
      }, 500);"`
    ], {
      stdio: ['inherit', 'inherit', 'inherit']
    }
  );

  setTimeout(() => {
    subprocess.kill(); // 不会终止 shell 中的 Node.js 进程。
  }, 2000);


// 子进程抛出错误
throw Error;
```

```typescript
close 事件 // 当子进程的 stdio 流已被关闭时会触发 'close' 事件。 这与 'exit' 事件不同，因为多个进程可能共享相同的 stdio 流

exit 事件 // 当子进程结束后时会触发 'exit' 事件。 如果进程退出，则 code 是进程的最终退出码，否则为 null。 如果进程是因为收到的信号而终止，则 signal 是信号的字符串名称，否则为 null。 这两个值至少有一个是非 null 的。当 'exit' 事件被触发时，子进程的 stdio 流可能依然是打开的

Node.js 为 SIGINT 和 SIGTERM 建立了信号处理程序，且 Node.js 进程收到这些信号不会立即终止。 相反，Node.js 将会执行一系列的清理操作，然后再重新提升处理后的信号

error 事件 // 每当出现以下情况时触发 'error' 事件：
    无法衍生进程；
    无法杀死进程；
    向子进程发送消息失败
```

### 守护进程

```typescript
const { spawn } = require("child_process");

const child = spawn("node", ["child.js"], {
  detached: true,
  stdio: "ignore", // 需要断开父子进程的通信
});

child.unref(); // 此时子进程独立于父进程运行
```
