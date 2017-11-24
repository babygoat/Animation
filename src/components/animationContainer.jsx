import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/css/animation.css';

const idleClassName = styles.animIdle;
const EnterClassName = `${styles.animEnter} ${styles.animEnterActive}`;
const ExitClassName = `${styles.animExit} ${styles.animExitActive}`;
const stateMapping = {
  idle: idleClassName,
  animEnter: EnterClassName,
  animExit: ExitClassName,
};

export default function AnimationContainer(props) {
  const lottieStyles = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    margin: '0 auto',
    position: 'absolute',
  };

  return (
    <div
      ref={props.handler}
      className={stateMapping[props.animState]}
      style={lottieStyles}
    />
  );
}

AnimationContainer.propTypes = {
  handler: PropTypes.func.isRequired,
  animState: PropTypes.string.isRequired,
};
