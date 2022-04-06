import { combineReducers } from "@reduxjs/toolkit";
import playlistsReducer from "./playlistsReducer";
import playerReducer from "./playerReducer";

export default combineReducers({
  playlistId: playlistsReducer,
  player: playerReducer,
});
