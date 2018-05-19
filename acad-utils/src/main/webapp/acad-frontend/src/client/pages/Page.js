import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader'
import { Switch, Route, Link } from 'react-router-dom';

// Helpers
import BEM from 'helpers/BEM';
import getRouteWithSubRoutes from 'helpers/getRouteWithSubRoutes';

// Custom components
import RightPanel from 'components/RightPanel';
import { consumePopup } from 'components/PopupContext';

import pageRoute from './Page.route';
import './Page.less';

const bPage = BEM.b('page');

@hot(module)
@consumePopup
export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.rootAnchor = createRef();
    this.leftPanelAnchor = createRef();
    this.rightPanelAnchor = createRef();
  }

  componentDidMount() {
    const { registerPortal } = this.props;

    registerPortal('root', this.rootAnchor);
    registerPortal('leftPanel', this.leftPanelAnchor);
    registerPortal('rightPanel', this.rightPanelAnchor);
  }

  componentDidCatch(error) {
    console.error(error);
  }

  renderMenu() {
    return (
      <header className={ bPage('header') }>
        <Link to='/'
          className={ bPage('header-link') }>
          Home
        </Link>
        <Link to='/about'
          className={ bPage('header-link') }>
          About
        </Link>
      </header>
    );
  }

  renderContent() {
    return (
      <div className={ bPage('content') }>
        Home Page
      </div>
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

  renderLeftPanel() {
    return (
      <div className={ bPage('left-panel-wrapper') } >
        <div className={ bPage('left-panel-content') }>
          { this.renderMenu() }
          { this.renderChildRoutes() }
        </div>

        <div ref={ this.leftPanelAnchor } />
      </div>
    );
  }

  renderRightPanel() {
    return (
      <div className={ bPage('right-panel-wrapper') }>
        <RightPanel />

        <div ref={ this.rightPanelAnchor } />
      </div>
    );
  }

  render() {
    return (
      <div className={ bPage('content-wrapper') }>
        <div className={ bPage() } >
          { this.renderLeftPanel() }

          { this.renderRightPanel() }
        </div>

        <div ref={ this.rootAnchor } />
      </div>
    );
  }
}

Page.propTypes = {
  route: PropTypes.object
};
