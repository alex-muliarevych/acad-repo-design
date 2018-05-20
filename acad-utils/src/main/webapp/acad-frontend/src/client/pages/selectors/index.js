import { createSelector } from 'reselect';

export const getPages = (state) => state.pages;

export const getSchemaView = createSelector(
  getPages,
  (pages) => pages.schemaView
);
