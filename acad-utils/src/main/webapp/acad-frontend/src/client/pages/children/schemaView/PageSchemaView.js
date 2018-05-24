import React from 'react';
import BEM from 'helpers/BEM';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ColorPicker from 'react-material-color-picker';
import Schema from 'components/Schema';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import {
  getSchema as getSchemaAction,
  saveBox,
  saveBuildingArea,
  saveSchema,
  selectItem
} from './actions';

// Selectors
import { getSchema, getBuildingAreas, getBoxes, getSelectedItemById, getSelectedItemInfo } from './selectors';

import './PageSchemaView.less';

const entityTypes = [
  {
    value: 'DECORE',
    label: 'Decore',
  },
  {
    value: 'UNIQUE',
    label: 'Unique',
  },
  {
    value: 'NONE',
    label: 'None',
  },
  {
    value: 'FORBIDDEN',
    label: 'Forbidden',
  },
  {
    value: null,
    label: 'Default'
  }
];

const bPageSchemaView = BEM.b('page-schema-view');

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getSchema: getSchemaAction,
    saveBox,
    saveBuildingArea,
    saveSchema,
    selectItem
  }, dispatch)
});

const mapStateToProps = (state) => ({
  schema: getSchema(state),
  buildingAreas: getBuildingAreas(state),
  boxes: getBoxes(state),
  selectedItem: getSelectedItemById(state),
  selectedItemInfo: getSelectedItemInfo(state)
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
          onBoxDragEnd={ this.props.actions.saveBox }
          onBuildingAreaDragEnd={ this.props.actions.saveBuildingArea }
          onClick={ this.props.actions.selectItem } />
      </div>
    )
  }

  saveItem = ({ target: { name, value, checked } }) => {
    const { selectedItem, selectedItemInfo, actions } = this.props;
    let payload = { ...selectedItem, [name]: checked || value };

    switch (selectedItemInfo.type) {
      case 'box': return actions.saveBox(payload);
      case 'buildingArea': return actions.saveBuildingArea(payload);
      case 'schema': return actions.saveSchema(payload);
    }
  }

  renderMenuItem = ([key, value]) => {
    let renderValue;

    switch (key) {
      case 'schemaId':
      case 'id':
      case 'buildingAreaId':
      case 'accessPointId':
      case 'keepArea':
        renderValue = null;
        break;

      case 'solid':
      case 'disableDeleting':
        renderValue = (
          <>
            <FormLabel>{ key }</FormLabel>
            <Checkbox
              name={ key }
              checked={ value }
              onChange={ this.saveItem } />
          </>
        );
        break;

      case 'posX':
      case 'posY':
      case 'sizeX':
      case 'sizeY':
      case 'sizeZ':
      case 'gridStepX':
      case 'gridStepY':
      case 'rows':
      case 'cols':
        renderValue = (
          <TextField
            type='number'
            label={ key }
            name={ key }
            value={ value }
            min='0'
            onChange={ this.saveItem } />
        );
        break;

      case 'type':
      case 'mark':
        renderValue = (
          <TextField
            label={ key }
            select
            name={ key }
            value={ value || '' }
            multiline={ key === 'description'}
            onChange={ this.saveItem }>
            {
              entityTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            }
          </TextField>
        );
        break;

      case 'bodyColor':
      case 'borderColor':
        renderValue = (
          <>
            <FormLabel>{ key }</FormLabel>
            <Input
              type='color'
              name={ key }
              value={ value }
              onChange={ this.saveItem } />
          </>
        );
        break;

      default:
        renderValue = (
          <TextField
            label={ key }
            name={ key }
            value={ value || '' }
            multiline={ key === 'description'}
            onChange={ this.saveItem } />
        );
        break;
    }

    return renderValue && (
      <ListItem key={ key }>
        { renderValue }
      </ListItem>
    );
  }

  renderSelectedItemMenu() {
    const { selectedItem } = this.props;

    return selectedItem && (
      <div className={ bPageSchemaView('selected-item') }>
        <List>
          { Object.entries(selectedItem).map(this.renderMenuItem) }
        </List>
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
        { this.props.match.params.schemaId && this.renderSelectedItemMenu() }
      </div>
    );
  }
}
