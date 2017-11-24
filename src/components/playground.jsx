import React from 'react';
import keymaster from 'keymaster';
import PropTypes from 'prop-types';
import AnimationContainer from './animationContainer';
import Hint from './hint';
import Animation from '../utilities/animation';
import Timer from '../utilities/timer';
import Player from '../utilities/player';
import {
  Keys,
  KeyMusicUrls,
} from '../utilities/config/keys.config';

const IdleTime = 10000;

export default class PlayGround extends React.Component {
  constructor(props) {
    super(props);

    this.initAnimations = this.initAnimations.bind(this);
    this.initKeyboard = this.initKeyboard.bind(this);
    this.initMusics = this.initMusics.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onMusicLoaded = this.onMusicLoaded.bind(this);
    this.onLoad = props.onLoad;
    this.playAnimation = this.playAnimation.bind(this);
    this.transitionend = this.transitionend.bind(this);
    this.idleDetect = this.idleDetect.bind(this);

    this.timer = new Timer(this.idleDetect, IdleTime);
    this.containerSet = {};

    const animStateSet = {};

    Keys.forEach((key) => {
      animStateSet[key] = 'idle';
    });

    this.state = {
      animStateSet,
      isMusicLoaded: false,
      isIdle: true,
    };
  }

  componentDidMount() {
    this.initKeyboard();
    this.initAnimations();
    this.initMusics();
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      !this.state.isMusicLoaded &&
      nextState.isMusicLoaded &&
      'Animation' !== keymaster.getScope()
    ) {
      keymaster.setScope('Animation');
    }
  }

  componentWillUnmount() {
    keymaster.deleteScope('Animation');
    this.musicHandler.dispose();
    this.animationHandler.destroy();
  }

  onComplete(id) {
    const { animStateSet } = this.state;
    animStateSet[id] = 'animExit';
    this.setState({
      animStateSet,
    });
    this.timer.start();
  }

  onMusicLoaded() {
    this.onLoad();
    this.setState({
      isMusicLoaded: true,
    });
  }

  playAnimation(id) {
    this.timer.stop();

    this.animationHandler.update(id);

    const { animStateSet } = this.state;
    animStateSet[id] = 'animEnter';
    this.setState({
      animStateSet,
      isIdle: false,
    });
  }

  transitionend(event) {
    const { animStateSet } = this.state;
    const { id } = event.target;

    animStateSet[id] = 'idle';
    this.setState({
      animStateSet,
    });
  }

  initAnimations() {
    this.animationHandler = Animation(this.containerSet, this.onComplete);

    Object.keys(this.containerSet).forEach((key) => {
      this.containerSet[key].addEventListener('transitionend', this.transitionEnd);
    });
  }

  initMusics() {
    this.musicHandler = Player(KeyMusicUrls, this.onMusicLoaded);
  }

  idleDetect() {
    if (!this.state.isIdle) {
      this.setState({
        isIdle: !this.state.isIdle,
      });
    }
  }

  initKeyboard() {
    keymaster(Keys.join(', '), 'Animation', this.keyHandler);
  }

  keyHandler(event, handler) {
    if (this.musicHandler.isPlaying()) {
      this.musicHandler.stop();
    }

    this.musicHandler.play(handler.shortcut);
    this.playAnimation(handler.shortcut);
  }

  render() {
    const containerArr = [];

    Keys.forEach((key) => {
      containerArr.push((
        <AnimationContainer
          key={key}
          name={key}
          handler={(el) => { this.containerSet[key] = el; }}
          animState={this.state.animStateSet[key]}
        />));
    });

    return (
      <div>
        <Hint state={this.state.isIdle} />
        {containerArr}
      </div>
    );
  }
}

PlayGround.propTypes = {
  onLoad: PropTypes.func.isRequired,
};
