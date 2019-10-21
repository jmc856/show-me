import React, { Component } from 'react';
import {connect} from "react-redux";

import { Button, Icon, Image, Input, List } from "semantic-ui-react";
import '../../../App.css';

import { Artist } from "../types";
import { searchArtist as searchSpotifyArtist } from '../../../modules/spotify/actions';
import { setArtists, selectArtist } from "../actions";


const styles = {
 search: {
   width: '100%',
   textAlign: 'center'
 },
  button: {
   margin: 'auto'
  },
  icon: {
   marginTop: 'auto'
  }
};

interface ArtistSearchProps {
    artists: Artist[];
    selectedArtist: Artist;
    selectArtist: (artists: Artist[] | null) => void;
    setArtists: (artist: Artist) => void;
}

interface ArtistSearchState {
    artistInput: string;
}

class ArtistSearch extends Component<ArtistSearchProps, ArtistSearchState> {
    constructor(props: ArtistSearchProps) {
        super(props);

    this.state = {
      artistInput: '',
    };
  }

  _handleArtistInputClick = async() => {
    const artists = await searchSpotifyArtist(this.state.artistInput);
    this.props.setArtists(artists);
  };

  _handleCancel = () => {
    this.props.selectArtist(null);
    // this.props.setConcerts(null)
  };

  _handleInputChange = (e: any) => {
    this.setState({artistInput: e.target.value })};

  _handleSelectArtist = (artist: Artist) => {
    this.props.selectArtist(artist)
  };

  _getArtistDiv = () => {
    const selectedArtist = this.props.selectedArtist;
    if (selectedArtist) {
      const image = selectedArtist.images.length > 0 ? selectedArtist.images[0].url : null;
      return (
        <List.Item key={'selectedArtist'}>
          { image && <Image style={{marginLeft: '10px'}} floated='left' avatar src={image}/> }
          <List.Content>
            <List.Header style={{color: 'ivory'}}>{selectedArtist.name}</List.Header>
          </List.Content>
          <Button style={styles.button} floated='right' onClick={this._handleCancel}>
            <Icon style={styles.icon} name='cancel' color='red'/>
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
              { <Image style={{marginLeft: '10px'}} floated='left' avatar src={image || null}/> }
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
          style={styles.search}
          // loading
          placeholder='Search Artist'
          onChange={ this._handleInputChange}
          action={{
            content: "Search",
            onClick: this._handleArtistInputClick
          }}
        />
        <List animated divided verticalAlign='middle'>
          { this._getArtistDiv() }
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
    artists: state.artists,
    selectedArtist: state.selectedArtist,
});

const mapDispatchToProps = (dispatch: any) => ({
    selectArtist: (artist: Artist) => dispatch(selectArtist(artist)),
    setArtists: (artists: Artist[]) => dispatch(setArtists(artists)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistSearch);
