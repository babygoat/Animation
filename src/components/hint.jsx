import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/css/idle.css';
import { hintMessage } from '../utilities/config/const.config';

export default function Hint(props) {
  const classNames = `${styles.message} ${styles.hintEnter} ${props.state ? styles.hintEnterActive : ''}`;

  return (
    <div id={styles.hint}>
      <p className={classNames}>{hintMessage}</p>
    </div>
  );
}

Hint.propTypes = {
  state: PropTypes.bool.isRequired,
};
