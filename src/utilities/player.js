import { Howl } from 'howler';
import { Keys } from './config/keys.config';

export default function Players(audioUrls, onLoadHandler) {
  const audioPlayerManager = [];
  let currentPlay = '';

  const init = function initAudioPlayer() {
    const urls = audioUrls;
    let counter = 0;

    Object.keys(urls).forEach((key) => {
      const params = { src: [urls[key]] };
      counter += 1;
      if (counter === Keys.length) {
        params.onload = onLoadHandler;
      }
      audioPlayerManager[key] = new Howl(params);
    });
  };

  const isPlaying = function audioIsPlaying() {
    return currentPlay ? audioPlayerManager[currentPlay].playing() : false;
  };

  const dispose = function unloadAudioPlayer() {
    Object.keys(audioPlayerManager).forEach((key) => {
      audioPlayerManager[key].unload();
    });
  };

  const stop = function audioStop() {
    audioPlayerManager[currentPlay].stop();
    currentPlay = '';
  };

  const play = function audioPlay(id) {
    audioPlayerManager[id].play();
    currentPlay = id;
  };

  init();

  return {
    isPlaying,
    stop,
    play,
    dispose,
  };
}
