import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader'
import { Switch, Route, Link } from 'react-router-dom';

// Helpers
import BEM from 'helpers/BEM';
import getRouteWithSubRoutes from 'helpers/getRouteWithSubRoutes';

import pageRoute from './Page.route';
import './Page.less';

const bPage = BEM.b('page');

@hot(module)
export default class Page extends React.Component {
  renderMenu() {
    return (
      <header className={ bPage('header') }>
        <Link to='/'
          className={ bPage('header-link') }>
          Home
        </Link>
        <Link to={ '/schema-view' }
          className={ bPage('header-link') }>
          Schema View
        </Link>
      </header>
    );
  }

  renderContent = () => {
    return (
      'Home Page'
    );
  }

  renderChildRoutes() {
    return (
      <Switch>
        <Route exact path={ this.props.route.path } render={ this.renderContent }/>
        { this.props.route.childRoutes.map((route, i) => getRouteWithSubRoutes(route)) }
      </Switch>
    )
  }

  render() {
    return (
      <div className={ bPage('content-wrapper') }>
        { this.renderMenu() }
        <hr />
        <div className={ bPage('content') }>
          { this.renderChildRoutes() }
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  route: PropTypes.object
};
