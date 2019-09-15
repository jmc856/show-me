import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import ApiCalendar from 'react-google-calendar-api';

import { Table } from "semantic-ui-react";
import * as actionCreators from "../actions";


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
    this.googleLogin()
  }

  listEvents() {
    // TODO: Get more than 5 events
    // Get google calendar events from API and set to the store
    // Can only retrieve 5 events per call
    ApiCalendar.listUpcomingEvents(5).then((result) => {
      this.props.googleCalendarActions.setGoogleCalendarEvents(result.result.items)
    })
  };

  getGoogleCalendarEventsList() {
    // TODO: Filter on events created by this application
    const { googleCalendarEvents } = this.props;
    console.log(this.props);
    return googleCalendarEvents && googleCalendarEvents.map((event, i) => {
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

const mapStateToProps = (state) => {
    return {
      googleCalendarEvents: state.googleCalendarEvents,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        googleCalendarActions: bindActionCreators(actionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleCalendarList);
