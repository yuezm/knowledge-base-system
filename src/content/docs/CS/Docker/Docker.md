---
title: Docker
description: Docker
status: stub
---

## 常见问题

### dcoker 运行报错：空间不足

错误信息：no space left no device
解决措施：清除磁盘空间

```shell
docker volume rm $(docker volume ls -qf dangling=true)

docker volume ls // 查看卷

docker rmi $(docker images | grep '^<none>' | awk '{print $3}')
```
