import {
  faHeart as farHeart,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { array, object } from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  // playSong,
  playSongAndSaveStats,
} from "../../redux/player/player-actions";
import {
  addSongToPlaylist,
  deleteSongFromPlaylist,
} from "../../redux/playlist/playlist-actions";
import { formatTime } from "../../utils/utils";

const PlayListTable = ({ songs, icon }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { genresByID } = useSelector((state) => state.genre);
  console.log(genresByID);
  const handleDelete = (e) => {
    const songId = e.currentTarget.id;
    dispatch(deleteSongFromPlaylist(id, songId));
  };

  const handleClick = (e) => {
    const songId = e.currentTarget.id;
    if (icon.iconName === "plus") {
      dispatch(addSongToPlaylist(id, songId));
    } else {
      const selectedSong = songs.find((song) => song._id === songId);
      dispatch(playSongAndSaveStats(selectedSong));
    }
    return id;
  };

  return (
    <div>
      {songs?.map((song) => (
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
          <div className="p-3 w-full">
            {genresByID[song.genre]?.metadata.name}{" "}
          </div>
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
  icon: object.isRequired,
};

export default PlayListTable;
