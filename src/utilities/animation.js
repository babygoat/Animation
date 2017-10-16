'use strict';
import bodymovin from 'bodymovin/build/player/bodymovin.min.js';
import {KeyAnimationUrls} from '../utilities/config/keys.config.js';

export default function Animation( containerSet, notifyParentComplete ) {
  const KeyAnimationHandlers = {};
  const refContainerSet = containerSet;
  let  playId = '';

  const onComplete = () => {
    KeyAnimationHandlers[playId].stop();
    notifyParentComplete(playId);
    playId = '';
  }

  const initAnimationItems = () => {
    const animationArr = KeyAnimationUrls;
    const refContainerSet = containerSet;

    let options = {
      renderer: 'svg',
      loop: false,
      autoplay: false,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    Object.keys(animationArr).map((key) => (
      animationArr[key].forEach((animationUrl,index,array) => {
        options = {
          ...options,
          container: refContainerSet[key],
          path: animationUrl,
          name: key,
        };

        let animItem = bodymovin.registerAnimation(refContainerSet[key],null);
        animItem.setParams(options);
        animItem.addEventListener('complete',onComplete);
        KeyAnimationHandlers[key] = animItem;
      })
    ));
  }

  const updatePlayAnimation = (nextId) => {
    const nextAnimItem = KeyAnimationHandlers[nextId];

    if( playId ){
      if(playId === nextId) {
        nextAnimItem.goToAndPlay(0, true, nextAnimItem.name);
      }
      else {
        const curAnimItem = KeyAnimationHandlers[playId];
        curAnimItem.stop();
        onComplete();
        nextAnimItem.play();
      }
    }
    else {
      nextAnimItem.play();
    }

    playId = nextId;
  }

  const destroyAnimation = () => {
    for( let animItem of Object.values(KeyAnimationHandlers) ){
      animItem.destroy();
    }
  }

  initAnimationItems();

  return {
    KeyAnimationHandlers,
    updatePlayAnimation,
    destroyAnimation,
  };
}
