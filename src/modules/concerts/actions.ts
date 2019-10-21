import { Concert } from "./types";

export const SET_CONCERTS = 'SET_CONCERTS';

export const setConcerts = (concerts: Concert[]) => {
  return {type: SET_CONCERTS, concerts: concerts}
};
