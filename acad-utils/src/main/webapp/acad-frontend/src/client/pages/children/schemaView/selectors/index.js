import { createSelector } from 'reselect';

import { getSchemaView } from 'pages/selectors';

export const getSchema = createSelector(
  getSchemaView,
  (schemaView) => schemaView.schema
);

export const getBuildingAreas = createSelector(
  getSchemaView,
  (schemaView) => schemaView.buildingAreas
);

export const getBoxes = createSelector(
  getSchemaView,
  (schemaView) => schemaView.boxes
);

export const getBox = (id) => createSelector(
  getBoxes,
  (boxes) => boxes.find(box => box.id === id)
);

export const getBuildingArea = (id) => createSelector(
  getBuildingAreas,
  (buildingAreas) => buildingAreas.find(area => area.id === id)
);
