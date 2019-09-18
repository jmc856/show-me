import * as menuActions from '../menu/actions'
import * as artistActions from '../artists/actions'
import * as concertActions from '../concerts/actions'
import * as googleCalendarActions from '../googleCalendar/actions'
import * as locationActions from '../locations/actions'

const initialState = {
  activeTab: 'location',
  accessToken: null,
  googleCalendarEvents: [],
  locations: [],
  selectedLocation: null,
  artists: [],
  selectedArtist: null,
  concerts: [],
};


export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case menuActions.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.activeTab,
    };
    case locationActions.SET_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      };
    case locationActions.SELECT_LOCATION:
      return {
        ...state,
        selectedLocation: action.location,
      };
    case artistActions.SET_ARTISTS:
      return {
        ...state,
        artists: action.artists
      };
    case artistActions.SELECT_ARTIST:
      return {
        ...state,
        selectedArtist: action.artist,
      };
    case concertActions.SET_CONCERTS:
      return {
        ...state,
        concerts: action.concerts,
      };
    case menuActions.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case googleCalendarActions.SET_GOOGLE_CALENDAR_EVENTS:
      return {
        ...state,
        googleCalendarEvents: action.googleCalendarEvents || []
      };
    case menuActions.RESET_PROPS:
      return {
        ...initialState,
      };
    default:
      return state
  }
}
