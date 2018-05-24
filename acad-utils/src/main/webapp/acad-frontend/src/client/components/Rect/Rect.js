import React from 'react';
import PropTypes from 'prop-types';
import { Rect as KonvaRect } from 'react-konva';

export default class Rect extends React.Component {
  onMouseOver = () => document.body.style.cursor = 'move';
  onMouseLeave = () => document.body.style.cursor = 'default';

  render() {
    const {
      id,
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
        id={ id }
        draggable={ true }
        x={ posX } y={ posY }
        width={ sizeX } height={ sizeY }
        fill={ bodyColor } stroke={ borderColor }
        opacity={ solid ? 1 : .1 }
        onClick={ this.props.onClick }
        onDragStart={ this.props.onDragStart }
        onDragEnd={ this.props.onDragEnd }
        onMouseOver={ this.onMouseOver }
        onMouseLeave={ this.onMouseLeave } />
    );
  }
}

Rect.propTypes = {
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  schemaId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  frontSide: PropTypes.string,
  buildingAreaId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  accessPointId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  keepArea: PropTypes.bool,
  text: PropTypes.string,
  posX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  posY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  posZ: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sizeX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sizeY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sizeZ: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bodyColor: PropTypes.string,
  borderColor: PropTypes.string,
  solid: PropTypes.bool,
  noBins: PropTypes.bool,
  type: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  mark: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
