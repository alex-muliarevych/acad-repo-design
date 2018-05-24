import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Line } from 'react-konva';

import Rect from 'components/Rect';

export default class Schema extends React.Component {
  static propTypes = {
    sizeX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    sizeY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    gridStepX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    gridStepY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    boxes: PropTypes.array,
    buildingAreas: PropTypes.array,
    onBoxDragEnd: PropTypes.func,
    onBuildingAreaDragEnd: PropTypes.func,
    onClick: PropTypes.func
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

  onClick = (type) => (event) => {
    this.props.onClick(type, event.target.attrs.id);
    event.cancelBubble = true;
  };

  onClickSchema = this.onClick('schema');
  onClickBuildingArea = this.onClick('buildingArea');
  onClickBox = this.onClick('box');

  render() {
    const { sizeX, sizeY } = this.props;

    return (
      <Stage
        ref={ this.stage }
        width={ sizeX }
        height={ sizeY }
        onClick={ this.onClickSchema }>
        <Layer key='grid'>
          { this.renderGrid() }
        </Layer>
        <Layer key='areas'>
          { 
            this.props.buildingAreas.map(area => (
              <Rect key={ area.id } { ...area }
                onDragEnd={ this.props.onBuildingAreaDragEnd }
                onClick={ this.onClickBuildingArea } />
            ))
          }
        </Layer>
        <Layer key='boxes'>
          { 
            this.props.boxes.map(box => (
              <Rect key={ box.id } { ...box }
                onDragEnd={ this.props.onBoxDragEnd }
                onClick={ this.onClickBox } />
            ))
          }
        </Layer>
      </Stage>
    );
  }
}
