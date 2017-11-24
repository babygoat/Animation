import React from 'react';
import ReactDOM from 'react-dom';
import MobileDetect from 'mobile-detect/mobile-detect.min';
import ModalControl from './components/modalcontrol';

class App extends React.Component {
  constructor(props) {
    super(props);

    const md = new MobileDetect(window.navigator.userAgent);

    /* Check if the current page is browsered by mobile device( phone or tablet ) */
    this.state = { isMobileUI: (md.mobile()) };
  }

  render() {
    const { isMobileUI } = this.state;

    return isMobileUI ? null : <ModalControl />;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
