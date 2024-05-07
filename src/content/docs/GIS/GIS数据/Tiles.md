---
title: 瓦片
description: 瓦片
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## 什么是瓦片地图

瓦片地图是将整个世界地图，根据地图层级，分割成小地图（瓦片）。在使用时，将小地图再拼接成大地图。

## 为什么需要瓦片地图

假设我有一张非常高清的世界地图，那么我可以通过放大这张图片来看到世界各个地方，但会产生如下问题

1. 图片会非常大，不仅存储困难，客户端加载时机器的性能也不够
2. 图片太大，传输时间太长，用户体验较差

所以才有了瓦片地图，瓦片地图右如下优点

1. 渐进加载：按照你想要看的层级加载，高层级的瓦片覆盖范围小但细节多，低层级的瓦片覆盖范围大但细节少
2. 局部加载：仅需加载所要显示的区域的瓦片
3. 高效缓存：加载过的瓦片，下次加载时，可从缓存中获取
4. 高性能：将地图按照层级切片后，做为静态图片资源放置于服务端，可快速获取

## 制作瓦片地图

### 投影

首先要三维的地球转换为平面，这就需要投影。常用的投影方式有很多，Web 中常用的投影是 Web Mercator 投影

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/1f246398f4d0b65e0d7c6d56f910cc10e9cd7a280968dfd39b37eb05dcd4b966.png)

Web Mercator 投影有如下特点

1. Web Mercator 当地球是一个球形而非椭球，球体半径等于 WGS84 长半轴的长度，即 6378137 米，投影出来的地图是一个正方形
2. Web Mercator 数据覆盖范围在经度（-180° ～ 180°），纬度（-85.051129° ～ 85.051129°）
3. Web Mercator 的坐标系
   - 原点：0° 纬线和 0° 经线的交点，位于投影地图的中心点
   - X 轴：水平，向东（右）为正
   - Y 轴：竖直，向北（上）为正

### 地图配图

设置在地图上显示的内容。举个例子，在 10 层时，河流只需要展示一条蓝色的线，而在 17 层时河流需要展示名字

可以使用 [maputnik](https://maputnik.github.io/editor/) 进行配图

### 切片

1. 按照地图等级细分，从顶部开始（zoomLevel=0）往下，zoomLevel 依次递增，形成一个金字塔体系。zoomLevel 越大则地图越详细，
2. 按照地图的层级，将每一层分割为 ${2^{zoomLevel}} * {2^{zoomLevel}}$ 张图片，图片大小一致，通常分辨率为 $256 * 256$
   ![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/494b976b603e6f91e6c2db2e040c78c6dbfa80911ed6f7a87cee023c65edae83.png)
3. 每一层图片独立编号，编号规则每个瓦片地图服务商可能不同，但都能通过 zoomLevel、x、y 定位到该瓦片
   ![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/8023812229447445fb985278bd7fd79b965cf0683b60f4c73870c2b9d2a9591f.png)

常用的协议如下

#### WMS

OGC 定义的协议，用于请求任意区域的渲染地图图像。服务端根据客户端提供的限制条件，返回符合限制条件的地图图像。

WMS 主要属于动态地图服务，即地图是服务器在每次接到客户请求时立刻生成的，特别适用于数据在不断被更新的地图服务

#### WMS-C

WMS-C（Web Mapping Service - Cached）是 OSGeo 创建的 WMS 扩展，目的在于提供一种预先缓存数据的方法，以提升地图请求的速度

#### TMS

TMS（Tile map service）支持 EPSG:4326（Web Mercator），坐标系如下

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/50e7300d3fee80dfd1d1c1d2bd41f40607cc7f39435f22f39546e3a756af4804.png)

- 原点：左下角 (-20037508.34, -20037508.34)
- X 轴：向东（右）为正
- Y 轴：向北（上）为正

#### WMTS

WMTS（Web map tile service）是 OGC 创建的协议。支持 EPSG:3857（WGS84） and EPSG:4326（Web Mercator）

WMTS 的地图是服务器预先制作好的瓦片，这种方法可以提高 Web 服务的性能和伸缩性，特别适合于数据相对静态、不再更新或更新频率很低的数据。

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/b8e6d9071d275efb5fe7a91647f310142934be8f4066f5d45552be102007b22e.png)

- 原点：左上角 (-20037508.34, 20037508.34)
- X 轴：向东（右）为正
- Y 轴：向南（下）为正

瓦片等级（zoom level）最小为 0，最大为 24

#### XYZ

XYZ 没有标准的元数据机制，图像通过 REST API 提供，URL 为 `http://.../Z/X/Y.png`，其中 Z 为层级，X、Y 为瓦片编号

Google Maps / OpenStreetMap 坐标系如下

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/61a3e61227afe2e95580695e48e6b570ec596d41dd5ddfcd72e4ea9c0b074661.png)

### 加载

#### 投影

将大地坐标转换投影坐标

#### 坐标系修正

根据地图服务商进行坐标系修正

#### 计算瓦片位置

根据地图层级，投影坐标，瓦片分辨率计算出瓦片位置，并根据瓦片位置，从地图服务商获取瓦片

#### 多域名

由于浏览器对同域名的请求限制，服务商考虑并发请求会提供子域名，例如

- [https://a.tile.openstreetmap.org/14/13659/6746.png](https://a.tile.openstreetmap.org/14/13659/6746.png)
- [https://b.tile.openstreetmap.org/14/13659/6746.png](https://b.tile.openstreetmap.org/14/13659/6746.png)
- [https://c.tile.openstreetmap.org/14/13659/6746.png](https://c.tile.openstreetmap.org/14/13659/6746.png)

## 常用的概念

### 矢量瓦片

## 其他

- [Tiled web map](https://en.wikipedia.org/wiki/Tiled_web_map)
- [Tile Map Service](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification)
- [tippecanoe](https://github.com/mapbox/tippecanoe)
- [OGC WebGIS 常用服务标准](https://www.cnblogs.com/onsummer/p/16492518.html)
