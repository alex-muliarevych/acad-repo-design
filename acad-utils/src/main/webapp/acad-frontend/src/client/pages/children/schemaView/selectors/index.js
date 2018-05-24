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

export const getSelectedItemInfo = createSelector(
  getSchemaView,
  (schemaView) => schemaView.selectedItem
);

export const getSelectedItemById = (state) => {
  const { type, id } = getSelectedItemInfo(state);

  switch (type) {
    case 'box': return getBox(id)(state);
    case 'buildingArea': return getBuildingArea(id)(state);
    case 'schema': return getSchema(state);
    default: return null;
  }
}
