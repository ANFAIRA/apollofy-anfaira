import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { func, object } from "prop-types";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addSongToQueue } from "../../redux/player/player-actions";
// import { playlistTypes } from "../../redux/playlist/playlist-types";
import {
  addSongToPlaylist,
  // fetchPlaylists,
  fetchOwnPlaylists,
} from "../../redux/playlist/playlist-actions";
import {
  showSongModal,
  showDeleteModal,
  setEditModalTrue,
} from "../../redux/modals/modal-actions";
import { setSongToUpdate } from "../../redux/song/song-actions";

function SongDialogue({ song, handleLikeBtn, setIsMenuOpen }) {
  const { _id } = useSelector((state) => state.auth.currentUser.data);
  const { authorId } = song;
  const isMySong = _id === authorId;

  const { OWN } = useSelector((state) => state.playlists.playlistIds);
  const { playlistByID } = useSelector((state) => state.playlists);

  const [showPlaylists, setShowPlaylists] = useState(false);

  const dispatch = useDispatch();

  function handleEditClick() {
    dispatch(showSongModal());
    dispatch(setEditModalTrue());
    dispatch(setSongToUpdate(song));

    setIsMenuOpen(false);
  }

  function handleDeleteClick() {
    dispatch(showDeleteModal());
    setIsMenuOpen(false);
  }

  function handleAddToPlaylistBtn(e) {
    const playlistId = e.currentTarget.id;
    const songId = song._id;
    dispatch(addSongToPlaylist(playlistId, songId));
  }

  function handleLikeClick() {
    handleLikeBtn();
    setIsMenuOpen(false);
  }

  function handleAddSongToQueue() {
    setIsMenuOpen(false);
    dispatch(addSongToQueue(song));
  }

  useEffect(() => {
    // dispatch(fetchPlaylists(playlistTypes.OWN));
    dispatch(fetchOwnPlaylists());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-self-start bg-gray-700 absolute mt-3 ml-5 top-1/2 left-3/4 shadow-md w-40 z-10 py-2 text-gray-200 cursor-pointer text-sm">
      <button
        type="button"
        className="px-5 py-1 hover:text-gray-100 hover:bg-gray-600 font-semibold text-left focus:outline-none"
        onClick={handleAddSongToQueue}
      >
        Add to queue
      </button>
      <button
        type="button"
        className="px-5 py-1 hover:text-gray-100 hover:bg-gray-600 font-semibold text-left focus:outline-none"
        onClick={handleLikeClick}
      >
        Like
      </button>
      <button
        type="button"
        className="px-5 py-1 hover:text-gray-100 hover:bg-gray-600 font-semibold text-left focus:outline-none flex justify-between items-center relative"
        onMouseEnter={() => setShowPlaylists(true)}
        onMouseLeave={() => setShowPlaylists(false)}
      >
        <span>Add to Playlist</span>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      {showPlaylists && (
        <div
          className="flex flex-col justify-self-start bg-gray-700 mt-3 ml-5 absolute left-32 top-4 shadow-md w-40 z-10 py-2 text-gray-200 cursor-pointer text-sm"
          onMouseEnter={() => setShowPlaylists(true)}
          onMouseLeave={() => setShowPlaylists(false)}
        >
          {OWN?.map((playlist) => (
            <button
              type="button"
              key={playlistByID[playlist]._id}
              id={playlistByID[playlist]._id}
              className="px-5 py-1 hover:text-gray-100 hover:bg-gray-600 font-semibold text-left focus:outline-none flex justify-between items-center truncate"
              onClick={handleAddToPlaylistBtn}
            >
              {playlistByID[playlist].title}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        className={
          isMySong
            ? "px-5 py-1 hover:text-gray-100 hover:bg-gray-600 font-semibold text-left focus:outline-none"
            : "px-5 py-1 text-gray-500 text-left focus:outline-none"
        }
        onClick={handleEditClick}
        disabled={!isMySong}
      >
        Edit
      </button>
      <button
        type="button"
        className={
          isMySong
            ? "px-5 py-1 hover:text-gray-100 hover:bg-gray-600 text-left focus:outline-none"
            : "px-5 py-1 text-gray-500 text-left focus:outline-none"
        }
        onClick={handleDeleteClick}
        disabled={!isMySong}
      >
        Delete
      </button>
    </div>
  );
}

SongDialogue.propTypes = {
  handleLikeBtn: func.isRequired,
  setIsMenuOpen: func.isRequired,
  song: object.isRequired,
};

export default SongDialogue;
