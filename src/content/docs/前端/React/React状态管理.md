---
title: React状态管理
description: React状态管理
---

## 全局状态

React 常用的有如下状态管理库

### Redux/Redux Toolkit

Redux 是 React 常用的状态管理库，核心为 Action -> Reducer -> State -> View

Redux Toolkit 简化了 Redux 的使用，且更好的结合 Hooks 使用

```ts
export const counterSlice = createSlice({
  name: "counter",
  initialState: {},
  reducers: {},
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
```

特点

1. 中心化数据存储
2. 单向数据流
3. 模板代码较多，RTK 极大的简化了模板代码

### Recoil

由 Facebook 推出的原子化状态管理库，核心为 Atoms 和 Selectors。数据存储于各个 Atoms 中，各个 Atoms 可组合使用，当 Atom 数据出现变更，迫使使用过 Atom 的组件更新。

```ts
const textState = atom({
  key: "textState",
  default: "",
});
```

特点

1. API 设计符合 React Hooks
2. 细粒度控制，性能较高
3. 社区成熟度不足

### Jotai

也是原子化的状态管理库，和 Recoil 类似，但 API 更加轻量

```ts
const priceAtom = atom(10);
```

特点

1. API 和 Recoil 类似，更加轻量
2. 细粒度控制，性能较高
3. 可以在 React 之外使用

### Zustand

简单的，基于 Hooks 的状态管理库

```ts
const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

特点

1. 极简，代码量少，API 少
2. 性能较好
3. 可以在 React 之外使用

### MobX

基于可观察对象 (Observables) 和响应式编程 (Reactive Programming)

```ts
const state = makeAutoObservable({
  secondsPassed: 0,
  increase() {
    this.secondsPassed += 1;
  },
  reset() {
    this.secondsPassed = 0;
  },
});
```

特点

1. 响应式

### TAN Store（React Query）

服务器状态管理，不用于管理客户端状态，可以和 Alova.js 对比

特点

1. 简化了向服务端获取数据的流程，内置了缓存，Loading，分页等等功能
2. 概念较多，不易于理解

### Context + Hooks

不借助三方状态管理库，由 React 内部 API 实现全局状态管理

特点

1. 简单直观，无需引用三方库
2. Context API 天生的性能问题

## 局部状态

## State Hooks
