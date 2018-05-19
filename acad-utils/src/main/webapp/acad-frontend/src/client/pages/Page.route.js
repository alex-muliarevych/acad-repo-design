import React from 'react';
import Loadable from 'react-loadable';

import about from './children/about/PageAbout.route';

export default {
  path: '/',
  component: Loadable({
    loader: () => import('./Page'),
    loading: () => <div>loading...</div>,
  }),
  childRoutes: [
    about
  ]
};
