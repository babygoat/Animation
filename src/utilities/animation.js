import React from 'react';
import PropTypes from 'prop-types';
import bodymovin from 'bodymovin';
import CSSTransition from 'react-transition-group/CSSTransition';
import styles from '../styles/css/idle.css'
import AnimationContainer from '../components/animationContainer';
import {KeyAnimations} from '../utilities/config/keys.config.js';
import Timer from '../utilities/timer.js'

export default class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
    this.updateTriggeredStatus = this.updateTriggeredStatus.bind(this);
    this.idleDetect = this.idleDetect.bind(this);
    this.timer = new Timer(this.idleDetect, 5000);

    const animationArr = KeyAnimations;
    let triggeredArr = {};

    Object.keys(animationArr).map((key) => (
      animationArr[key].forEach((animationData,index,array) => {
        let animationId = key+index.toString();
        Object.assign(triggeredArr, { animationId: false} );
      })
    ));

    this.state = {
      triggered: triggeredArr,
      currentPlaying: '',
      idle: true,
    }
  }

  render() {
    const animationArr = KeyAnimations;

    let containerArr = [];

    Object.keys(animationArr).map((key) => (
      animationArr[key].forEach((animationData,index,array) => {
        let id = key+index.toString();
        containerArr.push(
          <AnimationContainer
            key = {id}
            name = {id}
            triggered = {this.state.triggered[id]}
            animationData = {animationData}
            onComplete = {this.onComplete}
          />
        )
      })
    ));

    return <div>
            {containerArr}
            <div id={styles.hint}>
              <p className={styles.message}>Press Key A to M and turn up your speakers!</p>
            </div>
           </div>;
  }

  componentWillUpdate(nextProps, nextState) {
    let elem = document.getElementById(styles.hint);

    if(nextState.idle) {
      if(!elem.classList.contains(styles.hintEnter)){
        elem.classList.add(styles.hintEnter);
      }
      elem.classList.add(styles.hintEnterActive);
    }
    else {
      elem.classList.remove(styles.hintEnterActive);
    }
  }

  componentWillReceiveProps( nextProps ) {
    const currentKey = nextProps.currentKey;
    const animationData = KeyAnimations;

    if( currentKey ) {
      //Random index to play
      let randIndex = Math.floor( Math.random() * animationData[currentKey].length );
      let id = currentKey + randIndex.toString();

      this.updateTriggeredStatus( id, true );

      this.timer.stop();
      this.setState({
        idle: false,
      });
    }
  }

  idleDetect() {
    console.log('idle');
    this.setState({
      idle: true,
    });
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  updateTriggeredStatus(id, status) {
    let triggered = this.state.triggered;
    triggered[id] = status;

    this.setState(
      triggered: triggered
    );
  }

  onComplete(id) {
    console.log('onComplete');
    this.updateTriggeredStatus(id, false);
    this.timer.start();
  }
}

Animation.propTypes = {
  //options: PropTypes.object.isRequired,
  //height: PropTypes.number,
  //width: PropTypes.number,
  //isStopped: PropTypes.bool,
  //isPaused: PropTypes.bool,
  //speed: PropTypes.number,
  //direction: PropTypes.number,
};
/*
Animation.defaultProps = {
  isStopped: false,
  isPaused: false,
  speed: 1,
};*/
