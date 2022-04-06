import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useDispatch } from "react-redux";
import { playlistID } from "../redux/actions/playlistAction";
//Import icons
import { RiHome2Line, RiSearchLine } from "react-icons/ri";
import { ImLibrary } from "react-icons/im";
import { AiOutlineHeart } from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";

function Sidebar() {
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  //Current playlistID
  const playlistIdHandler = (id) => {
    dispatch(playlistID(id));
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="button-container">
      <div className="buttons">
        <button>
          <RiHome2Line />
          <p>Home</p>
        </button>
        <button>
          <RiSearchLine />
          <p>Search</p>
        </button>
        <button>
          <ImLibrary />
          <p>Library</p>
        </button>
        <hr />
        <button>
          <BsPlusCircleDotted />
          <p>Create Playlist</p>
        </button>
        <button>
          <AiOutlineHeart />
          <p>Liked Songs</p>
        </button>
        <hr />
        {playlists.map((playlist) => (
          <p
            className="playlist"
            onClick={() => playlistIdHandler(playlist.id)}
            key={playlist.id}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
