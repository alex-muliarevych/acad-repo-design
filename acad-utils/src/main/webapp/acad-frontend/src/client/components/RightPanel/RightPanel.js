import React from 'react';

// Helpers
import BEM from 'helpers/BEM';

// Custom components
import TimelineItemsList from 'components/TimelineItemsList';

import Popup from 'components/Popup';
// Styles
import './RightPanel.less';

const bRightPanel = BEM.b('right-panel');

export default class RightPanel extends React.Component {
  render() {
    return (
      <div className={ bRightPanel() } >
        <TimelineItemsList />
      </div>
    );
  }
}
