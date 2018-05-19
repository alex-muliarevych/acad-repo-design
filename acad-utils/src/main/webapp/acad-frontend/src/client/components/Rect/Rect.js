import React from 'react';
import PropTypes from 'prop-types';
import { Rect as KonvaRect } from 'react-konva';

export default class Rect extends React.Component {
  onClick = (event) => console.log(event);

  onDragEnd = (event) => console.log(event);

  render() {
    const {
      posX,
      posY,
      sizeX,
      sizeY,
      bodyColor,
      borderColor,
      solid
    } = this.props;

    return (
      <KonvaRect
        draggable={ true }
        x={ posX } y={ posY }
        width={ sizeX } height={ sizeY }
        fill={ bodyColor } stroke={ borderColor }
        opacity={ solid ? 1 : .1 }
        onClick={ this.onClick }
        onDragEnd={ this.onDragEnd } />
    );
  }
}

Rect.propTypes = {
  schemaId: PropTypes.number,
  id: PropTypes.number,
  frontSide: PropTypes.string,
  buildingAreaId: PropTypes.number,
  accessPointId: PropTypes.number,
  keepArea: PropTypes.bool,
  text: PropTypes.string,
  posX: PropTypes.number,
  posY: PropTypes.number,
  posZ: PropTypes.number,
  sizeX: PropTypes.number,
  sizeY: PropTypes.number,
  sizeZ: PropTypes.number,
  rows: PropTypes.number,
  cols: PropTypes.number,
  bodyColor: PropTypes.string,
  borderColor: PropTypes.string,
  solid: PropTypes.bool,
  noBins: PropTypes.bool,
  type: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  mark: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
