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
      inlineStyle: {
            padding: '0px',
            minHeight: '450px',
            minWidth: '800px',
            background: 'pink',
            opacity: '0'
          }
    };
  }

  onCloseModal() {
    this.setState({
      open: false
    });
  };

  onLoad() {
    console.log('Loader Should dismiss');
    let inlineStyle = this.state.inlineStyle;

    inlineStyle = {
      ...inlineStyle,
      opacity: 1,
      transition: 'opacity 2s ease-in'
    };

    this.setState({
      loaded: true,
      inlineStyle: inlineStyle
    });

    console.log(inlineStyle);
  }

  render() {
    const { open, loaded } = this.state;

    const ModelOptions = {
      open: open,
      onClose: this.onCloseModal,
      little: true,
      closeOnOverlayClick: false,
      modalStyle: this.state.inlineStyle,
      showCloseIcon: loaded,
    };

    return (
      <TransitionGroup>
        <Loader loaded={this.state.loaded}/>
        <Modal {...ModelOptions}>
            <PlayGround onLoad={this.onLoad}/>
        </Modal>
      </TransitionGroup>
    );
  }
}
