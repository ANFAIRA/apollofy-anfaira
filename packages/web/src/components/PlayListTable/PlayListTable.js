import React from "react";
import { array, string } from "prop-types";
import { useDispatch } from "react-redux";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { playSong } from "../../redux/player/player-actions";
import { addSongToPlaylist } from "../../redux/playlist/playlist-actions";
import { formatTime } from "../../utils/utils";

const PlayListTable = ({ songs, icon, playlistId }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const songId = e.currentTarget.id;
    console.log(playlistId);
    console.log(songId);
    icon.iconName === "plus"
      ? dispatch(addSongToPlaylist(playlistId, songId))
      : console.log(icon.iconName);
  };

  return (
    <div>
      <div className="flex text-gray-600">
        <div className="p-2 w-12 flex-shrink-0" />
        <div className="p-2 w-12 flex-shrink-0" />
        <div className="p-2 w-full">Title</div>
        <div className="p-2 w-full">Artist</div>
        <div className="p-2 w-full">Genre</div>
        <div className="p-2 w-16 flex-shrink-0">Time</div>
      </div>
      {songs.map((song) => (
        <div
          key={song._id}
          className="flex border-b border-gray-800 hover:bg-gray-800"
        >
          <button
            type="button"
            id={song._id}
            onClick={handleClick}
            className="p-3 w-12 flex-shrink-0"
          >
            <FontAwesomeIcon icon={icon} />
          </button>
          <button type="button" className="p-3 w-12 flex-shrink-0">
            <FontAwesomeIcon icon={farHeart} />
          </button>
          <div className="p-3 w-full">{song.title}</div>
          <div className="p-3 w-full">{song.artist}</div>
          <div className="p-3 w-full">{song.genre} </div>
          <div className="p-3 w-16 flex-shrink-0">
            {formatTime(song.duration)}
          </div>
        </div>
      ))}
    </div>
  );
};

PlayListTable.propTypes = {
  songs: array.isRequired,
  icon: string.isRequired,
  playlistId: string.isRequired,
};

export default PlayListTable;
