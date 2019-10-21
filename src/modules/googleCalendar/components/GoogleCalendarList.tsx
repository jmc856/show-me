import React, { Component } from 'react';
import { connect } from "react-redux";

// @ts-ignore
import ApiCalendar from 'react-google-calendar-api';
import { Table } from "semantic-ui-react";

import { Event } from "../types";
import { setGoogleCalendarEvents } from "../actions";


const styles = {
  tableCell: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#2b2b1b'
  },
  tableHeader: {
    textAlign: 'center',
    fontSize: '16px'
  },
};

interface GoogleCalendarListState {
  sign: boolean
}

interface GoogleCalendarListProps {
  googleCalendarEvents: Event[];
  setGoogleCalendarEvents: (events: Event[]) => void;
}

class GoogleCalendarList extends Component<GoogleCalendarListProps, GoogleCalendarListState> {
  constructor(props: GoogleCalendarListProps) {
    super(props);
    this.state = {
      sign: ApiCalendar.sign,
    };
    this.signUpdate = this.signUpdate.bind(this);
    ApiCalendar.onLoad(() => {
      ApiCalendar.listenSign(this.signUpdate);
    });
  }

  signUpdate(sign: boolean) {
    this.setState({ sign })
  }

  googleLogin = () => {
    if (!this.state.sign) {
      ApiCalendar.handleAuthClick();
    } else {
      this.listEvents();
    }
  };

  componentDidMount() {
    this.googleLogin()
  }

  listEvents() {
    // TODO: Get more than 5 events
    // Get google calendar events from API and set to the store
    // Can only retrieve 5 events per call
    ApiCalendar.listUpcomingEvents(5).then((result: any) => {
      this.props.setGoogleCalendarEvents(result.result.items)
    })
  };

  getGoogleCalendarEventsList() {
    // TODO: Filter on events created by this application
    const { googleCalendarEvents } = this.props;
    console.log(this.props);
    return googleCalendarEvents && googleCalendarEvents.map((event: Event, i: number) => {
      const summary = event.summary;
      const location = event.location;
      const date = event.start.datetime;

      return (
        <Table.Row key={i}>
          <Table.Cell style={styles.tableCell}>{summary}</Table.Cell>
          <Table.Cell style={styles.tableCell}>{location}</Table.Cell>
          <Table.Cell style={styles.tableCell}>{date}</Table.Cell>
        </Table.Row>
      );
    })
  }

  render() {
    return (
      <div>
        <Table size='small' celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={styles.tableHeader} singleLine>Event</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHeader} >Location</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHeader} >Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        {this.getGoogleCalendarEventsList()}
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  googleCalendarEvents: state.googleCalendarEvents,
});

const mapDispatchToProps = (dispatch: any) => ({
  setGoogleCalendarEvents: (events: Event[]) => dispatch(setGoogleCalendarEvents(events)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleCalendarList);
