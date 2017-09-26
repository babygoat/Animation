import React from 'react';
import ReactDOM from 'react-dom';
import ModalControl from './components/modal';
import MobileDetect from 'mobile-detect/mobile-detect.min.js';

class App extends React.Component{
  constructor(props) {
    super(props);

    var md = new MobileDetect(window.navigator.userAgent);

    /* Check if the current page is browsered by mobile device( phone or tablet ) */
    this.state = { isMobileUI: ( md.mobile() ) };
  }

  render(){
    const { isMobileUI } = this.state;

    return isMobileUI ? NULL: (
      <div>
        <ModalControl />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
