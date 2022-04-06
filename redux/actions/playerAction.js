import { CURRENT_TRACK, SET_PLAYING } from "../constants";

export const currentTrack = (id) => {
  return {
    type: CURRENT_TRACK,
    payload: { id },
  };
};
export const playing = (data) => {
  return {
    type: SET_PLAYING,
    payload: { data },
  };
};
