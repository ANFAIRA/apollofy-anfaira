import React from "react";
import { func, object } from "prop-types";
import { useSelector } from "react-redux";

function SongDialogue({
  setShowModal,
  setIsEditModal,
  song,
  setSelectedTrack,
}) {
  const { _id } = useSelector((state) => state.auth.currentUser.data);
  const { authorId } = song;

  const isMySong = _id === authorId;

  function handleEditClick() {
    setShowModal(true);
    setIsEditModal(true);
    setSelectedTrack(song);
  }

  return (
    <div className="flex flex-col justify-self-start bg-gray-700 absolute mt-3 ml-5 top-1/2 left-3/4 w-36 z-10 py-2 text-gray-200 cursor-pointer">
      <button
        type="button"
        className="px-5 py-1 hover:text-gray-100 hover:bg-gray-600 text-left focus:outline-none"
      >
        Like
      </button>
      <button
        type="button"
        className={
          isMySong
            ? "px-5 py-1 hover:text-gray-100 hover:bg-gray-600 text-left focus:outline-none"
            : "px-5 py-1 text-gray-500 text-left focus:outline-none"
        }
        onClick={handleEditClick}
        disabled={!isMySong}
      >
        Edit
      </button>
      <button
        type="button"
        className="px-5 py-1 hover:text-gray-100 hover:bg-gray-600 text-left focus:outline-none"
      >
        Delete
      </button>
    </div>
  );
}

SongDialogue.propTypes = {
  setShowModal: func.isRequired,
  setIsEditModal: func.isRequired,
  song: object.isRequired,
  setSelectedTrack: func.isRequired,
};

export default SongDialogue;
