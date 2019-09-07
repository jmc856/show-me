import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import ApiCalendar from 'react-google-calendar-api';

import {Table} from "semantic-ui-react";
import * as actionCreators from "../actions";


class GoogleCalendarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sign: ApiCalendar.sign,
    };
    this.signUpdate = this.signUpdate.bind(this);
    ApiCalendar.onLoad(() => {
      ApiCalendar.listenSign(this.signUpdate);
    });
  }

  signUpdate(sign) {
    this.setState({
      sign
    })
  }

  googleLogin = (e) => {
    if (this.state.sign === false) {
      ApiCalendar.handleAuthClick();
    } else {
      this.listEvents();
    }
  };

  componentDidMount() {
    this.listEvents()
  }

  listEvents() {
    ApiCalendar.listUpcomingEvents(5).then((result) => {
      this.props.googleCalendarActions.setUpcomingEvents(result.result.items)
    })
  };

  render() {
    const { googleCalendarEvents } = this.props;
    return googleCalendarEvents && googleCalendarEvents.map((event, i) => {
      // const name = event.displayName;
      // const metroId = event.venue.metroArea.id;
      // const venueName = event.venue.displayName;
      // const venueUri = event.venue.uri;
      // const artistName = event.performance[0].artist.displayName;

      return (
        <Table.Row key={i}>
          <Table.Cell style={{fontSize: '14px', color: '#2b2b1b'}}>{'stuff'}</Table.Cell>
          <Table.Cell style={{fontSize: '14px', color: '#2b2b1b'}}>{'yep'}</Table.Cell>
          <Table.Cell style={{fontSize: '14px', color: '#2b2b1b'}}>
            {'more stuff'}
          </Table.Cell>
          <Table.Cell textAlign='center' style={{fontSize: '14px', color: '#2b2b1b'}}>\
            {'hello'}
            {/*<GoogleCalendarRemove />*/}
          </Table.Cell>
        </Table.Row>
      );
    })
  }
}

const mapStateToProps = (state) => {
    return {
      googleCalendarEvents: state.concerts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        googleCalendarActions: bindActionCreators(actionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleCalendarList);
