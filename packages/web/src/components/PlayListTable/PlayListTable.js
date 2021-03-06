import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { array, object } from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { playSongAndSaveStats } from "../../redux/player/player-actions";
import { addSongToPlaylist } from "../../redux/playlist/playlist-actions";
import { formatTime } from "../../utils/utils";

const PlayListTable = ({ fetchedSongs, songs, icon }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { genresByID } = useSelector((state) => state.genre);

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
      <div className="flex text-gray-600">
        <div className="p-2 w-12 flex-shrink-0" />
        <div className="p-2 w-12 flex-shrink-0" />
        <div className="p-2 w-full">Title</div>
        <div className="p-2 w-full">Artist</div>
        <div className="p-2 w-full">Genre</div>
        <div className="p-2 w-16 flex-shrink-0">Time</div>
      </div>

      {fetchedSongs[0] !== "genre"
        ? fetchedSongs?.map((song) => {
            const indexSong = songs.findIndex(
              (item) => String(item._id) === String(song._id),
            );
            if (indexSong === -1) {
              return (
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
              );
            }
            return "";
          })
        : songs?.map((song) => {
            return (
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
            );
          })}
    </div>
  );
};

PlayListTable.propTypes = {
  fetchedSongs: array.isRequired,
  songs: array.isRequired,
  icon: object.isRequired,
};

export default PlayListTable;
