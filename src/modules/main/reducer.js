import * as actions from './actions'

const initialState = {
  activeTab: 'location',
  accessToken: null,
  locations: [],
  selectedLocation: null,
  artists: [],
  selectedArtist: null,
  concerts: [],
};


export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.activeTab,
    };
    case actions.SET_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      };
    case actions.SELECT_LOCATION:
      return {
        ...state,
        selectedLocation: action.location,
      };
    case actions.SET_ARTISTS:
      return {
        ...state,
        artists: action.artists
      };
    case actions.SELECT_ARTIST:
      return {
        ...state,
        selectedArtist: action.artist,
      };
    case actions.SET_CONCERTS:

      return {
        ...state,
        concerts: action.concerts,
      };
    case actions.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case actions.RESET_PROPS:
      return {
        ...initialState,
      };
    default:
      return state
  }
}
