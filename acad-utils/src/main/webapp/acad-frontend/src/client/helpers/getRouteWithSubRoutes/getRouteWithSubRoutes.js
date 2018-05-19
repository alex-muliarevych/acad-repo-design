import React from 'react';
import { Route } from "react-router-dom";

const getRouteWithSubRoutes = route => (
  <Route
    key={ route.path }
    path={ route.path }
    exact={ !!route.exact }
    render={
      (props) => (
        <route.component
          { ...props }
          route={ route } />
      )
    } />
);

export default getRouteWithSubRoutes;
