export const SET_LOCATIONS = 'SET_LOCATIONS';
export const SELECT_LOCATION = 'SELECT_LOCATION';

// TODO: Make location explicit type
type Location = any;

export const setLocations = (locations: Location[]) => {
  return {type: SET_LOCATIONS, locations: locations}
};

export const selectLocation = (location: Location) => {
  return {type: SELECT_LOCATION, location: location}
};
