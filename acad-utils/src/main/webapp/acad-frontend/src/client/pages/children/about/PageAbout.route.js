import React from 'react';
import Loadable from 'react-loadable';

export default {
  path: "/about",
  exact: true,
  component: Loadable({
    loader: () => import('./PageAbout'),
    loading: () => <div>loading...</div>,
  }),
  childRoutes: []
};
