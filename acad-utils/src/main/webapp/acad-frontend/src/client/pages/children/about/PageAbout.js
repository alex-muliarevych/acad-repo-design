import React from 'react';

// Custom components
import Popup from 'components/Popup';
import { consumePopup } from 'components/PopupContext';

@consumePopup
export default class PageAbout extends React.Component {
  render() {
    return (
      <>
        <div>About Page</div>

        {/**
           * @todo Remove example popup tiggers
           * Example triggers to show popups on layout
           */}
        <div style={{display: 'flex', flexDirection: 'column', padding: '200px'}}>
          <button onClick={ this.props.popups?.leftPanel.open }>Open left panel popup</button>
          <button onClick={ this.props.popups?.root.open }>Open app root popup</button>
        </div>

        <Popup instance={ this.props.popups?.leftPanel } >
          <h1>Left panel popup window</h1>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
        </Popup>

        <Popup instance={ this.props.popups?.root } >
          <h1>App main popup window</h1>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
        </Popup>
      </>
    );
  }
}
