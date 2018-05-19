import React from 'react';
import Loadable from 'react-loadable';

export default {
  path: "/schema/:schemaId?",
  exact: true,
  title: 'Schema View',
  component: Loadable({
    loader: () => import('./PageSchemaView'),
    loading: () => <div>loading...</div>,
  }),
  childRoutes: []
};
