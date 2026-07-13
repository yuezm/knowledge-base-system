---
title: Git工作流
description: Git工作流
---

## Git flow

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/f359e9d77fd521e63919c6b9226887208179e3cf90faa9624bdac2f73a3e41d1.png)

Git 官方推荐的工作流

1. master：常驻分支，用于部署生产环境。通常在发版时，会打 Tag
2. develop：常驻分支，主开发分支。当需要发版时，合并至 master 分支
3. feature/\*：新功能开发分支。基于 develop 分支创建，当功能完成时，合并到 develop 分支
4. hotfix/\*：BUG 修复分支。基于 master（release）分支创建，当修复完成时，合并到 master 分支和 develop 分支

优点

1. 分支各司其职，可以覆盖大部分场景

缺点

1. 步骤繁琐
2. CI/CD 不友好

## Github flow

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/3a7234ab3073b68caa2d0e2fefe13a2b7558b76e9425c5dfafe295b836640d6c.png)

针对于 Github 的开源场景（PR + CR），创建出该工作流

1. master：常驻分支，用于部署生产环境。当 master 分支有 PR 时，会触发 CI/CD 流程
2. 其他分支（无定式命名）：开发分支。当想贡献代码时，基于 master 分支创建开发分支，开发完成后，提 PR，经过 CR 后合并至 master

优点

1. 分支少，易于管理
2. CI/CD 集成友好

缺点

1. 较为适合开源代码，不适合企业使用。企业一般存在多个环境（开发，测试，预生产，生产等等），一个 master 显然无法管理；提 PR 不代表需要立即发版，企业一般都遵循周期发布
2. 多条产品线的时候无法适用

## Gitlab flow

![picture 2](https://cdn.jsdelivr.net/gh/yuezm/assets@main/4610101434184d3fe908d2c5af9fe6f592db2169c1144806e22e3822a2e742b6.png)

综合了 Github flow 和 Git flow 的优点，并考虑多环境，CI/CD 等等因素优化后到的实践，gitlab flow 最大的原则是 **Upsteam first**，只有上游的代码没问题，才可以同步到下游

1. master：唯一上游分支，其他分支的代码均来自于 master
2. 开发分支（无定式命名）：包含功能开发和 BUG 修复。基于 master 分支创建，开发完成后，提 PR，经过 CR 后合并至 master
3. staging：测试分支。
4. pre-production：预生产分支。
5. production 发布分支。

优点

1. 多环境管理和 CI/CD 的能力

缺点

1. 多条产品线的时候无法适用

## Trunk-based flow

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/01a1866f356318edab9c19b9c2230ab784926f7a03459ad8c557b9dde7ebeb3a.png)

只在 master 分支开发，需要发布时，从 master 创建只读分支（或者 Tag）进行发布。当人员过多时，也可以从 master 创建开发分支，并在开发完成后合并到 master

优点

1. 容易维护

缺点

1. 无法满足多版本共存

## Aone Flow

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/bd1b9a3e843a5b23152c03682912641e0f7935d5cbc6a9d74852ff27716514fe.png)

在 truck base flow 和 gitlab flow 进行了优化

1. master：主干分支。
2. feature/\*：开发分支。基于 master 创建
3. 发布分支：pick 开发分支（特性分支）组合为发布分支，当正式上线后，将发布分支合并回 master

优点

1. 较为灵活，可满足多版本共存，开发，测试，发布交叉进行

缺点

1. 需要完善的       

## 常用实践

1. master：常驻分支，主干分支。
2. develop：主开发分支。
3. test：测试分支
4. release/\*：发布分支。
5. feature/\*：功能开发分支。基于 master 创建，开发完成，合并到 develop 分支，用于部署开发环境，一般来说功能开发的 CR 是在开发过程中完成的，如果在提 PR 的时候进行 CR，会导致代码过多，根本看不过来
6. hotfix/\*：BUG 修复分支。基于 master 创建，修复完成后合并 develop 部署开发环境，提 PR 合并到 test 分支，部署测试环境，测试通过后，提 PR 到 master，等待发版

提测

1.  功能提测

    将 feature/\* 提 PR 合并到 test 分支，通过 CI/CD 部署测试环境

2.  测试过程中 BUG 修复

    在 feature/\* 分支修改 BUG，并合并到 test 分支，通过 CI/CD 部署测试环境

发布

1. 班车发布

   从 master 拉出 release/\* 进行发车，将需要发布的功能（测试完成了的）提 PR 合并到该分支，并发布预生产环境，回归测试后发布到正式环境

2. 发布过程中 BUG 修复

   从 release/\* 拉出修复分支，修复完成后合并到 release/\*，发布预生产环境

3. 紧急发布

   当出现紧急 BUG 时，修复完成后合并到 master，从 master 拉出 release/\* 超车发布到预生产环境，回归测试后发布到正式环境

4. 发布完成

   将 release/\* 合并到 master 分支，并打 tag 记录，删除 release/\* 分支。

   发布完成后，一般需要将 master 分支合并到 develop 和 test，保证代码同步。当时选择的是不合并，而是在一定时间内进行代码同步，比如 1 个月 同步一次，既通知全员将会同步一次代码，将 develop 和 test 删除，同步一次 master 代码
