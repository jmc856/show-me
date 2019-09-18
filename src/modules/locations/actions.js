export const SET_LOCATIONS = 'SET_LOCATIONS';
export const SELECT_LOCATION = 'SELECT_LOCATION';

export const setLocations = (locations) => {
  return {type: SET_LOCATIONS, locations: locations}
};

export const selectLocation = (location) => {
  return {type: SELECT_LOCATION, location: location}
};
