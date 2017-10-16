import React from 'react';
import ReactDOM from 'react-dom';
import key from 'keymaster'
import AnimationContainer from './animationContainer';
import Hint from './hint';
import Animation from '../utilities/animation';
import Timer from '../utilities/timer';
import Player from '../utilities/Player';
import {Keys, KeyMusicUrls} from '../utilities/config/keys.config.js';

const IdleTime = 10000;

export default class PlayGround extends React.Component {
  constructor(props) {
    super(props);

    this.initAnimations = this.initAnimations.bind(this);
    this.initKeyboard = this.initKeyboard.bind(this);
    this.initMusics   = this.initMusics.bind(this);
    this.keyHandler   = this.keyHandler.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onMusicLoaded = this.onMusicLoaded.bind(this);
    this.onLoad = props.onLoad;
    this.playAnimation = this.playAnimation.bind(this);
    this.transitionend = this.transitionend.bind(this);
    this.idleDetect = this.idleDetect.bind(this);

    this.timer = new Timer(this.idleDetect, IdleTime);
    this.containerSet = {};

    let animStateSet = {}

    for( let key of Keys ) {
      animStateSet[key] = 'idle';
    }

    this.state = {
      animStateSet: animStateSet,
      isMusicLoaded: false,
      isIdle: true,
     };
  }

  idleDetect() {
    if( !this.state.isIdle ) {
      this.setState({
        isIdle: !this.state.isIdle
      })
    }
  }

  transitionend(event){
    let animStateSet = this.state.animStateSet;
    const id = event.target.id;

    animStateSet[id]='idle';
    this.setState({
      animStateSet: animStateSet,
    });
  }

  playAnimation(id) {
    this.timer.stop();

    this.animationHandler.updatePlayAnimation(id);

    let animStateSet = this.state.animStateSet;
    animStateSet[id] = 'animEnter';
    this.setState({
      animStateSet: animStateSet,
      isIdle: false,
    });
  }

  onComplete(id) {
    const animStateSet = this.state.animStateSet;
    animStateSet[id] = 'animExit';
    this.setState({
      animStateSet: animStateSet,
    });
    this.timer.start();
  }

  initAnimations() {
    this.animationHandler = Animation(this.containerSet, this.onComplete);

    Object.keys(this.containerSet).forEach((key) => {
      this.containerSet[key].addEventListener('transitionend', this.transitionEnd);
    })
  }

  initMusics() {
    this.musicHandler = Player(KeyMusicUrls, this.onMusicLoaded);
  }

  onMusicLoaded(){
    this.onLoad();
    this.setState({
      isMusicLoaded: true,
    });
  }

  initKeyboard() {
    key(Keys.join(', '), 'Animation', this.keyHandler);
  }

  keyHandler(event,handler) {
    if(this.musicHandler.isPlaying()){
      this.musicHandler.stop();
    }

    this.musicHandler.play(handler.shortcut);
    this.playAnimation(handler.shortcut);
  }

  componentDidMount() {
    this.initKeyboard();
    this.initAnimations();
    this.initMusics();
  }

  componentWillUpdate(nextProps, nextState){
    const isMusicLoaded = nextState.isMusicLoaded;
    if(isMusicLoaded && 'Animation' != key.getScope()){
      key.setScope('Animation');
    }
  }

  componentWillUnmount() {
    key.deleteScope('Animation');
    this.musicHandler.dispose();
    this.animationHandler.destroyAnimation();
  }

  render() {
    let containerArr = [];

    Keys.forEach( key => {
      containerArr.push(
        <AnimationContainer
          key = {key}
          name = {key}
          handler = {el => { this.containerSet[key] = el }}
          animState = {this.state.animStateSet[key]}
        />
      )
    });

    return (
      <div>
        <Hint state={this.state.isIdle} />
        {containerArr}
      </div>
    )
  }
}
