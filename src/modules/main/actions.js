import { searchMetroId } from "../songkick/actions";

export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_LOCATIONS = 'SET_LOCATIONS';
export const SELECT_LOCATION = 'SELECT_LOCATION';

export const SET_ARTISTS = 'SET_ARTISTS';
export const SELECT_ARTIST = 'SELECT_ARTIST';

export const SET_CONCERTS = 'SET_CONCERTS';

export const RESET_PROPS = 'RESET_PROPS';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const LIST_GOOGLE_CALENDAR_EVENTS = 'LIST_GOOGLE_CALENDAR_EVENTS';

export const setActiveTab = (name) => {
  return {type: SET_ACTIVE_TAB, activeTab: name}
};

export async function getLocations(city) {
  const locations = await searchMetroId(city);
  return locations.resultsPage.results.location
}

export const setLocations = (locations) => {
  return {type: SET_LOCATIONS, locations: locations}
};

export const selectLocation = (location) => {
  return {type: SELECT_LOCATION, location: location}
};

export const setArtists = (artists) => {
  return {type: SET_ARTISTS, artists: artists}
};

export const selectArtist = (artist) => {
  return {type: SELECT_ARTIST, artist: artist}
};

export const setConcerts = (concerts) => {
  return {type: SET_CONCERTS, concerts: concerts}
};

export const resetProps = () => {
  return {type: RESET_PROPS}
};

export const listGoogleCalendarEvents = (events) => {
  return {type: LIST_GOOGLE_CALENDAR_EVENTS, googleCalendarEvents: events}
}
