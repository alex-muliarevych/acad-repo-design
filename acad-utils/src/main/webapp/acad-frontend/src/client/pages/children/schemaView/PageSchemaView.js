import React from 'react';
import BEM from 'helpers/BEM';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

import Schema from 'components/Schema';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { getSchema as getSchemaAction, saveBox } from './actions';

// Selectors
import { getSchema, getBuildingAreas, getBoxes } from './selectors';

const bPageSchemaView = BEM.b('schema-view');

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getSchema: getSchemaAction,
    saveBox
  }, dispatch)
});

const mapStateToProps = (state) => ({
  schema: getSchema(state),
  buildingAreas: getBuildingAreas(state),
  boxes: getBoxes(state)
});

@hot(module)
@connect(mapStateToProps, mapDispatchToProps)
export default class PageSchemaView extends React.Component {
  componentDidMount() {
    const { match } = this.props;

    if (!!match.params.schemaId) {
      this.props.actions.getSchema(match.params.schemaId);
    }
  }

  componentWillReceiveProps({ match }) {
    if (!!match.params.schemaId && match.params.schemaId !== this.props.match.params.schemaId) {
      this.props.actions.getSchema(match.params.schemaId);
    }
  }

  componentDidCatch(err) {
    console.error(err);
  }

  renderMenu() {
    return (
      <div className={ bPageSchemaView('menu') }>
        <Link to='/schema/1'>
          Schema 1
        </Link>
      </div>
    )
  }

  renderSchema() {
    return (
      <div className={ bPageSchemaView('schema') }>
        <Schema { ...this.props.schema }
          boxes={ this.props.boxes }
          buildingAreas={ this.props.buildingAreas }
          onBoxDragEnd={ this.props.actions.saveBox } />
      </div>
    )
  }

  render() {
    return (
      <div className={ bPageSchemaView() }>
        {
          this.props.match.params.schemaId
            ? this.renderSchema()
            : this.renderMenu()
        }
      </div>
    );
  }
}
