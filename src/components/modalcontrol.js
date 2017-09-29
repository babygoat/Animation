import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import TransitionGroup from 'react-transition-group/transitiongroup';
import PlayGround from './playground';
import Loader from './loader';

export default class ModalControl extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.state={
      open: true,
      loaded: false,
    };
  }

  onCloseModal() {
    this.setState({
      open: false
    });
  };

  onLoad() {
    console.log('Loader Should dismiss');
    this.setState({
      loaded: true
    });
  }

  render() {
    const { open, loaded } = this.state;

    const inlineStyle = ({
      padding: '0px',
    });

    const ModelOptions = {
      open: open,
      onClose: this.onCloseModal,
      little: true,
      closeOnOverlayClick: false,
      modalStyle: inlineStyle,
      showCloseIcon: loaded,
    };

    return (
      <div>
        <Modal {...ModelOptions}>
          <TransitionGroup>
            <Loader loaded={this.state.loaded}/>
            <PlayGround onLoad={this.onLoad}/>
          </TransitionGroup>
        </Modal>
      </div>
    );
  }
}
