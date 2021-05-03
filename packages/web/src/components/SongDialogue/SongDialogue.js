import React, { useState, useEffect } from "react";
import { func, object } from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { playlistTypes } from "../../redux/playlist/playlist-types";
import {
  // fetchPlaylists,
  fetchOwnPlaylists,
  addSongToPlaylist,
} from "../../redux/playlist/playlist-actions";

function SongDialogue({
  setShowModal,
  setShowDeleteModal,
  setIsEditModal,
  song,
  setSelectedTrack,
  handleLikeBtn,
}) {
  const { _id } = useSelector((state) => state.auth.currentUser.data);
  const { authorId } = song;
  const isMySong = _id === authorId;

  const { OWN } = useSelector((state) => state.playlists.playlistIds);
  const { playlistByID } = useSelector((state) => state.playlists);

  const [showPlaylists, setShowPlaylists] = useState(false);

  const dispatch = useDispatch();

  function handleEditClick() {
    setShowModal(true);
    setIsEditModal(true);
    setSelectedTrack(song);
  }

  function handleDeleteClick() {
    setShowDeleteModal(true);
    setSelectedTrack(song);
  }

  function handleAddToPlaylistBtn(e) {
    const playlistId = e.currentTarget.id;
    const songId = song._id;
    dispatch(addSongToPlaylist(playlistId, songId));
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
        onClick={handleLikeBtn}
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
  setShowModal: func.isRequired,
  setShowDeleteModal: func.isRequired,
  setIsEditModal: func.isRequired,
  song: object.isRequired,
  setSelectedTrack: func.isRequired,
  handleLikeBtn: func.isRequired,
};

export default SongDialogue;
