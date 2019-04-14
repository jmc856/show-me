import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions'

import '../../../App.css';

import { Button, Icon, Input, List } from "semantic-ui-react";

import {
  getLocations,
} from "../actions";

class LocationSearch extends Component {
  state = {
    cityInput: '',
  };

  _handleCancel = () => {
    this.props.actions.selectLocation(null)
  };

  _handleCityInputClick = async() => {
    const locations = await getLocations(this.state.cityInput);
    this.props.actions.setLocations(locations);
  };

  _handleInputChange = (e) => {
    this.setState({
      [e.currentTarget.id]: e.target.value,
    })
  };

  _handleSelectLocation = (location) => {
    this.props.actions.selectLocation(location);
  };

  _getLocationList = () => {
    if (this.props.selectedLocation) {
      return (
        <List.Item
          style={{fontSize: '20px'}}
          key={'selectedLocation'}>{this.props.selectedLocation.metroArea.displayName}
          <List.Content floated='right'>
            <Button onClick={this._handleCancel}>
              <Icon name='cancel' color='red'/>
            </Button>
          </List.Content>
        </List.Item>
      )
    } else if (this.props.locations) {
      return this.props.locations.map((location, i) => {
          const name = location.metroArea.displayName;
          const state = location.metroArea.state.displayName;
          return (
            <List.Item
              style={{fontSize: '20px'}}
              key={i}
              onClick={() => this._handleSelectLocation(location)}>{name}, {state}
              <List.Content floated='right'>
                <Button primary>Select</Button>
              </List.Content>
            </List.Item>
          )
      })
    }
  };

  render() {
    return (
      <div>
        <Input
          id="cityInput"
          placeholder='Search City'
          onChange={this._handleInputChange}
          action={{
            id: "",
            content: "Search",
            onClick: this._handleCityInputClick
          }}
        />
        <List>
          { this._getLocationList() }
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      locations: state.locations,
      selectedLocation: state.selectedLocation,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
