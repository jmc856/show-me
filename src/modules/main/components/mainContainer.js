import React, { Component } from 'react';
import '../../../App.css';

import {Header, Menu} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import ArtistSearch from './artistSearch';
import ConcertView from './concertView';
import LocationSearch from './locationSearch'
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions";
import {connect} from "react-redux";


class MainContainer extends Component {

  handleItemClick = (e, { name }) => {
    this.props.actions.setActiveTab(name);
  };

  reset = () => {
    this.props.actions.resetProps()
  };

    showMenuItem() {
      const canClickArtists = Boolean(this.props.selectedLocation);
      const canClickConcerts = Boolean(this.props.selectedLocation && this.props.selectedArtist);
      return (
        <Menu stackable>
          {/*<Menu.Item>*/}
            {/*<img src='https://commons.wikimedia.org/wiki/File:Something_He_Can_Feel_by_Aretha_Franklin_US_vinyl.png'/>*/}
          {/*</Menu.Item>*/}

          <Menu.Item
            name='location'
            active={true}
            onClick={this.handleItemClick}>
            Location
          </Menu.Item>
          <Menu.Item
            name='artist'
            active={canClickArtists}
            onClick={canClickArtists && this.handleItemClick}>
            Artist
          </Menu.Item>
          <Menu.Item
            name='concert'
            active={canClickConcerts}
            onClick={canClickConcerts && this.handleItemClick}>
            Concerts
          </Menu.Item>
          <Menu.Item
            name='reset'
            onClick={this.reset}>
            Reset All
          </Menu.Item>
        </Menu>
      )
    }

  showComponent() {
    let component = null;
    switch(this.props.activeTab) {
      case('location'):
        component = <LocationSearch/>;
        break;
      case('artist'):
        component = <ArtistSearch/>;
        break;
      case('concert'):
        component = <ConcertView/>;
    }
    return component
  }

  render() {
    return (
      <div>
        <Header
          style={{
            color: 'ivory',
            fontFamily: 'Tahoma',
            fontSize: 20
          }}>
          Find concerts of related artists in your area
        </Header>
        { this.showMenuItem() }
        { this.showComponent() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      activeTab: state.activeTab,
      artists: state.artists,
      selectedLocation: state.selectedLocation,
      selectedArtist: state.selectedArtist,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(actionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
