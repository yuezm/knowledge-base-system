---
title: Vue Router
description: Vue Router
---

1.  装载，使用 Vue 提供的插件模式，装载 vue-router 
   - 混入生命周期：在钩子函数执行非常重要的步骤，将根 Vue 的_route 属性变为响应式数据
   - 提供全局组件：router-link、router-view
   - 对 _route 代理 --> this.$route
2.  初始化 
   - 创建 Matcher 对象
   - 首次跳转
   - 确认路由模式，监听事件
3.  路由跳转 
   - 通过 Matcher 对象计算跳转的目标路由
   - 实施跳转 
      - 判断当前路由和目标路由，如果相同则不跳转
      - 根据新老路由计算出 update、activated 和 deactivated，并创建不同的任务队列并执行（解决异步路由）
      - 执行任务回调
      - 实施跳转，修改路由
   - 页面更新：由于在 RouterView 内获取了 _route 属性，且 _route 为响应式数据，那么当_route 改变时，则会触发当前的 Render Watcher 更新，实现页面的重新渲染
