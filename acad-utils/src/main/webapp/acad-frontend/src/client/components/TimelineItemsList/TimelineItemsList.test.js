import React from 'react';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TimelineItemsList from './TimelineItemsList';

configure({ adapter: new Adapter() });

// Mock components
jest.mock('../TimelineItem/TimelineItem', () => 'mock-timeline-item');

describe('TimelineItemsList', () => {
  let component;
  
  beforeEach(() => {
    component = shallow(
      <TimelineItemsList />
    );
  });

  it(`should be truthy`, () => {
    expect(component).toBeTruthy();
  });

  it(`should render correctly`, () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});

