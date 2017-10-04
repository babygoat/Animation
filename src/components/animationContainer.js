import React from 'react';
import ReactDOM from 'react-dom';
import bodymovin from 'bodymovin';
import styles from '../styles/css/animation.css'

export default class AnimationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
    this.transitionEnd = this.transitionEnd.bind(this);
    this.notifyParentComplete = this.props.onComplete;
    this.state = {
      animState: 'idle'
    }
  }

  transitionEnd(event) {
    if( this.animItem._idle ){
      this.setState({
        animState: 'idle',
      })
    }
  }

  onComplete() {
    this.animItem.stop();
    this.setState({
      animState: 'animExit',
    })
    this.notifyParentComplete(this.animItem.name);
  }

  componentWillUpdate(nextProps,nextState) {
    let elem = this.refs[this.props.name];

    switch(nextState.animState) {
      case 'idle':
        if(elem.classList.contains(styles.animExit)) {
          elem.classList.remove(styles.animExit,styles.animExitActive);
        }
        elem.classList.add(styles.animIdle);
        break;

      case 'animEnter':
        elem.classList.remove(styles.animIdle);
        elem.classList.add(styles.animEnter,styles.animEnterActive);
        break;

      case 'animExit':
        elem.classList.remove(styles.animEnter,styles.animEnterActive);
        elem.classList.add(styles.animExit,styles.animExitActive);
        break;
    }
  }

  componentWillReceiveProps( nextProps ) {
      if( nextProps.triggered ) {
        console.log('Key Triggered!!');
        if( this.animItem._idle ){
          this.animItem.play();
          this.setState({
            animState: 'animEnter',
          })
        }
        else {
          this.animItem.goToAndPlay(0, true, this.animItem.name);
        }
      }
  }

  componentDidMount() {
    const options = {
      renderer: 'svg',
      loop: false,
      autoplay: false,
      container: this.refs[this.props.name],
      animationData: this.props.animationData,
      name: this.props.name,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    this.animItem = bodymovin.registerAnimation(this.refs[this.props.name],null);
    this.animItem.setParams(options);
    this.animItem.addEventListener('complete',this.onComplete);

    let elem = this.refs[this.props.name];
    elem.addEventListener('transitionend', this.transitionEnd);

    this.setState({
      animState: 'idle',
    })
  }

  componentWillUnmount(){
    this.animItem.destroy();
  }

  render() {
    const lottieStyles = {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      margin: '0 auto',
    };

    const classNames = {
      exit: styles.fadeExit,
      exitActive: styles.fadeExitActive
    };

    return <div ref={this.props.name} style={lottieStyles}></div>;
  }
}
