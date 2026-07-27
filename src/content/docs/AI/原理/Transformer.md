---
title: Transformer
description: Transformer
status: evergreen
---

Transformer 是由 Google 在 2017 年论文《Attention Is All You Need》中提出的一种深度学习架构

Transformer 的核心思想是：抛弃了传统的循环和卷积神经网络，完全基于**注意力机制**来处理序列数据。可以并行处理整个序列，更容易捕获长距离依赖关系

例如：小明把球踢给了小红，因为**他**跑得很快。理解「他」指的是谁时，需要关注前面较远位置的信息，Transformer 可以直接计算出「他」指的是小明

## Attention

目的：量化词与词之间的关联程度。可以让模型在处理 Token 的时候，能够关注到不同 Token 之间的关联程度，从而更好地理解文本。是通过三个矩阵的交互来实现的，分别是 Query、Key、Value

Q、K、V 模型：

- Query (查询 - Q)：“我当前正在寻找什么？”（比如当前要翻译的单词上下文）
- Key (键 - K)：“我这里有什么信息？”（输入序列中每个单词的标签，索引，特征）
- Value (值 - V)：“我具体的内容是什么？”（输入序列中每个单词实际包含的信息）

以你在图书馆找一本关于“量子纠缠”的书为例：

- 你现在想找什么？→ Query（你脑子里的问题描述）
- 书架上每本书的标签/简介 → Key（书的“检索特征”）
- 书里的真实内容 → Value（真正要读的东西）

你把自己的问题（Q）跟每一本书的标签（K）做相似度匹配，得到一个相似度分数列表，然后把分数归一化成权重，最后按这个权重把所有书的内容（V）加权混合起来，就得到了你最终要看的“综合答案”

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

以

### Self-Attention

处理一个词的时候，关注其余所有的词，并计算出每个词多当前词的重要得分

### Multi-Head Attention

多头注意力机制（Multi-Head Attention）是自注意力机制的扩展，它通过将自注意力机制应用到多个不同的子空间中，从而捕捉到更多的上下文信息

思路是，以不同的角度去关注，做多次独立的注意力计算，最后将结果拼接起来，再通过一个线性层进行变换，得到最终的注意力结果

## 向量化

向量化是将自然语言转换为向量，大致可以分为 3 步

1. 分词（Tokenization）
2. 向量化（Embedding）
3. 位置编码（Positional Encoding）

拿“我是谁”的翻译任务来举例子

1. 分词：将“我是谁”拆分为 Tokens `["我","是","谁"]`，当然这是我的举例，具体如何分析是看分词器如何实现的，例如可能将 `["我是谁"]` 做为一个 Token
2. 向量化：将 Tokens 转换为向量（假设为 512 维），例如 ["我","是","谁"] 转换为 `Shape[3, 512]`
3. 位置编码：因为 Attention 机制本身是不分先后的，需要给向量加上位置信息，让模型知道 "我" 是第一个，"是" 是第二个，"谁" 是第三个

```ts
// ["我", "是", "谁"] --> [1234, 5678, 9012]
X_embed = Embedding([1234, 5678, 9012]);
PosEnc = [位置0:2]

X = X_embed + PosEnc; // Shape[3, 512]
```

## Encoder

编码大致可以分为 3 步

1. 计算 Query、Key、Value 矩阵
2. 计算 Attention Score
3. 计算 Attention Output

继续“我是谁”的翻译任务来举例子

1. 计算 Query、Key、Value 矩阵，输入的矩阵 X 会分别乘以 3 个训练好的权重矩阵，得到 Q、K、V 矩阵

$$
Q = X * W_Q \\
K = X * W_K \\
V = X * W_V
$$

2. 计算 Attention Score，Q 和 K 做点积，得到 Attention Score

$$
Weight = softmax(Q \times K^T)
$$

3. 计算 Attention Output，将 Attention Score 乘以 V，得到 Attention Output

$$
Z = Weight \times V
$$

## Decoder

Decoder 自回归生成翻译后的句子，大致可以分为 3 步
