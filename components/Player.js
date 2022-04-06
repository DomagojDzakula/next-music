import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { debounce } from "lodash";
import useSpotify from "../hooks/useSpotify";
import { useSelector } from "react-redux";
import useSongInfo from "../hooks/useSongInfo";
import { useDispatch } from "react-redux";
import { currentTrack, playing } from "../redux/actions/playerAction";

//ICONS
import {
  BsPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsVolumeMute,
  BsVolumeOff,
  BsVolumeDown,
  BsVolumeUp,
} from "react-icons/bs";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTrackId = useSelector(
    (state) => state.player.currentTrackIdState
  );
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();
  const dispatch = useDispatch();

  const fetchSongInfo = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        dispatch(currentTrack(data.body?.item?.id));

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          playing(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchSongInfo();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  const playPauseHandler = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        dispatch(playing(false));
      } else {
        spotifyApi.play();
        dispatch(playing(true));
      }
    });
  };

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debuncedAdjustVolume(volume);
    }
  });

  const debuncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => err);
    }, 100),
    []
  );

  const volumeHndler = () => {
    if (volume === 0) {
      return <BsVolumeMute />;
    } else if (volume >= 1 && volume < 40) {
      return <BsVolumeOff />;
    } else if (volume >= 40 && volume <= 74) {
      return <BsVolumeDown />;
    } else if (volume >= 75 && volume < 99) {
      return <BsVolumeUp />;
    } else if (volume === 100) {
      return <BsVolumeUp style={{ color: "#1ed760" }} />;
    }
  };

  return (
    <div className="currently-playing-container">
      <div className="currently-playing-information">
        <img
          className="player-img"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="player-icons">
        <BsFillSkipStartFill />
        {isPlaying ? (
          <BsFillPauseCircleFill onClick={playPauseHandler} />
        ) : (
          <BsPlayCircleFill onClick={playPauseHandler} />
        )}
        <BsFillSkipEndFill />
      </div>
      <div className="volume">
        {volumeHndler()}
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Player;
