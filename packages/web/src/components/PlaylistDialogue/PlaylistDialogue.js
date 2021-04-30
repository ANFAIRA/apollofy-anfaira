import React from "react";
import { func, object } from "prop-types";
import { useSelector } from "react-redux";

function PlaylistDialogue({
  setShowModal,
  setShowDeleteModal,
  setIsEditModal,
  selectedPlaylist,
  setSelectedPlaylist,
}) {
  const { _id } = useSelector((state) => state.auth.currentUser.data);
  const { author } = selectedPlaylist;

  const isMyPlaylist = _id === author[0];

  function handleEditClick() {
    setShowModal(true);
    setIsEditModal(true);
    setSelectedPlaylist(selectedPlaylist);
  }

  function handleDeleteClick() {
    setShowDeleteModal(true);
    // setSelectedPlaylist(selectedPlaylist);
    console.log("handleDeleteClick");
  }

  function handleAuthorClick() {
    console.log("handleAuthorClick");
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
        onClick={handleAuthorClick}
      >
        Author
      </button>
      <button
        type="button"
        className="px-5 py-1 hover:text-gray-100 hover:bg-gray-600 text-left focus:outline-none rounded"
      >
        Share
      </button>
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
  selectedPlaylist: object.isRequired,
  setShowModal: func.isRequired,
  setShowDeleteModal: func.isRequired,
  setIsEditModal: func.isRequired,
  setSelectedPlaylist: func.isRequired,
};

export default PlaylistDialogue;
