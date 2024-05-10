---
title: Javascript优化
description: Javascript优化
---

## Javascript 代码优化

针对的代码的优化，无非一下两点

1. 使得计算量减小
2. 使得计算效率提高

从以上两点出发，可总结为如下

### 减少计算

1. 使用正确的数据结构。例如查询时 Map 和 Set 优于 Array
2. 缓存结果，减少计算。例如使用 `useMemo` `memo` `lodash.memorize` 来减少计算
3. 减少多次的 DOM 操作，将多个操作合并为一个
4. 减少重绘和重排
5. 使用事件委托

### 提高效率

1. 使用位运算
2. 数字比较速度优于字符串比较。例如枚举时，使用数字来代替字符串
3. Avoid different shapes（避免修改对象类型）

   由于 Javascript 底层，对象对应的是 Hidden Class，如果修改对象的属性类型，则需要将原 Hidden Class 销毁再重新创建，这会带来性能损耗。

4. Avoid large objects（避免大对象）

   当对象过大时，由 Hidden Class 转为 HashMap 存储

5. Avoid array/object methods

   数组和对象处理时，命令式编程比函数式效率更高

6. Avoid indirection

   直接访问比间接访问效率更好，例如 object vs proxy；`user.id` vs `user['id']`

7. Avoid cache misses

   - Accessing data sequentially（访问有序数据）能更高的利用内存访问机制
   - 利用 CPU 的 3 级缓存，来存储常量

8. 使用 requestAnimationFrame
9. 使用 Web Workers

## 参考

- [optimizing-javascript](https://romgrk.com/posts/optimizing-javascript)
