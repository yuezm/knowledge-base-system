---
title: Array
description: Array
status: active
---


# API
## flat

`Array.prototype.flat([depth]); // 默认为1`

### 模拟 flat
#### concat

```javascript
function flat(arr) {
  return [].concat(...arr);
}
```

#### 递归

```javascript
function flat(arr, depth = Infinity) {
  return run(arr, depth);

  function run(val, depth) {
    if (!Array.isArray(val)) return [val];
    if (depth <= 0) return val;
    return val.reduce((sum, item) => {
      sum.push(...run(item, depth - 1));
      return sum;
    }, []);
  }
}
```
