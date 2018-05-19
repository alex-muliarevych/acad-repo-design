import { createSelector } from 'reselect';

import { getPages } from 'pages/selectors';

const getSchemaView = createSelector(
  getPages,
  (pages) => pages.schemaView
);

export const getSchema = createSelector(
  getSchemaView,
  (schemaView) => schemaView.schema
);
