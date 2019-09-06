import React, { Component } from 'react';
import ApiCalendar from 'react-google-calendar-api';

import {Button, Icon} from "semantic-ui-react";


class GoogleCalendarAdd extends Component {
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
    }
    // TODO: List events on / after google login
    // else {
    //   this.listEvents();
    // }
  };

  setCalendar = (calendar) => {
    ApiCalendar.setCalendar(calendar);
  };

  createEvent = () => {
    const { event } = this.props;
    ApiCalendar.createEvent(event)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { sign } = this.state;
    return (
      <div>
        <Button
          onClick={sign ? this.createEvent : this.googleLogin} >
          <Icon name='plus' />
        </Button>
      </div>
    );
  }
}

export default GoogleCalendarAdd;
