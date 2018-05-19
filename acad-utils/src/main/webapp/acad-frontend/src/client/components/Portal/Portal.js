import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// Helpers
import BEM from 'helpers/BEM';

// Constants
import KEYCODES from 'constants/keycodes';

// Styles
import './Portal.less';

const bPortal = BEM.b('portal');

export default class Portal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('click', this.handleOutsideMouseClick);
  }

  componentWillUnmount() {
    this.props.onClose();

    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('click', this.handleOutsideMouseClick);
  }

    /**
   * @description
   * Removes popup from defined portal root HTML node
   * when mouse click was performed on portal mask layer
   * @memberof Popup
   */
  handleOutsideMouseClick = (e) => {
    if (e.target === this.refs.wrapper) {
      this.closePopup();
    }
  }

  /**
   * @description
   * Removes popup from defined portal root HTML node
   * when ESC key was pressed
   * @memberof Popup
   */
  handleKeydown = (e) => {
    if (e.keyCode === KEYCODES.ESCAPE) {
      this.closePopup();
    }
  }

  closePopup = () => {
    this.props.instance.close();
  }

  render() {
    return ReactDOM.createPortal((
        <div
          ref='wrapper'
          className={ bPortal('wrapper') }>
          <button
            className={ bPortal('cancel-button') }
            onClick={ this.closePopup } >
            Esc X
          </button>

          <div
            className={ bPortal() } >
            { this.props.children }
          </div>
        </div>
      ),
      this.props.instance.anchor?.current
    );
  }
}

Portal.propTypes = {
  instance: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    anchor: PropTypes.shape({
      current: PropTypes.instanceOf(HTMLElement).isRequired
    }),
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  }).isRequired,
  onClose: PropTypes.func
};
