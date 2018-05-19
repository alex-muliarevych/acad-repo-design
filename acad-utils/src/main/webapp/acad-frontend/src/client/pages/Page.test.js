import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import pageRoute from './Page.route';
import getRouteWithSubRoutes from 'helpers/getRouteWithSubRoutes';

configure({ adapter: new Adapter() });

describe('Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        { getRouteWithSubRoutes(pageRoute) }
      </MemoryRouter>
    );
  });

  it('should be truthy', () => {
    expect(wrapper).toBeTruthy();
  });
});
