---
title: API
description: API
---

## ReactDOM


### render

将虚拟DOM渲染为真实的DOM
```typescript
ReactDOM.render();
```

## 组件
### 函数组件

```typescript
function Home(){
  return (
    <div></div>
  );
}
```

```typescript
function Home(props){
  return (
    <div></div>
  );
}

// 函数状态组件为 useState
```

### 类组件
```typescript
export class Home extends React.Component {
  render() {
    return (
      <div>
        hello word
      </div>
    );
  }
}
```

```typescript
export class Home extends React.Component {
  constructor(){
    this.state = {};
  }
  
  render() {
    return (
      <div>
        hello word
      </div>
    );
  }
}
```

### 代码分割和异步组件

由打包工具自动完成代码分割，例如 webpack,rollup，对于babel，则需要额外使用插件，例如 babel-plugin-syntax-dynamic-import

#### React.lazy 和 Suspense

React.lazy 只支持默认导出

```typescript
const c = React.lazy(()=>import(xxx));

// 然后使用 Suspense 包裹
<Suspense fallback={ <div>loading</div> }>
  <Home name="keven" />
</Suspense>
```


## Context

对于需要逐层传递的值，例如语言、颜色、主题等等，React提供类似组件共享的方式

```typescript
// 对于类组件
export const ThemeContext = React.createContext('dark');
ThemeContext.displayName = 'xx'; // react dev tools 使用该 name 来确定 context 显示内容

<ThemeContext.Provider value="light">
  <Home />
</ThemeContext.Provider>

export default class Home extends React.Component {
  static contextType = ThemeContext;
  // 后续的方法内可以通过 this.context 来访问
}
```

```typescript
// 函数组件

export default function Home() {
  return (
    <ThemeContext.Consumer>
      { value => (value) }
    </ThemeContext.Consumer>
  )
}
```


## 错误边界

捕获错误，无法捕获如下错误

1. 事件处理的错误
2. 异步代码
3. 服务端渲染
4. 它自身的报错，而非子组件的报错
```typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}
```


## Ref

可以访问本组件、其他组件的元素，直接操作DOM

```typescript
// 父组件
const ref = React.createRef(); // 在子组件赋值后，可以父组件内通过 ref.current 操作DOM

<Child ref={ref}></Child>

// 子组件
const Child = React.forwardRef((props,ref)=>{
  return (<div ref={ref}>点击我</div>); // 此时 ref的current为div，可以直接操作DOM 
})
```


## Fragments 和 <></>

节点不会渲染，类似于vue的template

## JSX

```jsx
function Home(props) {

}
```

1. 对于 react jsx标签，不能在运行时选择类型，但是可以预先赋值

```jsx
<home[attr]> // 这是要报错的</home[attr]>

const Attr = home[attr];

<attr> // 这是可以的</attr>
```

1. props 可以对象解构
2. props 未指定值时，传值为true
3. props.children 为传递的子元素

```jsx
<div> {props.children} </div>
```

1. false, null, undefined, and true 是合法的子元素。但它们并不会被渲染


## Props

可分为函数组件props和class组件props

### PropTypes

使用PropTypes 对 props 检查

```jsx
Greeting.propTypes = {
  name: PropTypes.string
};
```

## Portals

提供了将子组件渲染至**父组件之外**的地方，譬如悬浮框，对话卡等等

```jsx
export const Home = () => {
  return ReactDOM.createPortal(
    Frame(), // 接收React Component
    document.getElementById('root2')
  )
}


export function Frame() {
  return (
    <div id="frame">
      hello frame
    </div>
  )
}
`
```

## Hooks

1. 只能在函数最外层调用Hooks，不能再循环，判断或者子函数内
2. 只能在react函数组件调用hooks

### State Hook

```jsx
useState();
```

### Effect Hook

当你调用 useEffect 时，起始就是在完成对DOM操作后，运行你的副作用函数

即，react在每次渲染后，都会调用副作用函数

```jsx
useEffect();

useEffect(()=>{ return ()=>{} }); // 可以返回一个函数，对副作用清除

useEffect(xxx,[yy]); // 只有在yy下，才出发副作用函数
```

### 自定义hooks
