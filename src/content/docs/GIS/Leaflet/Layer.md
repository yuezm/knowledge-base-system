---
title: Layer
description: Layer
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### Layer

Leaflet 基础类，提供了 Map 类之间的基础功能，包括添加和删除 Layer，**Layer 和 Map 之间的事件通信**等等

```ts
export const Layer = Evented.extend({
  addTo(map) {
    map.addLayer(this);
    return this;
  },

  remove() {
    return this.removeFrom(this._map || this._mapToAdd);
  },

  //......

  // 通过 Map.addLayer 和 Layer._layerAdd 将 Map 和 Layer 关联起来
  _layerAdd(e) {
    const map = e.target;

    // check in case layer gets added and then removed before the map is ready
    if (!map.hasLayer(this)) {
      return;
    }

    this._map = map;
    this._zoomAnimated = map._zoomAnimated;

    // 此步骤极为关键，Map 和 Layer 之间的事件绑定，在 Layer 中并未定义 getEvents 方法，但是在子类中，例如 GridLayer 有定义
    if (this.getEvents) {
      const events = this.getEvents();

      map.on(events, this);

      this.once(
        "remove",
        function () {
          map.off(events, this);
        },
        this
      );
    }

    this.onAdd(map);

    this.fire("add");

    map.fire("layeradd", { layer: this });
  },
});
```

向 Map 类加入增加 Layer 的方法，以此管理瓦片地图，例如我们调用 `L.tileLayer("xx").addTo(map);` 就是这一系列方法的调用

```js
Map.include({
  addLayer(layer) {
    // ......

    // 根据唯一ID去重
    const id = Util.stamp(layer);

    if (this._layers[id]) {
      return this;
    }

    this._layers[id] = layer;

    layer._mapToAdd = this;

    // 类似于抽象方法，Layer.js 并未具体声明 beforeAdd 方法
    if (layer.beforeAdd) {
      layer.beforeAdd(this);
    }

    // ......

    // 类似于抽象方法，Layer.js 并未具体定义 _layerAdd 方法，但是在子类中，例如 GridLayer 有定义
    this.whenReady(layer._layerAdd, layer);

    return this;
  },
});
```

### GridLayer

GridLayer 继承自 Layer，顾名思义它是一个网格层，这个已经就接近我们使用瓦片地图的初衷了。有如下作用

1. 管理层级：通过 z-index 来管理 GridLayer 的层级，并提供修改层级的方法
2. 通过 Layer 父级的 Layer.\_layerAdd 及 GridLayer.getEvents 方法，将 Map 和 Layer 事件关联起来，使得操作地图时，对瓦片更新
3. 更新瓦片，提供两种方法进行更新
   1. \_update：根据 center，zoom，地图视口分辨率大小，计算出所需要加载的瓦片并加载
   2. \_setView：当变化过大时，会在执行\_update 同时，以动画的形式平滑缩放

```js
export const GridLayer = Layer.extend({
  getEvents() {
    const events = {
      viewprereset: this._invalidateAll,
      viewreset: this._resetView,

      // 地图缩放
      zoom: this._resetView,

      // 地图拖动
      moveend: this._onMoveEnd,
    };

    // ......

    return events;
  },

  _update(center) {
    // ......

    const pixelBounds = this._getTiledPixelBounds(center);
    const tileRange = this._pxBoundsToTileRange(pixelBounds);

    //......

    const noPruneRange = new Bounds(
      tileRange.getBottomLeft().subtract([margin, -margin]),
      tileRange.getTopRight().add([margin, -margin])
    );

    // 标记不在显示范围的瓦片
    for (const key in this._tiles) {
      if (Object.hasOwn(this._tiles, key)) {
        const c = this._tiles[key].coords;
        if (
          c.z !== this._tileZoom ||
          !noPruneRange.contains(new Point(c.x, c.y))
        ) {
          this._tiles[key].current = false;
        }
      }
    }

    // 计算所需要加载的，在范围内的瓦片
    for (let j = tileRange.min.y; j <= tileRange.max.y; j++) {
      for (let i = tileRange.min.x; i <= tileRange.max.x; i++) {
        const coords = new Point(i, j);

        coords.z = this._tileZoom;

        if (!this._isValidTile(coords)) {
          continue;
        }

        const tile = this._tiles[this._tileCoordsToKey(coords)];

        if (tile) {
          tile.current = true;
        } else {
          queue.push(coords);
        }
      }
    }

    // 从中心向外加载瓦片
    queue.sort((a, b) => a.distanceTo(tileCenter) - b.distanceTo(tileCenter));

    if (queue.length !== 0) {
      // ......

      // 加载万片
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < queue.length; i++) {
        this._addTile(queue[i], fragment);
      }
      this._level.el.appendChild(fragment);
    }
  },

  _setView(center, zoom, noPrune, noUpdate) {},
});
```

### TileLayer

TileLayer 继承自 GridLayer，该类才是我们常用的类。其作用如下

1. 根据提供的 URL 规则，计算出瓦片的 URL，并加载万片

```js
export const TileLayer = GridLayer.extend({
  createTile(coords, done) {
    const tile = document.createElement("img");

    // ...

    // 根据规则去计算加载的URL
    tile.src = this.getTileUrl(coords);

    return tile;
  },
});
```
