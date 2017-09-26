import React from 'react';
import ReactDOM from 'react-dom';
import Animation from '../utilities/animation'
import * as animationData from '../assets/test.json'

export default class PlayGround extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <Animation options={defaultOptions}/>
    );
  }
}
