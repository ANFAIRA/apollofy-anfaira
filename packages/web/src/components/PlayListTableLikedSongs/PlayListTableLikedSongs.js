import React, { useState, useEffect } from "react";
import { array, string } from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { playSong } from "../../redux/player/player-actions";
import { addSongToPlaylist } from "../../redux/playlist/playlist-actions";
import { formatTime } from "../../utils/utils";

const PlayListTableLikedSongs = ({ songs, icon, playlistId }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.song.songs);
  const handleClick = (e) => {
    const songId = e.currentTarget.id;
    if (icon.iconName === "plus") {
      dispatch(addSongToPlaylist(playlistId, songId));
    } else {
      const selectedSong = data.find((song) => song._id === songId);
      console.log(selectedSong);
      dispatch(playSong(selectedSong));
    }
  };
  let list = [];
  if (songs != null) {
    if (typeof songs[0] === "string") {
      list = data.filter(function (obj) {
        console.log(songs);
        console.log(songs.indexOf(String(obj._id)));
        return songs.indexOf(obj._id) !== -1;
      });
    } else {
      list = songs;
    }
  }

  const [listOfSongs, setListOfSongs] = useState(list);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(listOfSongs);
    console.log(items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setListOfSongs(items);
  }

  useEffect(() => {
    if (songs != null) {
      if (typeof songs[0] === "string") {
        list = data.filter(function (obj) {
          console.log(songs);
          console.log(songs.indexOf(String(obj._id)));
          return songs.indexOf(obj._id) !== -1;
        });
      } else {
        list = songs;
      }
    }
  }, [handleClick]);
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
      <div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="listOfSongs">
            {(provided) => (
              <ul
                className="listOfSongs"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listOfSongs?.map((song, index) => {
                  return (
                    <Draggable
                      key={song._id}
                      draggableId={song._id}
                      index={index}
                    >
                      {(providedd) => (
                        <li
                          key={song._id}
                          ref={providedd.innerRef}
                          {...providedd.draggableProps}
                          {...providedd.dragHandleProps}
                        >
                          <div className="flex border-b border-gray-800 hover:bg-gray-800">
                            <button
                              type="button"
                              id={song._id}
                              onClick={handleClick}
                              className="p-3 w-12 flex-shrink-0"
                            >
                              <FontAwesomeIcon icon={icon} />
                            </button>
                            <button
                              type="button"
                              className="p-3 w-12 flex-shrink-0"
                            >
                              <FontAwesomeIcon icon={farHeart} />
                            </button>
                            <div className="p-3 w-full">{song.title}</div>
                            <div className="p-3 w-full">{song.artist}</div>
                            <div className="p-3 w-full">{song.genre} </div>
                            <div className="p-3 w-16 flex-shrink-0">
                              {formatTime(song.duration)}
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

PlayListTableLikedSongs.propTypes = {
  songs: array.isRequired,
  icon: string.isRequired,
  playlistId: string.isRequired,
};

export default PlayListTableLikedSongs;
