import bodymovin from 'bodymovin/build/player/bodymovin.min';
import { KeyAnimationUrls } from '../utilities/config/keys.config';

export default function Animation(containerSet, notifyParentComplete) {
  const KeyAnimationHandlers = {};
  let playId = '';

  const onComplete = function onCompleteHandler() {
    KeyAnimationHandlers[playId].stop();
    notifyParentComplete(playId);
    playId = '';
  };

  const initItems = function initAnimationItems() {
    const animationArr = KeyAnimationUrls;
    const refContainerSet = containerSet;

    let options = {
      renderer: 'svg',
      loop: false,
      autoplay: false,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    Object.keys(animationArr).forEach((key) => {
      const animationUrl = animationArr[key];

      options = {
        ...options,
        container: refContainerSet[key],
        path: animationUrl,
        name: key,
      };

      const animItem = bodymovin.registerAnimation(refContainerSet[key], null);
      animItem.setParams(options);
      animItem.addEventListener('complete', onComplete);
      KeyAnimationHandlers[key] = animItem;
    });
  };

  const update = function updatePlayAnimation(nextId) {
    const nextAnimItem = KeyAnimationHandlers[nextId];

    if (playId) {
      if (playId === nextId) {
        nextAnimItem.goToAndPlay(0, true, nextAnimItem.name);
      } else {
        const curAnimItem = KeyAnimationHandlers[playId];
        curAnimItem.stop();
        onComplete();
        nextAnimItem.play();
      }
    } else {
      nextAnimItem.play();
    }

    playId = nextId;
  };

  const destroy = function destroyAnimation() {
    Object.keys(KeyAnimationHandlers).forEach((key) => {
      KeyAnimationHandlers[key].destory();
    });
  };

  initItems();

  return {
    KeyAnimationHandlers,
    update,
    destroy,
  };
}
