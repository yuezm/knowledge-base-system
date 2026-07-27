---
title: Audio
description: Audio
tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 }
status: active
---

## API

Babylon.js 音频播放基于 Web Audio API，如果浏览器不支持 Web Audio API，则无法使用该 API，会播放失败，支持 .mp3, .ogg, .wav, .m4a, .mp4，一般来说，至少支持.mp3 和.wav

### Sound

```ts
const sound = new BABYLON.Sound(
 name: string,
 urlOrArrayBuffer: any,
 scene?: Nullable<Scene>,
 readyToPlayCallback?: Nullable<() => void>, // 可以设置自动播放，例如 () => { sound.play(); }，和autoplay效果相同
 options?: ISoundOptions)
);

// ISoundOptions
{
  autoplay?: boolean, // 是否自动播放
  playbackRate?: number; // 播放速度
  volume?: number, // 音量
  loop?: boolean;

  // 3D音效
  spatialSound?: boolean, // 空间音效
  distanceModel?: string，, // "exponential",
  rolloffFactor?: number,
}


// 设置声音的位置
sound.setPosition(new BABYLON.Vector3(100, 0, 0));

// 设置声音的位置跟随Box而移动
sound.attachToMesh(box);

// 设置耳朵听的位置
scene.audioListenerPositionProvider = () => {
  return new BABYLON.Vector3(0, 0, 10);
};

// 全局音量
BABYLON.Engine.audioEngine.setGlobalVolume(0.5);

```

#### 自动播放

Web 针对音频的自动播放限制，必须由人为操作后，才可以播放

可以显示用户解除静音按钮

```ts
// 用户解除静音按钮
BABYLON.Engine.audioEngine!.useCustomUnlockedButton = true;
```

也可以监听用户事件，手动解除

```ts
window.addEventListener(
  "click",
  () => {
    BABYLON.Engine.audioEngine!.unlock();
  },
  { once: true }
);
```

### SoundTrack

```ts
// 可以统一的管理音频
const soundTrack = new BABYLON.SoundTrack(scene?: Scene);

soundTrack.addSound(sound);
```

### Analyser

借助 [Web Audio API](/javascript/audio/#web-audio-api) 可以分析音频

```ts
const myAnalyser = new BABYLON.Analyser(scene);

// 分析所有播放的音频
BABYLON.Engine.audioEngine!.connectToAnalyser(myAnalyser);

// 分析某个track的音频
soundTrack.connectToAnalyser(myAnalyser);

myAnalyser.drawDebugCanvas();
```

## 参考

- [DeepDive audio](https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic)
