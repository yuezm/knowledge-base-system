---
title: Linux
description: Linux
status: active
---

## 文件系统

### 查看文件编码

```shell
file filename # filename: UTF-8 Unicode text
```

## 查看文件

```shell
cat  由第一行开始显示档案内容
tac  从最后一行开始显示，可以看出 tac 是 cat 的倒着写
more 一页一页的显示档案内容
less 与 more 类似，但是比 more 更好的是，他可以往前翻页
head 只看头几行， head -n 10 filename
tail 只看尾巴几行 tail -n 10 filenam
nl   显示的时候，顺道输出 行号
od   以二进制的方式读取档案内容
```

### 查看文件二进制

```shell
hexdump options filename

	-n length 只格式化输入文件的前length个字节。
  -C 输出规范的十六进制和ASCII码。
  -c 单字节字符显示。
  -d 双字节十进制显示。
  -o 双字节八进制显示。
  -x 双字节十六进制显示。
  -s 从偏移量开始输出。
  -e 指定格式字符串，格式字符串包含在一对单引号中，格式字符串形如：'a/b "format1" "format2"'。
```

### 查看文件列表

```shell
ls options file
	-a 全部的文件，包含隐藏文件
  -l 以列表形式展示
  -h 当使用-l参数时，使用此参数会对文件大小进行格式化，比如 b、kb、mb等等
  -t 按照修改时间排序
  -S 按照大小跑徐
  -r 反序
  -i 文件索引节点
```

例如
按照 文件大小排序：         ls -lS
按照 文件大小序列化排序： ls -lhS

### grep

```
grep
	-i 忽略大小写
  -A n 查看后n行
  -B n 查看前n行
  -C n 查看前后n行
```

## 硬链接和软连接

**索引节点**：保存在磁盘内的文件，不论是什么类型，都会分配一个编号，该编号称为索引节点.

```shell
# 查看索引节点
ls -li
```

**硬链接：**通过**索引节点**来进行链接，即两个文件同时指向该索引节点

```shell
ln xx1 xx2 # 此时删除xx1时，xx2任然是可以访问的
```

**软连接（符号链接）：**软连接文件是一种特殊的文件，内部保存的源文件的位置信息，可以理解为 Windows 的快捷方式

```shell
ln -s xx1 xx2 # 新增软链 xx2 => xx1，此时删除xx1，xx2是不可以访问的
ln -snf xx3 xx2 # 修改软链，xx2 => xx3
```
