import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import { Icon, Table } from "semantic-ui-react";
import songkickLogo from '../../../assets/songkick/powered-by-songkick-white.png'
import * as actionCreators from "../actions";

import '../../../App.css';

import { getRelatedArtists } from '../../../modules/spotify/actions';
import { getConcertsFromSpotifyArtistList } from "../../../modules/songkick/actions";


class ConcertView extends Component {
  state = {
    relatedArtists: [],
  };

  componentDidMount() {
    this._findConcerts(this.props.selectedArtist)
  }

  _findConcerts = async(selectedArtist) => {
    const relatedArtists = await getRelatedArtists(selectedArtist.id);
    const concerts = await getConcertsFromSpotifyArtistList(relatedArtists);
    this.props.concertActions.setConcerts(concerts);
    // NOTE: Timeout is a hack for re-rendering after concerts are set
    setTimeout(() => {this.forceUpdate();}, 1000)
  };

  _getConcertRows() {
    return this.props.concerts.map((concert, i) => {
      const name = concert.displayName;
      const metroId = concert.venue.metroArea.id;
      const venueName = concert.venue.displayName;
      const venueUri = concert.venue.uri;
      const artistName = concert.performance[0].artist.displayName;
      return (
        metroId === this.props.selectedLocation.metroArea.id &&
        <Table.Row key={i}>
          <Table.Cell style={{fontSize: '14px', color: '#2b2b1b'}}>{artistName}</Table.Cell>
          <Table.Cell style={{fontSize: '14px', color: '#2b2b1b'}}>
            <a href={concert.uri} target="_blank">{name}</a>
          </Table.Cell>
          <Table.Cell style={{fontSize: '14px', color: '#2b2b1b'}}>
            <a href={venueUri} target="_blank">{venueName}</a>
          </Table.Cell>
          <Table.Cell textAlign='center' style={{fontSize: '14px', color: '#2b2b1b'}}>
            <Icon disabled name='plus' />
          </Table.Cell>
        </Table.Row>
      );
    })
  }

  getSongKickLogo() {
    return <img src={songkickLogo} alt="Logo" height="30px" />
  }

  render() {
    const concerts = this.props.concerts;
    return (
      <div>
        <Table size='small' celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Related Artist</Table.HeaderCell>
              <Table.HeaderCell>Concert</Table.HeaderCell>
              <Table.HeaderCell>Venue</Table.HeaderCell>
              <Table.HeaderCell>Add to my list</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
         { concerts.length > 0 && this._getConcertRows() }
          </Table.Body>
        </Table>
        { concerts.length > 0 && this.getSongKickLogo() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      concerts: state.concerts,
      selectedLocation: state.selectedLocation,
      selectedArtist: state.selectedArtist,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        concertActions: bindActionCreators(actionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConcertView);
