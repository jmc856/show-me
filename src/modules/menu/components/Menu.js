import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import '../../../App.css';
import "semantic-ui-css/semantic.min.css";
import { Header, Menu } from "semantic-ui-react";

import * as actionCreators from "../actions";

import ArtistSearch from '../../artists/components/ArtistSearch';
import ConcertView from '../../concerts/components/ConcertView';
import GoogleCalendarList from '../../googleCalendar/components/GoogleCalendarList';
import LocationSearch from '../../locations/components/LocationSearch';
import NotFound from '../../../common/components/NotFound';


const styles = {
  menuItemActive: {
    background: '#d1d1df',
  },
  menuItemInactive: {
  },
  menuItemUnClickable: {
    color: '#ababab'
  }
};


class MenuComponent extends Component {

  handleItemClick = (e, { name }) => {
    this.props.actions.setActiveTab(name);
  };

  reset = () => {
    this.props.actions.resetProps()
  };

    showMenuItem() {
      const canClickArtists = Boolean(this.props.selectedLocation);
      const canClickConcerts = Boolean(this.props.selectedLocation && this.props.selectedArtist);
      const { activeTab } = this.props;
      return (
        <Menu stackable>
          {/*<Menu.Item>*/}
            {/*<img src='https://commons.wikimedia.org/wiki/File:Something_He_Can_Feel_by_Aretha_Franklin_US_vinyl.png'/>*/}
          {/*</Menu.Item>*/}

          <Menu.Item
            style={activeTab === 'location' ? styles.menuItemActive : styles.menuItemInactive}
            name='location'
            active={activeTab === 'location'}
            onClick={this.handleItemClick}>
            Location
          </Menu.Item>
          <Menu.Item
            style={activeTab === 'artist' ? styles.menuItemActive : (canClickArtists ? styles.menuItemInactive : styles.menuItemUnClickable)}
            name='artist'
            active={this.props.activeTab === 'artist'}
            onClick={canClickArtists && this.handleItemClick}>
            Artists
          </Menu.Item>
          <Menu.Item
            style={activeTab === 'concert' ? styles.menuItemActive : (canClickConcerts ? styles.menuItemInactive : styles.menuItemUnClickable)}
            name='concert'
            active={this.props.activeTab === 'concert'}
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
      <div style={{margin: '20px'}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
