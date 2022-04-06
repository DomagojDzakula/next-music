import { millisToMinutesAndSeconds } from "../lib/time";
import useSpotify from "../hooks/useSpotify";
import { currentTrack, playing } from "../redux/actions/playerAction";
import { useDispatch } from "react-redux";

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();

  const playSong = () => {
    dispatch(currentTrack(track.track.id));
    dispatch(playing(true));
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div onClick={playSong}>
      <div className="song-container">
        <div className="track-name">
          <p>{order + 1}</p>
          <img src={track.track.album.images[0].url} alt="" />
          <div>
            <p>{track.track.name}</p>
            <span>{track.track.artists[0].name}</span>
          </div>
        </div>

        <div className="track-information">
          <span>{track.track.album.name}</span>
        </div>

        <div className="time">
          <span>{millisToMinutesAndSeconds(track.track.duration_ms)}</span>
        </div>
      </div>
    </div>
  );
}

export default Song;
