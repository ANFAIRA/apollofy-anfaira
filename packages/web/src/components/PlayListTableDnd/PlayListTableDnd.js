import React, { useState, useEffect } from "react";
import { array, string } from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  faHeart as farHeart,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { playSong } from "../../redux/player/player-actions";
import {
  addSongToPlaylist,
  deleteSongFromPlaylist,
  updatePlaylistOrder,
} from "../../redux/playlist/playlist-actions";
import { formatTime } from "../../utils/utils";

const PlayListTableDnd = ({ fetchedSongs, songs, icon, playlistId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { genresByID } = useSelector((state) => state.genre);

  const handleDelete = (e) => {
    const songId = e.currentTarget.id;
    dispatch(deleteSongFromPlaylist(id, songId));
  };

  const handleClick = (e) => {
    const songId = e.currentTarget.id;
    if (icon.iconName === "plus") {
      dispatch(addSongToPlaylist(id, songId));
    } else {
      const selectedSong = fetchedSongs.find((song) => song._id === songId);
      dispatch(playSong(selectedSong));
    }
    return id;
  };

  const [listOfSongs, setListOfSongs] = useState(songs);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(listOfSongs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setListOfSongs(items);
    dispatch(updatePlaylistOrder(playlistId, listOfSongs));
  }

  useEffect(() => {
    setListOfSongs(songs);
  }, [songs]);
  return (
    <div>
      <div className="flex text-gray-600">
        <div className="p-2 w-14 flex-shrink-0" />
        <div className="p-2 w-12 flex-shrink-0" />
        <div className="p-2 w-full">Title</div>
        <div className="p-2 w-full">Artist</div>
        <div className="p-2 w-full">Genre</div>
        <div className="p-2 w-16 flex-shrink-0">Time</div>
        <div className="p-2 w-10 flex-shrink-0" />
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
                            <div className="p-3 w-full">
                              {genresByID[song.genre]?.metadata.name}{" "}
                            </div>
                            <div className="p-3 w-16 flex-shrink-0">
                              {formatTime(song.duration)}
                            </div>
                            <button
                              type="button"
                              id={song._id}
                              onClick={handleDelete}
                              className="p-3 w-12 flex-shrink-0"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
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

PlayListTableDnd.propTypes = {
  fetchedSongs: array.isRequired,
  songs: array.isRequired,
  icon: string.isRequired,
  playlistId: string.isRequired,
};

export default PlayListTableDnd;
