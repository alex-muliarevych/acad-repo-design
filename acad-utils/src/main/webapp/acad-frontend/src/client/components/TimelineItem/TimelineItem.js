import React from 'react';
import PropTypes from 'prop-types';

// Helpers
import BEM from 'helpers/BEM';
import { getFormattedHour } from 'helpers/DateHelpers';

// Styles
import './TimelineItem.less';

const bTimeItem = BEM.b('timeline-item');

export default class TimelineItem extends React.Component {

  render() {
    return (
      <div className={ bTimeItem() }>
        <span className={ bTimeItem('time-label') }>
          { getFormattedHour(this.props.hour) }
        </span>

        <div className={ bTimeItem('activities') }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

TimelineItem.propTypes = {
  hour: PropTypes.number.isRequired,
  children: PropTypes.any
};

TimelineItem.defaultProps = {
  hour: 0,
};
