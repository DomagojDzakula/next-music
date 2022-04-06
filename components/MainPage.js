import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useDispatch, useSelector } from "react-redux";
import { playlistStatus } from "../redux/actions/playlistAction";
import Songs from "./Songs";

//Icons
import { IoIosArrowDown } from "react-icons/io";

function MainPage() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
  const playlistId = useSelector((state) => state.playlistId.currentPlaylistId);
  const currentPlaylist = useSelector(
    (state) => state.playlistId.currentPlaylist
  );

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      dispatch(playlistStatus(data.body));
    });
  }, [spotifyApi, playlistId]);

  return (
    <div className="main-container">
      <header>
        <div onClick={signOut} className="profile">
          <img src={session?.user.image} alt="" />
          <h3>{session?.user.name}</h3>
          <IoIosArrowDown />
        </div>
      </header>

      <section>
        <div className="something">
          <img src={currentPlaylist?.images?.[0]?.url} alt="playlist cover" />
          <div className="information">
            <p>PLAYLIST</p>
            <h1>{currentPlaylist.name}</h1>
          </div>
        </div>
      </section>
      <Songs />
    </div>
  );
}

export default MainPage;
