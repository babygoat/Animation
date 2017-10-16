import React from 'react';
import styles from '../styles/css/idle.css';

export default function Hint(props) {

  const classNames = `${styles.message} ${styles.hintEnter} ${props.state ? styles.hintEnterActive : ''}`

  return  <div id={styles.hint}>
            <p className={classNames}>Press Key A & B and turn up your speakers!</p>
          </div>
}
