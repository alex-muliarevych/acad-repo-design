import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

// Helpers
import BEM from 'helpers/BEM';

// Components
import Portal from 'components/Portal';

// Styles
import './Popup.less';

const bPopup = BEM.b('popup');

export default class Popup extends React.Component {
  render() {
    return (
      <CSSTransitionGroup
        transitionName='fade'
        transitionAppear={ true }
        transitionLeave={ true }
        transitionEnter={ true }
        transitionAppearTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
        transitionEnterTimeout={ 500 }>
        { this.props.instance.isOpen && <Portal { ...this.props } /> }
      </CSSTransitionGroup>
    );
  }
}

Popup.propTypes = {
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

Popup.defaultProps = {
  instance: {
    isOpen: false,
    anchor: null,
    open: () => null,
    close: () => null
  },
  onClose: () => null
};
