import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import styles from '../styles/css/loader.css'

export default class Loader extends React.Component{
  constructor(props) {
    super(props);
    this.state = { display: !props.loaded };
    this.onExited = this.onExited.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.loaded !== this.props.loaded ) {
      this.setState({
        display: !nextProps.loaded
      });
    }
  }

  onExited() {
    var el = document.getElementById('loader');
    el.classList.remove(styles.loader);
  }

  render(){

    const classNames = {
      exit: styles.fadeExit,
      exitActive: styles.fadeExitActive
    };

    return (
      <CSSTransition
        key={1}
        in={this.state.display}
        classNames={classNames}
        timeout={{exit: 500}}
        onExited={this.onExited}
        >
        <div className={styles.loader} id='loader'/>
      </CSSTransition>
    );
  }
}
