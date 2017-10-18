import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { WindowResizeListener } from 'react-window-resize-listener';
import PlayGround from './playground';
import Loader from './loader';
import styles from '../styles/css/modal.css';

export default class ModalControl extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onResize = this.onResize.bind(this);
    this.state={
      open: true,
      loaded: false,
      inlineStyle: {
            padding: '0px',
            minHeight: '225px',
            minWidth: '400px',
            maxWidth: '100%',
            background: 'pink',
            opacity: '0'
          }
    };
  }

  onResize( width, height ){
    const animRatio = 16/9*1.0;
    const inlineStyle = this.state.inlineStyle;
    let resizeHeight;
    let resizeWidth;

    if( width*1.0/height > animRatio ){
      resizeHeight = height * 0.9;
      resizeWidth = resizeHeight / 0.5625;
    }
    else{
      resizeWidth = width * 0.9;
      resizeHeight = resizeWidth * 0.5625;
    }
    this.setState({
      inlineStyle: {
        ...inlineStyle,
        'width': `${resizeWidth}px`,
        'height': `${resizeHeight}px`,
      }
    });
  }

  onCloseModal() {
    this.setState({
      open: false
    });
  };

  onLoad() {
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
  }

  componentDidMount(){
    this.onResize(window.innerWidth, window.innerHeight);
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
      closeIconClassName: styles.closeIcon,
    };

    return (
      <div>
        <Loader loaded={this.state.loaded}/>
        <WindowResizeListener
          onResize={w => this.onResize(w.windowWidth, w.windowHeight)}
        />
        <Modal {...ModelOptions}>
            <PlayGround onLoad={this.onLoad}/>
        </Modal>
      </div>
    );
  }
}
