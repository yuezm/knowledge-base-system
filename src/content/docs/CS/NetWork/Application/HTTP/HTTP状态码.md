---
title: HTTP状态码
description: HTTP状态码
---

用于标识请求结果

## 1xx

表示信息已被接收，需要客户端继续处理

1. 100 Continue: 客户端应继续发送后续部分。用于在大请求前来测试服务器是否正常，例如上传大文件，分段上传文件等
2. 101 Switching Protocols: 服务器已切换协议，客户端应继续使用新的协议

## 2xx

1. 200 OK: 请求成功
2. 201 Created: 请求成功，并创建了新的资源。例如 HTTP POST 请求创建新资源
3. 202 Accepted: 请求已接受，但处理尚未完成
4. 204 No Content: 请求成功，但响应没有内容。例如 HTTP DELETE 请求删除资源
5. 205 Reset Content: 请求成功，但客户端应重置文档视图
6. 206 Partial Content: 请求成功，返回部分内容。例如文件的分段下载，视频分段播放等

## 3xx

1. 301 Moved Permanently: 永久重定向，请求的资源已被永久移动到新位置。搜索引擎会将老网址的排名赋予新的网址，并将老地址替换为新地址
2. 302 Found: 临时重定向，请求的资源临时被移动到新位置。搜索引擎不会替换新地址，也不会计入访问流量
3. 304 Not Modified: 资源未修改，客户端可以使用缓存中的资源
4. 303 See Other：请求应通过 GET 方法重定向到另一个 URI
5. 307 Temporary Redirect: 临时重定向，请求的资源临时被移动到新位置

虽然规定了 302 重定向后，不允许改变请求方法，但是由于历史原因，大部分浏览器往往使用 GET 方式获取的，所以另外创建了 307，规定重定向时不允许修改请求方法

## 4xx

1. 400 Bad Request: 请求无效，服务器无法理解请求。例如可表示客户端请求格式错误或者参数错误
2. 401 Unauthorized:请求要求身份验证。例如表示客户端未登录
3. 403 Forbidden: 服务器理解请求，但拒绝执行。例如表示 IP 被封了，不让访问
4. 404 Not Found: 请求的资源不存在。
5. 405 Method Not Allowed: 请求方法不允许。例如服务器禁止 POST 请求
6. 406 Not Acceptable: 请求的资源无法以请求的格式返回。例如客户端请求的格式是 JSON，但服务器返回的是 XML

## 5xx

1. 500 Internal Server Error: 服务器内部错误，无法完成请求
2. 501 Not Implemented: 服务器不支持请求的功能
3. 502 Bad Gateway: 服务器作为网关或代理时，从上游服务器收到无效响应
4. 503 Service Unavailable: 服务器暂时无法处理请求，通常是由于过载或维护
5. 504 Gateway Timeout: 服务器作为网关或代理时，未能及时从上游服务器收到响应
6. 505 HTTP Version Not Supported: 服务器不支持请求的 HTTP 协议版本

## 参考

- [HTTP Status Code](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
