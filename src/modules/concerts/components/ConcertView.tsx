import React, { Component } from 'react';
import { connect } from "react-redux";
import '../../../App.css';

import { Table } from "semantic-ui-react";
import Loading from "../../../common/components/Loading";
import songkickLogo from '../../../assets/songkick/powered-by-songkick-white.png'
import { setConcerts } from "../actions";
import { Concert } from "../types";
import { Artist } from "../../artists/types";
import { Location } from '../../locations/types';

import { getRelatedArtists } from '../../spotify/actions';
import { getConcertsFromSpotifyArtistList } from "../../songkick/actions";
import GoogleCalendarAdd from "../../../modules/googleCalendar/components/GoogleCalendarAdd";


const styles = {
  tableCell: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#2b2b1b'
  },
  tableHeader: {
    textAlign: 'center'
  },
};

interface ConcertViewProps {
  concerts: Concert[];
  selectedArtist: Artist;
  selectedLocation: Location;
  setConcerts: (concerts: Concert[]) => void;
}

class ConcertView extends Component<ConcertViewProps> {
  componentDidMount() {
    this._findConcerts(this.props.selectedArtist)
  }

  _findConcerts = async(selectedArtist: Artist) => {
    const relatedArtists = await getRelatedArtists(selectedArtist.id);
    const concerts = await getConcertsFromSpotifyArtistList(relatedArtists);
    this.props.setConcerts(concerts);
    // NOTE: Timeout is a hack for re-rendering after concerts are set
    setTimeout(() => {this.forceUpdate();}, 1000)
  };

  _getConcertRows() {
    // const artistNoConcerts = new Set([]);
    return this.props.concerts.map((concert, i) => {
      const name = concert.displayName;
      const metroId = concert.venue.metroArea.id;
      const venueName = concert.venue.displayName;
      const venueUri = concert.venue.uri;
      const artistName = concert.performance[0].artist.displayName;

      const start = Date.parse(concert.start.datetime || concert.start.date);

      const event = {
        summary: name,
        description: 'desc',
        start: {
          dateTime: new Date(start).toISOString(),
        },
        end: {
          // 7200000 is 120 minutes
          dateTime: new Date(start + 7200000).toISOString(),
        }
      };

      return (
        metroId === this.props.selectedLocation.metroArea.id &&
        <Table.Row key={i}>
          <Table.Cell style={styles.tableCell}>{artistName}</Table.Cell>
          <Table.Cell style={styles.tableCell}>
            {/*https://mathiasbynens.github.io/rel-noopener/#hax*/}
            <a href={concert.uri} target="_blank" rel="noopener noreferrer">{name}</a>
          </Table.Cell>
          <Table.Cell style={styles.tableCell}>
            <a href={venueUri} target="_blank" rel="noopener noreferrer">{venueName}</a>
          </Table.Cell>
          <Table.Cell textAlign='center' style={styles.tableCell}>
            {/*// TODO: Pass in valid event information*/}
            <GoogleCalendarAdd event={event}/>
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
    if (concerts.length > 0) {
      return (
        <div>
          <Table size='small' celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={styles.tableHeader} singleLine>Related Artist</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHeader} >Concert</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHeader} >Venue</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHeader} >Add to Google Calendar</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
         { this._getConcertRows() }
          </Table.Body>
        </Table>
        { this.getSongKickLogo() }
      </div>
      )
    } else {
     return <Loading/>
    }
  }
}

const mapStateToProps = (state: any) => ({
  concerts: state.concerts,
  selectedLocation: state.selectedLocation,
  selectedArtist: state.selectedArtist,
});

const mapDispatchToProps = (dispatch: any) => ({
  setConcerts: (concerts: Concert[]) => dispatch(setConcerts(concerts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConcertView);
