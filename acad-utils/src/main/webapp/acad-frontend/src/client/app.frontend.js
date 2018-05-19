import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import getRouteWithSubRoutes from 'helpers/getRouteWithSubRoutes';
import pageRoute from './pages/Page.route';

import { PopupProvider } from 'components/PopupContext';

import store from './store';

import './app.frontend.less';

const App = (props) => (
  <Provider store={ store }>
    <PopupProvider>
      <Router>
        { getRouteWithSubRoutes(pageRoute) }
      </Router>
    </PopupProvider>
  </Provider>
);

render(<App />, document.querySelector('#app-container'));
