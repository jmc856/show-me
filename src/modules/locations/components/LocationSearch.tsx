import React, { Component } from 'react';
import { connect } from 'react-redux'

import '../../../App.css';
import { Button, Icon, Input, List } from "semantic-ui-react";

import { Location } from "../types";
import { selectLocation, setLocations } from "../actions";
import { getLocations } from "../../songkick/actions";


const styles = {
 search: {
   width: '100%',
   textAlign: 'center'
 },
  button: {
   margin: 'auto'
  },
  icon: {
   margin: 'auto'
  }
};


interface LocationSearchProps {
    locations: Location[];
    selectLocation: (location: Location) => void;
    selectedLocation: Location;
    setLocations: (locations: Location[]) => void;
}

interface LocationSearchState {
    locationInput: string
}

class LocationSearch extends Component<LocationSearchProps, LocationSearchState> {
  state = {
    locationInput: '',
  };

  _handleCancel = () => {
    this.props.selectLocation(null)
  };

  _handleCityInputClick = async() => {
    const locations = await getLocations(this.state.locationInput);
    this.props.setLocations(locations);
  };

  _handleInputChange = (e: any) => {
    this.setState({ locationInput: e.target.value })
  };

  _handleSelectLocation = (location: Location) => {
    this.props.selectLocation(location);
  };

  _getLocationList = () => {
    if (this.props.selectedLocation) {
      return (
        <List.Item
          style={{fontSize: '20px'}}
          key={'selectedLocation'}>{this.props.selectedLocation.metroArea.displayName}
          <List.Content floated='right'>
            <Button style={styles.button} onClick={this._handleCancel}>
              <Icon style={styles.icon} name='cancel' color='red'/>
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
          style={styles.search}
          id="locationInput"
          placeholder='Search City'
          onChange={this._handleInputChange}
          action={{
            id: "",
            content: "Search",
            onClick: this._handleCityInputClick
          }}
        />
        <List animated divided verticalAlign='middle'>
          { this._getLocationList() }
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
    locations: state.locations,
    selectedLocation: state.selectedLocation,
});

const mapDispatchToProps = (dispatch: any) => ({
    selectLocation: (location: Location) => dispatch(selectLocation(location)),
    setLocations: (locations: Location[]) => dispatch(setLocations(locations)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
