import { Event } from "./types";

export const SET_GOOGLE_CALENDAR_EVENTS = 'SET_GOOGLE_CALENDAR_EVENTS';

export const setGoogleCalendarEvents = (events: Event[]) => {
  return {type: SET_GOOGLE_CALENDAR_EVENTS, googleCalendarEvents: events}
};
