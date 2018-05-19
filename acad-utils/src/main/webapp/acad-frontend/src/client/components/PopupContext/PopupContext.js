import React from 'react';

// Helpers
import getDisplayName from 'helpers/getDisplayName';

const { Provider, Consumer } = React.createContext('popups-context');

class PopupProvider extends React.Component {
  state = {};

  _setOpenState = (isOpen) => (alias) => this.setState(state => ({
    [alias]: { ...state[alias], isOpen }
  }));

  openPopup = this._setOpenState(true);
  closePopup = this._setOpenState(false);

  registerPortal = (alias, anchor) => {
    this.setState(() => ({
      [alias]: {
        isOpen: false,
        anchor,
        open: () => this.openPopup(alias),
        close: () => this.closePopup(alias)
      }
    }));
  }

  render() {
    return (
      <Provider value={{
        registerPortal: this.registerPortal,
        popups: this.state
      }}>
        { this.props.children }
      </Provider>
    );
  }
}

const consumePopup = (WrappedComponent) => {
  return class PopupConnect extends React.Component {
    static displayName = `ConnectPopup(${getDisplayName(WrappedComponent)})`;

    render() {
      return (
        <Consumer>
          { (context) => <WrappedComponent { ...this.props } { ...context } /> }
        </Consumer>
      );
    }
  }
}

export {
  PopupProvider,
  consumePopup
};
