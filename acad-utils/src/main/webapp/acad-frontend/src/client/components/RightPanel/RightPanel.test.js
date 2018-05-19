import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import RightPanel from './RightPanel';

// Mock components
jest.mock('../TimelineItemsList/TimelineItemsList', () => 'mock-timeline-item-list');

describe('RightPanel', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <RightPanel />
    );
  });

  it(`should be truthy`, () => {
    expect(component).toBeTruthy();
  });

  it(`should render correctly`, () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});

