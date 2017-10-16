import React from 'react';
import styles from '../styles/css/loader.css'

export default function Loader(props) {
  const animClass = props.loaded ?
                    styles.fadeExit + ' ' + styles.fadeExitActive : '';

  const classNames = `${styles.loader} ${animClass}`;

  return <div className={classNames}/>
}
