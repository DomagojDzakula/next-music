import { PLAYLIST_ID, FETCH_PLAYLISTS } from "../constants";

export const playlistID = (id) => {
  return {
    type: PLAYLIST_ID,
    payload: { id },
  };
};

export const playlistStatus = (playlist) => {
  return {
    type: FETCH_PLAYLISTS,
    payload: { playlist },
  };
};
