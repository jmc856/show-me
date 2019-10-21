import React, { Component } from 'react';
// @ts-ignore
import ApiCalendar from 'react-google-calendar-api';

import { Button, Icon, Popup } from "semantic-ui-react";

import { Calendar, Event } from "../types";

const styles = {
 search: {
   width: '100%',
   textAlign: 'center'
 },
  button: {
   margin: 'auto'
  },
  icon: {
   margin: 'auto'
  }
};

interface GoogleCalendarAddProps {
    event: Event
}
interface GoogleCalendarAddState {
    sign: boolean;
}

class GoogleCalendarAdd extends Component<GoogleCalendarAddProps, GoogleCalendarAddState> {
  constructor(props: GoogleCalendarAddProps) {
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

  googleLogin = (e: any) => {
    if (!this.state.sign) {
      ApiCalendar.handleAuthClick();
    }
    // TODO: List events on / after google login
    // else {
    //   this.listEvents();
    // }
  };

  setCalendar = (calendar: Calendar) => {
    ApiCalendar.setCalendar(calendar);
  };

  createEvent = () => {
    const { event } = this.props;
    ApiCalendar.createEvent(event)
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  render() {
    const { sign } = this.state;
    return (
      <div>
        <Popup
          trigger={
            <Button
              onClick={sign ? this.createEvent : this.googleLogin} >
              <Icon style={styles.icon} name='calendar alternate outline' />
            </Button>
          }
          content='Added to google calendar'
          on='click'
          hideOnScroll
          mouseLeaveDelay={750}
        />
      </div>
    );
  }
}

export default GoogleCalendarAdd;
