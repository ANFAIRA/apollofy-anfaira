import React from "react";
import { useDispatch } from "react-redux";
import { object, string } from "prop-types";

import {
  showSongModal,
  showPlaylistModal,
} from "../../redux/modals/modal-actions";

function UploadButton({ modal, text, icon }) {
  const dispatch = useDispatch();

  function handleClick() {
    modal === "song"
      ? dispatch(showSongModal())
      : dispatch(showPlaylistModal());
  }
  return (
    <button
      type="button"
      aria-label="upload a song"
      className="focus:outline-none openModal p-2"
      onClick={handleClick}
    >
      {icon}
      {text}
    </button>
  );
}

UploadButton.propTypes = {
  modal: string.isRequired,
  icon: object,
  text: string,
};

UploadButton.defaultProps = {
  text: "",
  icon: null,
};

export default UploadButton;
