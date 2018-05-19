import { createSelector } from 'reselect';

import { getPages } from 'pages/selectors';

export const getSchemaView = createSelector(
  getPages,
  (pages) => pages.schemaView
);
