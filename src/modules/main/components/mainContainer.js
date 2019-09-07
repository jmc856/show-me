import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import "semantic-ui-css/semantic.min.css";
import '../../../App.css';

import * as actionCreators from "../actions";

import {Header, Menu} from "semantic-ui-react";

import ArtistSearch from './artistSearch';
import ConcertView from './concertView';
import GoogleCalendarList from './googleCalendarList';
import LocationSearch from './locationSearch';
import NotFound from './NotFound';


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
          <Menu.Item
            name='events'
            onClick={this.handleItemClick}>
            My Events
          </Menu.Item>
        </Menu>
      )
    }

  showComponent() {
    let component = null;
    switch (this.props.activeTab) {
      case('location'):
        component = <LocationSearch/>;
        break;
      case('artist'):
        component = <ArtistSearch/>;
        break;
      case('concert'):
        component = <ConcertView/>;
        break;
      case('events'):
        component = <GoogleCalendarList/>;
        break;
      default:
        component = <NotFound/>;
        break;
    }
    return component
  }

  render() {
    return (
      <div>
        <Header
          as='h2'
          style={{
            color: 'ivory',
            fontSize: 24,
            marginBottom: '1em'
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
