import React from 'react';
import Loadable from 'react-loadable';

import schemaView from './children/schemaView/PageSchemaView.route';

export default {
  path: '/',
  component: Loadable({
    loader: () => import('./Page'),
    loading: () => <div>loading...</div>,
  }),
  childRoutes: [
    schemaView
  ]
};
