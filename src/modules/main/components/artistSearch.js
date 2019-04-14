import React, { Component } from 'react';
import '../../../App.css';

import {Button, Icon, Image, Input, List} from "semantic-ui-react";

import {
  searchArtist as searchSpotifyArtist,
} from '../../../modules/spotify/actions';
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions";
import {connect} from "react-redux";

class ArtistSearch extends Component {
  state = {
    artistInput: '',
  };

  _handleArtistInputClick = async() => {
    const artists = await searchSpotifyArtist(this.state.artistInput);
    this.props.artistActions.setArtists(artists);
  };

  _handleCancel = () => {
    this.props.artistActions.selectArtist(null);
    this.props.artistActions.setConcerts(null)
  };

  _handleInputChange = (e) => {
    this.setState({
      [e.currentTarget.id]: e.target.value,
    })
  };

  _handleSelectArtist = (artist) => {
    this.props.artistActions.selectArtist(artist)
  };

  _getArtistDiv = () => {
    const selectedArtist = this.props.selectedArtist;
    if (selectedArtist) {
      const image = selectedArtist.images.length > 0 ? selectedArtist.images[0].url : null;
      return (
        <List.Item key={'selectedArtist'}>
          { image && <Image avatar src={image}/> }
          <List.Content>
            <List.Header style={{color: 'ivory'}}>{selectedArtist.name}</List.Header>
          </List.Content>
          <Button floated='right' onClick={this._handleCancel}>
            <Icon name='cancel' color='red'/>
          </Button>
        </List.Item>
      )
    } else if (this.props.artists) {
      return this.props.artists.map((artist, i) => {
        const name = artist.name;
        const image = artist.images.length > 0 ? artist.images[0].url : null;
        return (
            <List.Item
              style={{fontSize: '20px'}}
              key={i}
              onClick={() => this._handleSelectArtist(artist)}>
              { image && <Image floated='left' avatar src={image}/> }
              <List.Content>
                <List.Header style={{color: 'ivory'}}>{name}</List.Header>
              </List.Content>
              <Button floated='right' style={{marginLeft: '20px'}} primary>Select</Button>
            </List.Item>
        )
      })
    }
  };
  render() {
    return (
      <div >
        <Input
          id="artistInput"
          // loading
          placeholder='Search Artist'
          onChange={ this._handleInputChange}
          action={{
            content: "Search",
            onClick: this._handleArtistInputClick
          }}
        />
        <List>
          { this._getArtistDiv() }
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      artists: state.artists,
      selectedArtist: state.selectedArtist,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        artistActions: bindActionCreators(actionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistSearch);
