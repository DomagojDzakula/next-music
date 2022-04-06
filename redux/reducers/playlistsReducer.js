import { FETCH_PLAYLISTS, PLAYLIST_ID } from "../constants";

const initialState = {
  currentPlaylistId: "6u7tclvO6AROgaJPUaOMLT",
  currentPlaylist: "",
};

const playlistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAYLIST_ID: {
      const { id } = action.payload;
      return {
        ...state,
        currentPlaylistId: id,
      };
    }
    case FETCH_PLAYLISTS: {
      const { playlist } = action.payload;
      return {
        ...state,
        currentPlaylist: playlist,
      };
    }

    default:
      return state;
  }
};

export default playlistsReducer;
