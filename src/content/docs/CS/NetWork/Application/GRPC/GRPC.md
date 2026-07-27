---
title: GRPC
description: GRPC
status: active
---

## 工具

### grpc 压力测试（[bojand/ghz](https://github.com/bojand/ghz)）

grpc 压力测试很多，目前采用的 ghz

#### 安装

1. brew

```shell
brew install ghz
```

2. install release
   [ghz/releases](https://github.com/bojand/ghz/releases)
3. build

```shell
git clone https://github.com/bojand/ghz
make build
```

#### 执行

```shell
# 参数意义
  --insecure # 使用纯文本和不安全连接
  -c, --concurrency=50   # 多少个worker并发
  -n, --total=200 # 总共多少个请求
  --proto # pb协议，注意引用路径问题
  --call # 函数调用
  -d, --data= # 数据传输
```

```shell
ghz \
  --insecure \
  --proto med-node-tool/trans-html/service.proto \  # 此处需要注意proto引用的路径问题
  --call trans_html.TransService.TransHtml \
  -d '{"id":"17300000000000","hospitalName":"银川医联互联网医院","type":"普通","date":"2019-02-01","name":"测试患者","sex":"男","age":"12","costType":"自费","sectionType":"普通外科","clinical":"莫得事情","drugs":[{"genericName":"测试药品","specification":"10g","count":"10","usage":"敌敌畏口服","drugTags":"drug,Tags"}],"doctorName":"测试医生","doctorUrl":"","pharmacistName":"测试药师","pharmacistUrl":"","dispensingName":"测试药师","dispensingUrl":["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568721496087&di=49157a6fdd016fb62f26b7497e7f3a33&imgtype=0&src=http%3A%2F%2Fwww.y9ds.com%2Fuploads%2F180114%2F1-1P11410015C94.jpg"],"shelfLife":"5天","drugPairs":2,"usages":"","disease":"","drugShapeName":"颗粒","structuredUsages":"{\"dosage\":\"\",\"take\":\"\",\"usage\":\"\"}","remark":"","patientWeight":"","skinTest":"","isPregnant":false,"isDecocting":false,"processMode":"1","totalWeight":"1","auxMaterials":[]}' \
  0.0.0.0:8000
```
