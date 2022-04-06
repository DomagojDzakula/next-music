import React from "react";
import { useSelector } from "react-redux";
import Song from "./Song";

function Songs() {
  const currentPlaylist = useSelector(
    (state) => state.playlistId.currentPlaylist
  );

  return (
    <div className="songs">
      {currentPlaylist.tracks?.items.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
}

export default Songs;
