---
title: Audio
description: Audio
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
---

## API

### Audio 标签

可以使用 HTML 标签 `audio`[^audio] 来播放音乐

```html
<audio src="xx"></audio>
```

- src：音频资源 URL，也可以通过 source[^source] 或者 MediaStream[^MediaStream] 指定资源

  ```html
  <audio>
    <source src="xx" type="audio/mp3"></source>
    <source src="xx" type="audio/ogg"></source>
  </audio>
  ```

- autoplay：是否自动播放，音频会立刻开始加载，并尽快开始播放，不会等待加载完毕
  由于自动播放会破坏用户体验，为了让用户拥有控制权，通常浏览器会提供各种方式禁用自动播放音频功能。通常存在如下规则

  - 音频静音或者音量为 0
  - 用户已存在交互行为，例如点击，触摸，按下按键等等
  - 网站已列入白名单，如果浏览器确定用户经常与媒体互动，这可能会自动发生，也可能通过首选项或其他用户界面功能手动发生
  - 自动播放权限策略被应用于 `<iframe>` 或者其文档上，从而获得了自动播放的权限

  详情可参考[chrome autoplay](https://developer.chrome.com/blog/autoplay/)策略

- controls：是否展示控制面板
- loop：是否循环播放
- muted：是否静音
- currenttime：获取或者设置当前的播放事件，单位秒

### Web Audio API

Web Audio API[^Web_Audio_API] 提供了在 Web 上控制音频的一个非常有效通用的系统，允许开发者来自选音频源，对音频添加特效

Web Audio API 使用户可以在音频上下文（**AudioContext**）中进行音频操作，具有模块化路由的特点。在音频节点上操作进行基础的音频，它们连接在一起构成音频路由图

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/cf0daa8e0ee2b62bb259ef3c0589a6a076a310dc9b8db88478cf22f6250c6a3b.png)

![](https://cdn.jsdelivr.net/gh/yuezm/assets@main/b71ea277793fa8a214749959e184d5503c35b2cb31cdd4d805b6742f784edc1e.png)

HTML 代码

```html
<canvas id="canvas" width="800" height="800"></canvas>

<audio id="audio"></audio>
<button id="play">播放</button>
<button id="stop">暂停</button>
```

Javascript 代码

```js
async function main() {
  const ac = new window.AudioContext();

  // 可以获取audio标签的音频
  // const audioEle = document.querySelector("#audio");
  // const sourceNode = ac.createMediaElementSource(audioEle);

  const play = document.querySelector("#play");
  const stop = document.querySelector("#stop");

  // 音频源
  const source = ac.createBufferSource();
  const buf = await (await fetch("./music.mp3")).arrayBuffer();
  source.buffer = await ac.decodeAudioData(buf);

  // 分析器
  const analyser = ac.createAnalyser();
  analyser.fftSize = 2048;
  const dataArray = new Float32Array(analyser.frequencyBinCount);

  source.connect(analyser);
  analyser.connect(ac.destination);

  play.addEventListener("click", () => {
    source.start();
    draw();
  });

  stop.addEventListener("click", () => {
    source.stop();
  });

  const canvas = document.querySelector("#canvas");
  const canvasCtx = canvas.getContext("2d");

  function draw() {
    requestAnimationFrame(draw);

    //获取实时的频谱信息
    analyser.getFloatFrequencyData(dataArray);

    //绘制频谱
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / analyser.frequencyBinCount;
    let posX = 0;

    for (let i = 0; i < analyser.frequencyBinCount; i++) {
      const barHeight = (dataArray[i] + 140) * 2;
      canvasCtx.fillStyle = "rgb(" + Math.floor(barHeight + 100) + ", 50, 50)";
      canvasCtx.fillRect(
        posX,
        canvas.height - barHeight / 2,
        barWidth,
        barHeight / 2
      );

      posX += barWidth + 1;
    }
  }
}
```

## 参考

[^audio]: [audio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)
[^source]: [source](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source)
[^MediaStream]: [MediaStream](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream)
[^Web_Audio_API]: [Web Audio API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API)
