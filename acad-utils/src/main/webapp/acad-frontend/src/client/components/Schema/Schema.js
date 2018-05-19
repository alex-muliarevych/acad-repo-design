import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Rect, Text } from 'react-konva';

export default class SchemaView extends React.Component {
  static propTypes = {
    sizeX: PropTypes.number,
    sizeY: PropTypes.number,
    gridStepX: PropTypes.number,
    gridStepY: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.stage = React.createRef();
  }

  _renderGrid() {

  }

  render() {
    const { sizeX, sizeY } = this.props;

    return (
      <Stage
        ref={ this.stage }
        width={ sizeX }
        height={ sizeY }>
        <Layer key='boxes'>
          
        </Layer>
        <Layer key='areas'>
          
        </Layer>
      </Stage>
    );
  }
}
