import { useState, useEffect } from "react";
import useSpotify from "./useSpotify";
import { useSelector } from "react-redux";

function useSongInfo() {
  const spotifyApi = useSpotify();
  const currentTrack = useSelector((state) => state.player.currentTrackIdState);
  const [songInfo, setSongInfo] = useState();

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrack) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());
        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [currentTrack, spotifyApi]);

  return songInfo;
}

export default useSongInfo;
