---
title: HTTP
description: HTTP
---

## request header

## response header

### Access-Control-Expose-Headers

HTTP 响应头部中，不是所有的头部信息都能被读取，以下有几个较常用的头部

```shell
Cache-Control
Content-Language
Content-Length
Content-Type
Expires
Last-Modified
Pragma
```

如果你想要浏览器读取别的头部，必须使用 Access-Control-Expose-Headers 来标识该头部

```
Access-Control-Expose-Headers: xx-yy
```

## 虚拟主机

### SNI（服务器名称指示） 和 虚拟主机

**SNI（Server Name Indication）**:允许同一个 IP 可以提供多个证书，提供多个 HTTPS 服务 虚拟主机：允许同一个 IP 提供多个 HTTP 服务，在请求时，必须指定 Host，以表示此次请求的是该 IP 上的哪一个服务

SNI 和虚拟主机原理一致，一个用于 HTTPS，一个用于 HTTP
