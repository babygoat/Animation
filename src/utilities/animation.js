import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/css/idle.css'
import AnimationContainer from '../components/animationContainer';
import {KeyAnimationUrls} from '../utilities/config/keys.config.js';
import Timer from '../utilities/timer.js'

export default class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
    this.updateTriggeredStatus = this.updateTriggeredStatus.bind(this);
    this.idleDetect = this.idleDetect.bind(this);
    this.toggleHint = this.toggleHint.bind(this);
    this.timer = new Timer(this.idleDetect, 5000);

    const animationArr = KeyAnimationUrls;
    let triggeredArr = {};

    Object.keys(animationArr).map((key) => (
      animationArr[key].forEach((animationUrl,index,array) => {
        let animationId = key+index.toString();
        triggeredArr[animationId] = false;
      })
    ));

    this.state = {
      triggered: triggeredArr,
      currentPlaying: '',
      idle: true,
    }
  }

  render() {
    const animationArr = KeyAnimationUrls;

    let containerArr = [];

    Object.keys(animationArr).map((key) => (
      animationArr[key].forEach((animationUrl,index,array) => {
        let id = key+index.toString();
        containerArr.push(
          <AnimationContainer
            key = {id}
            name = {id}
            triggered = {this.state.triggered[id]}
            animationUrl = {animationUrl}
            onComplete = {this.onComplete}
          />
        )
      })
    ));

    return <div>
            {containerArr}
            <div id={styles.hint}>
              <p className={styles.message}>Press Key A & B and turn up your speakers!</p>
            </div>
           </div>;
  }

  componentDidMount() {
    this.toggleHint(this.state.idle);
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.idle !== nextState.idle){
      this.toggleHint(nextState.idle);
    }
  }

  componentWillReceiveProps( nextProps ) {
    const currentKey = nextProps.currentKey;
    const animationUrl = KeyAnimationUrls;

    if( currentKey ) {
      //Random index to play
      let randIndex = Math.floor( Math.random() * animationUrl[currentKey].length );
      let id = currentKey + randIndex.toString();

      this.updateTriggeredStatus( id, true );

      this.timer.stop();

      if(this.state.idle) {
        this.setState({
          idle: false,
        });
      }
    }
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  idleDetect() {
    console.log('idle');
    this.setState({
      idle: true,
    });
    this.timer.stop();
  }

  toggleHint( idle ){
    let elem = document.getElementById(styles.hint);

    if(idle) {
      if(!elem.classList.contains(styles.hintEnter)){
        elem.classList.add(styles.hintEnter);
      }
      elem.classList.add(styles.hintEnterActive);
    }
    else {
      elem.classList.remove(styles.hintEnterActive);
    }
  }

  updateTriggeredStatus(id, status) {
    let triggered = this.state.triggered;
    let newState  = {};

    if(status) {
      if(this.state.currentPlaying !== id){
        triggered[this.state.currentPlaying] = false;
        Object.assign(newState,{currentPlaying: id})
      }
    }

    triggered[id] = status;
    Object.assign(newState,{triggered: triggered});
    console.log(newState);
    this.setState(newState);
  }

  onComplete(id) {
    console.log('onComplete');
    this.updateTriggeredStatus(id, false);
    this.timer.start();
  }
}

Animation.propTypes = {
  currentKey: PropTypes.String,
}

Animation.defaultProps = {
  currentKey: '',
}
