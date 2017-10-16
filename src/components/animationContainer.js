import React from 'react';
import styles from '../styles/css/animation.css';

const idleClassName = styles.animIdle;
const EnterClassName = `${styles.animEnter} ${styles.animEnterActive}`;
const ExitClassName = `${styles.animExit} ${styles.animExitActive}`;
const stateMapping = {
  'idle' : idleClassName,
  'animEnter': EnterClassName,
  'animExit': ExitClassName,
};

export default function AnimationContainer(props) {

  const lottieStyles = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    margin: '0 auto',
    position: 'absolute',
  };

  return <div id={props.name} ref={props.handler} className={stateMapping[props.animState]} style={lottieStyles} />
}
