import React, { Component } from 'react';
import {connect} from "react-redux";

import '../../../App.css';
import "semantic-ui-css/semantic.min.css";
import { Header, Menu } from "semantic-ui-react";

import { setActiveTab, resetProps } from "../actions";

import ArtistSearch from '../../artists/components/ArtistSearch';
import ConcertView from '../../concerts/components/ConcertView';
import GoogleCalendarList from '../../googleCalendar/components/GoogleCalendarList';
import LocationSearch from '../../locations/components/LocationSearch';
import NotFound from '../../../common/components/NotFound';

import { Location } from "../../locations/types";
import { Artist } from "../../artists/types";

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


interface MenuProps {
    activeTab: string;
    selectedArtist: Artist;
    selectedLocation: Location;
    setActiveTab: (tab: string) => void;
    resetProps: () => void;
}

class MenuComponent extends Component<MenuProps> {

    _canClickArtists = () => {
       return Boolean(this.props.selectedLocation);
    };

    _canClickConcerts = () => {
       return Boolean(this.props.selectedLocation && this.props.selectedArtist);
    };

    handleChangeTab = (tab: string) => {
      if (
        (tab === 'artist' && !this._canClickArtists()) ||
        (tab === 'concert' && !this._canClickConcerts())
      ) {
        return
      }
      this.props.setActiveTab(tab);
  };

  reset = () => {
    this.props.resetProps()
  };

    showMenuItem() {
      const { activeTab } = this.props;
      return (
        <Menu stackable>
          <Menu.Item
            style={activeTab === 'location' ? styles.menuItemActive : styles.menuItemInactive}
            name='location'
            active={activeTab === 'location'}
            onClick={ () => this.handleChangeTab('location') }>
            Location
          </Menu.Item>
          <Menu.Item
            style={activeTab === 'artist' ? styles.menuItemActive : (this._canClickArtists() ? styles.menuItemInactive : styles.menuItemUnClickable)}
            name='artist'
            active={this.props.activeTab === 'artist'}
            onClick={ () => this.handleChangeTab('artist') }>
            Artists
          </Menu.Item>
          <Menu.Item
            style={activeTab === 'concert' ? styles.menuItemActive : (this._canClickConcerts() ? styles.menuItemInactive : styles.menuItemUnClickable)}
            name='concert'
            active={this.props.activeTab === 'concert'}
            onClick={ () => this.handleChangeTab('concert') }>
            Concerts
          </Menu.Item>
          <Menu.Item
            name='reset'
            onClick={this.reset}>
            Reset All
          </Menu.Item>
          <Menu.Item
            name='events'
            onClick={ () => this.handleChangeTab('events') }>
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

const mapStateToProps = (state: any) => {
    return {
      activeTab: state.activeTab,
      artists: state.artists,
      selectedLocation: state.selectedLocation,
      selectedArtist: state.selectedArtist,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    setActiveTab: (tab: string) => dispatch(setActiveTab(tab)),
    resetProps: () => dispatch(resetProps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
