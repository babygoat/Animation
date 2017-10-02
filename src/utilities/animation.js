import React from 'react';
import PropTypes from 'prop-types';
import bodymovin from 'bodymovin';
import CSSTransition from 'react-transition-group/CSSTransition';
import styles from '../styles/css/idle.css'
import AnimationContainer from '../components/animationContainer';
import {KeyAnimations} from '../utilities/config/keys.config.js';

export default class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
    this.updateTriggeredStatus = this.updateTriggeredStatus.bind(this);
    this.node = null;
    this.name = '';

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

  componentWillReceiveProps( nextProps ) {
    const currentKey = nextProps.currentKey;
    const animationData = KeyAnimations;

    if( currentKey ) {
      //Random index to play
      let randIndex = Math.floor( Math.random() * animationData[currentKey].length );
      let id = currentKey + randIndex.toString();

      this.updateTriggeredStatus( id, true );

      document.getElementById(styles.hint).style.opacity = 0;
    }
  }

  updateTriggeredStatus( id, status) {
    let triggered = this.state.triggered;
    triggered[id] = status;

    this.setState(
      triggered: triggered
    );
  }

  onComplete( id ){
      this.updateTriggeredStatus( id, false );
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
