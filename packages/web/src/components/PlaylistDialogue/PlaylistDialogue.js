import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { object } from "prop-types";
import { Link } from "react-router-dom";

import {
  showPlaylistModal,
  showPlaylistDeleteModal,
  setEditModal,
} from "../../redux/modals/modal-actions";

import {
  setPlaylistToUpdate,
  setPlaylistToDelete,
} from "../../redux/playlist/playlist-actions";

function PlaylistDialogue({ playlist }) {
  const { _id } = useSelector((state) => state.auth.currentUser);
  const { author } = playlist;

  const isMyPlaylist = _id === author[0];
  const currentURL = window.location.href;
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  function handleEditClick() {
    dispatch(setPlaylistToUpdate(playlist));
    dispatch(setEditModal());
    dispatch(showPlaylistModal());
  }

  function handleDeleteClick() {
    dispatch(setPlaylistToDelete(playlist._id));
    dispatch(showPlaylistDeleteModal());
  }

  function handleShareClick() {
    navigator.clipboard.writeText(currentURL);
  }

  return (
    <div className="flex flex-col justify-self-start bg-gray-700 absolute mt-3 ml-5 top-1/2 left-3/4 w-36 z-10 p-2 text-gray-200 cursor-pointer rounded">
      <button
        type="button"
        className={
          isMyPlaylist
            ? "px-5 py-1 hover:text-gray-100 hover:bg-gray-600 text-left focus:outline-none rounded"
            : "px-5 py-1 text-gray-500 text-left focus:outline-none"
        }
        onClick={handleEditClick}
        disabled={!isMyPlaylist}
      >
        Edit
      </button>
      <button
        type="button"
        className="px-5 py-1 hover:text-gray-100 hover:bg-gray-600 text-left focus:outline-none rounded"
      >
        <Link to={`/users/${author[0]}`}>
          <span>Author</span>
        </Link>
      </button>
      <button
        type="button"
        className="px-5 py-1 hover:text-gray-100 hover:bg-gray-600 text-left focus:outline-none rounded"
        onClick={handleShareClick}
      >
        Share
      </button>
      <input type="hidden" ref={inputRef} value={currentURL} />
      <button
        type="button"
        className={
          isMyPlaylist
            ? "px-5 py-1 hover:text-gray-100 hover:bg-gray-600 text-left focus:outline-none rounded"
            : "px-5 py-1 text-gray-500 text-left focus:outline-none"
        }
        onClick={handleDeleteClick}
        disabled={!isMyPlaylist}
      >
        Delete
      </button>
    </div>
  );
}

PlaylistDialogue.propTypes = {
  playlist: object.isRequired,
};

export default PlaylistDialogue;
