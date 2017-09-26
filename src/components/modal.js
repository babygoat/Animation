import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import {modalStyle} from '../styles/css/modal.css'
import PlayGround from './playground'

export default class ModalControl extends React.Component {
  constructor(props) {
    super(props);
    //this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.state={
      open: true,
    };
  }
  /*
  onOpenModal() {
    this.setState({ open: true });
  };
  */
  onCloseModal() {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} little closeOnOverlayClick={false} modalStyle={modalStyle}>
          <PlayGround />
        </Modal>
      </div>
    );
  }
}
