import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TimelineItem from './TimelineItem';

describe('TimelineItem', () => {
  let component;

  beforeEach(() => {
    const item = { hour: 1 };

    component = shallow(
      <TimelineItem
        hour={ item.hour }
        activities={ [] } />
    );
  });

  it(`should be truthy`, () => {
    expect(component).toBeTruthy();
  });

  it(`should render correctly`, () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
