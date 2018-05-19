import React from 'react';
import PropTypes from 'prop-types';

// Custom components
import TimelineItem from 'components/TimelineItem';
import Popup from 'components/Popup';
import { consumePopup } from 'components/PopupContext';

// Helpers
import BEM from 'helpers/BEM';

// Styles
import './TimelineItemsList.less';

const bTimeItems = BEM.b('timeline-list');

@consumePopup
export default class TimelineItemsList extends React.Component {
  state = {
    availableTimeItems: []
  };

  componentDidMount() {
    this.setState({
      availableTimeItems: this.getAvailableTimeItems()
    });
  }

  /**
   * @description
   * On Popup close event callback listener
   * @memberof TimelineItemsList
   */
  onPopupClosedCallback = () => {
    console.log('Popup closed... Callback triggered!');
  }

  /**
   * @todo Change this mock data with redux store handlers
   *
   * @description
   * Creates array of hours for day to display in list for events creation
   *
   * @returns {Array} available hours
   * @memberof TimelineItemsList
   */
  getAvailableTimeItems() {
    const timeItems = [];

    for (let currentHour = 6; currentHour < 24; currentHour++) {
      timeItems.push({
        hour: currentHour
      });
    }

    return timeItems;
  }

  /**
   * @description
   * Renders list of timeline items based on available hours from state
   * @returns {React.Element<TimelineItem>[]} array of timeline items
   * @memberof TimelineItemsList
   */
  renderTimelineHours = () => {
    return (
      this.state.availableTimeItems.map(
        (item) => (
            <TimelineItem
              key={ item.hour }
              hour={ item.hour }>
              {/** @todo: remove this buttons when activities will be implemented
                 * Mock triggers to open popup for test
                 */}
              { [1, 2, 3].map((i) => (
                <button
                  key={ i }
                  onClick={ this.props.popups?.rightPanel.open }>
                  Show popup for activities #{ item.hour } - { i }
                </button>
              ))}
            </TimelineItem>
        ),
      )
    );
  }

  render() {
    return (
      <div className={ bTimeItems() }>
        <h2 className={ bTimeItems('heading') }>
          Today
        </h2>

        { this.renderTimelineHours() }

        <Popup instance={ this.props.popups?.rightPanel } >
          <h1>Right panel popup window</h1>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
        </Popup>
      </div>
    );
  }
}
