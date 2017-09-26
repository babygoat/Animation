import React from 'react';
import ReactDOM from 'react-dom';
import key from 'keymaster'
import Animation from '../utilities/animation'
import {Keys, KeyAnimations} from '../utilities/config/keys.config.js'

export default class PlayGround extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentKey: '', currentAnimation: null };
    this.initKeyboard = this.initKeyboard.bind(this);
    this.keyHandler   = this.keyHandler.bind(this);
  }

  keyHandler(event,handler) {
    const animationArray = KeyAnimations[handler.shortcut];
    const currentAni = animationArray[Math.floor( Math.random() * animationArray.length )];
    this.setState({
      currentKey: handler.shortcut,
      currentAnimation: currentAni
    });
  }

  initKeyboard() {
    key(Keys.join(', '), 'Animation', this.keyHandler);
  }

  componentDidMount() {
    this.initKeyboard();
    key.setScope('Animation');
  }

  componentWillUnmount() {
    key.deleteScope('Animation');
  }

  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: this.state.currentAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <Animation options={defaultOptions}
                 width={400}
                 height={400}
      />
    );
  }
}
