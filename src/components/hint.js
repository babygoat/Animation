import React from 'react';
import styles from '../styles/css/idle.css';
import {hintMessage} from '../utilities/config/const.config'

export default function Hint(props) {

  const classNames = `${styles.message} ${styles.hintEnter} ${props.state ? styles.hintEnterActive : ''}`

  return  <div id={styles.hint}>
            <p className={classNames}>{hintMessage}</p>
          </div>
}
