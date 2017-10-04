import React from 'react';
import ReactDOM from 'react-dom';
import key from 'keymaster'
import { Players } from 'tone';
import CSSTransition from 'react-transition-group/CSSTransition';
import Animation from '../utilities/animation';
import {Keys, KeyMusicUrls} from '../utilities/config/keys.config.js';
import styles from '../styles/css/idle.css';

export default class PlayGround extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentKey: '',
      isMusicLoaded: false
     };

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
    if( 'started' === this.musicHandler.state ){
      this.musicHandler.stopAll();
    }

    this.musicHandler.get(handler.shortcut).start();

    this.setState({
      currentKey: handler.shortcut,
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
    this.musicHandler.dispose();
  }

  render() {
    console.log( 'Key pass to animation: ' + this.state.currentKey );
    return <Animation currentKey={this.state.currentKey} />;
  }
}
