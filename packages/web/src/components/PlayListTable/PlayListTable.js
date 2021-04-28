import React from "react";
import { array, string } from "prop-types";
// import { useDispatch } from "react-redux";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { playSong } from "../../redux/player/player-actions";
import { formatTime } from "../../utils/utils";

const PlayListTable = ({ songs, icon }) => {
  // const dispatch = useDispatch();

  const handleClick = () => {
    icon.iconName === "plus"
      ? console.log(icon.iconName)
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
};

export default PlayListTable;