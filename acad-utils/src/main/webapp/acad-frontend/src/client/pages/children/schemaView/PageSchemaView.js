import React from 'react';
import BEM from 'helpers/BEM';
import { hot } from 'react-hot-loader';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { getSchema } from './actions';

// Selectors
import { getSchemaView } from './selectors';

const bPageSchemaView = BEM.b('schema-view');

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getSchema }, dispatch)
});

const mapStateToProps = (state) => ({
  schemaView: getSchemaView(state)
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

      </div>
    )
  }

  renderSchema() {
    return (
      <div className={ bPageSchemaView('schema') }>
        
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
