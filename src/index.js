import React from 'react';
import ReactDOM from 'react-dom';
import ModalControl from './components/modal'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state={};
  }

  render(){
    return (
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
