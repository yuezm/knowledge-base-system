---
title: Hooks
description: Hooks
---

目前 Hooks 有如下特点

1. 只适用于 React 函数式组件
2. Hooks 只能在最外调用，不能在条件，循环等待内调用

## API

### useActionState

React 19 新增 Hooks，用于简化表单的状态管理及提交

```ts
// 使用 fn 来指定如何提交表单及返回 state，initialState 指定表单初始状态
// 当调用 formAction 是，就会触发 fn 去提交表单，
const [state, formAction] = useActionState(fn, initialState, permalink?);
```

### useCallback

缓存函数，用于解决组件渲染时，每次函数都是新的（每次都会创建新的函数）。可解决如下问题

1. 父组件传递给子组件函数，当父组件更新时，子组件会跟着不必要的更新

```ts
const memoizedFn = useCallback(fn, deps);
```

### useContext

用于读取和订阅 Context

```ts
const ctx = createContext(); // 创建 Context

const ctxValue = useContext(ctx); // 订阅 Context
```

### useDebugValue

用于添加调试值，在 React DevTools 中可以显示，且可以格式化值

```ts
useDebugValue(value, formatFn?);
```

### useDeferredValue

用于处理延迟更新 UI。可解决如下问题

1. 当用户进行输入搜索，而搜索结果渲染时间很长，此时就可以使用 useDeferredValue 来延迟结果的渲染，从而能立即看到自身的输入

从效果上来看，useDeferredValue 和节流/防抖类似，但是他们是通过不同的原理来实现的

1. useDeferredValue 深度绑定 React，是 React 调度优化的结果；节流/防抖是在一段时间内减少函数的执行次数
2. useDeferredValue 会根据电脑性能产生不同延迟时间，电脑性能高会较快，而电脑性能差会较慢；节流/防抖的延迟时间是固定的

可以将 useDeferredValue 理解为，一个自己调节延迟时间的节流/防抖方案

```ts
const deferredValue = useDeferredValue(value);
```

### useEffect

处理函数组件的副作用。

什么是副作用？一个纯函数应该只具有如下特性，输入 => 函数 => 输出。但是在 React 组件中，我们需要处理一些其他的事情，例如修改 DOM，定时器，网络等等。这种和输入（props）输出（HTML/JSX）无关的，就是副作用

```ts
useEffect(setupFn, dependencies?)
```

### useLayoutEffect

处理函数组件的副作用，和 useEffect 执行时机不同，useLayoutEffect 在浏览器绘制前触发

### useId

用于可以生成传递给无障碍属性的唯一 ID，在一个会话内，useId 生成的值是一致的

```ts
const id = useId();
```

### useImperativeHandle

和 forwardRef 同时使用，用于给父组件暴露 ref

```ts
// 子组件
const Child = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        // ... 你的方法 ...
      };
    },
    []
  );

  return <></>;
});

// 父组件
function Parent() {
  const childRef = useRef();

  return (
    <>
      <Child ref={childRef}></Child>
    </>
  );
}
```

### useInectionEffect

适用于 CSS-in-JS 库，用于在布局之前插入 CSS

### useMemo

缓存计算结果

### useOptimistic

用于异步操作时的状态管理，例如用户点击按钮提交表单时，给予文字反馈 “提交中...”

```ts
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

### useTranstion

不阻塞 UI 的情况下更新状态的 React Hook

```ts
// 由 startTransition 调用一个同步函数，来进入 pending
// 通过判断 isPending 来输出不同的内容
const [isPending, startTransition] = useTransition();
```

### useSyncExternalStore

可订阅外部的 store，以读取非 React 的状态，例如结合浏览器 API，结合第三方库

```ts
// subscribe 订阅 store 的变化，当 store 变化时，会触发 listener 的变化
// getSnapshot 获取 store 的快照，返回 store 的最新状态
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

### useFormStatus

对表单状态的维护

```ts
const { pending, data, method, action } = useFormStatus();
```

### use

用于读取 Context 或者 Promise 的值

```ts
const value = use(resource);
```


## 参考

- [React Hooks](https://zh-hans.react.dev/reference/react/useActionState)