import { CURRENT_TRACK, SET_PLAYING } from "../constants";

const initialState = {
  isPlaying: false,
  currentTrackIdState: null,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_TRACK: {
      const { id } = action.payload;
      return {
        ...state,
        currentTrackIdState: id,
      };
    }
    case SET_PLAYING: {
      const { data } = action.payload;
      return {
        ...state,
        isPlaying: data,
      };
    }
    default:
      return state;
  }
};

export default playerReducer;
