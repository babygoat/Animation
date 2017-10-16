import {Howl} from 'howler';
import {Keys} from './config/keys.config.js';

export default function Players(audioUrls,onLoadHandler) {
  let audioPlayerManager = [];
  let currentPlay = '';

  const initAudioPlayer = () => {
    const urls = audioUrls;
    let counter = 0;

    for ( let key in urls) {
      if(urls.hasOwnProperty(key)){
        let params = { src: [urls[key]]};
        counter++;
          if ( counter === Keys.length ){
            params['onload'] = onLoadHandler;
          }
        audioPlayerManager[key] = new Howl(params);
      }
    }
  }

  const isPlaying = () => {
    return currentPlay? audioPlayerManager[currentPlay].playing() : false;
  }

  const dispose = () => {
    for (let key in audioPlayerManager){
      if(audioPlayerManager.hasOwnProperty(key)){
        audioPlayerManager[key].unload();
      }
    }
  }

  const stop = () => {
    audioPlayerManager[currentPlay].stop();
    currentPlay = '';
  }

  const play = (id) => {
    audioPlayerManager[id].play();
    currentPlay = id;
  }

  initAudioPlayer();

  return {
    isPlaying,
    stop,
    play,
    dispose
  };
}
