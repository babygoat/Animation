import React from 'react';
import ReactDOM from 'react-dom';
import key from 'keymaster'
import { Players } from 'tone';
import Animation from '../utilities/animation'
import {Keys, KeyAnimations, KeyMusicUrls} from '../utilities/config/keys.config.js'

export default class PlayGround extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentKey: '', currentAnimation: null, isMusicLoaded: false };
    this.initKeyboard = this.initKeyboard.bind(this);
    this.initMusics   = this.initMusics.bind(this);
    this.keyHandler   = this.keyHandler.bind(this);
    this.onMusicLoaded = this.onMusicLoaded.bind(this);
    this.onLoad = props.onLoad;
  }

  initMusics() {
    this.musicHandler = new Players(KeyMusicUrls, this.onMusicLoaded).toMaster();
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
    const animationArray = KeyAnimations[handler.shortcut];
    const currentAni = animationArray[Math.floor( Math.random() * animationArray.length )];

    console.log(this.musicHandler);

    if( 'started' === this.musicHandler.state ){
      this.musicHandler.stopAll();
    }

    this.musicHandler.get(handler.shortcut).start();

    this.setState({
      currentKey: handler.shortcut,
      currentAnimation: currentAni,
    });
  }

  componentDidMount() {
    this.initKeyboard();
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
  }

  render() {
    const onMusicLoaded = this.state.isMusicLoaded;

    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: this.state.currentAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      } 
    };

    return onMusicLoaded ? (
      <Animation options={defaultOptions}
      />) : null;
  }
}
