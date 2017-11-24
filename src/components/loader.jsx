import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/css/loader.css';

export default function Loader(props) {
  const animClass = props.loaded ?
    `${styles.fadeExit} ${styles.fadeExitActive}` : '';

  const classNames = `${styles.loader} ${animClass}`;

  return <div className={classNames} />;
}

Loader.propTypes = {
  loaded: PropTypes.bool.isRequired,
};
