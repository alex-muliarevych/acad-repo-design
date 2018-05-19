import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Line } from 'react-konva';

import Rect from 'components/Rect';

export default class SchemaView extends React.Component {
  static propTypes = {
    sizeX: PropTypes.number,
    sizeY: PropTypes.number,
    gridStepX: PropTypes.number,
    gridStepY: PropTypes.number,
    boxes: PropTypes.array,
    buildingAreas: PropTypes.array
  };

  static defaultProps = {
    boxes: [],
    buildingAreas: []
  };

  constructor(props) {
    super(props);
    this.stage = React.createRef();
  }

  renderLine = (type, index) => {
    const { sizeX, sizeY, gridStepX, gridStepY } = this.props;
    const points = type === 'width'
      ? [Math.round(index * gridStepX), 0, Math.round(index * gridStepX), sizeY]
      : [0, Math.round(index * gridStepY), sizeX, Math.round(index * gridStepY)];

    return (
      <Line
        key={ `${type}-${index}` }
        points={ points }
        stroke={ '#ddd' }
        strokeWidth={ .5 } />
    )
  }

  renderGrid() {
    const { sizeX, sizeY, gridStepX, gridStepY } = this.props;
    let horizontalLines = [];
    let verticalLines = [];

    for (let i = 0; i < sizeX / gridStepX; i++) {
      horizontalLines.push(this.renderLine('width', i));
    }

    for (let i = 0; i < sizeY / gridStepY; i++) {
      verticalLines.push(this.renderLine('height', i));
    }

    return [...horizontalLines, ...verticalLines];
  }

  render() {
    const { sizeX, sizeY } = this.props;

    return (
      <Stage
        ref={ this.stage }
        width={ sizeX }
        height={ sizeY }>
        <Layer key='grid'>
          { this.renderGrid() }
        </Layer>
        <Layer key='areas'>
          { 
            this.props.buildingAreas.map(area => (
              <Rect key={ area.id } { ...area } />
            ))
          }
        </Layer>
        <Layer key='boxes'>
          { 
            this.props.boxes.map(box => (
              <Rect key={ box.id } { ...box } />
            ))
          }
        </Layer>
      </Stage>
    );
  }
}
