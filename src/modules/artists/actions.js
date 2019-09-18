export const SET_ARTISTS = 'SET_ARTISTS';
export const SELECT_ARTIST = 'SELECT_ARTIST';

export const setArtists = (artists) => {
  return {type: SET_ARTISTS, artists: artists}
};

export const selectArtist = (artist) => {
  return {type: SELECT_ARTIST, artist: artist}
};
