import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bool, func } from "prop-types";
import React from "react";

const addSong = <FontAwesomeIcon icon={faCloudUploadAlt} />;

function UploadButton({ showModal, setShowModal }) {
  function handleClick() {
    setShowModal(true);
  }
  return (
    <button
      type="button"
      title="upload a song"
      aria-label="upload a song"
      className="focus:outline-none openModal mr-4"
      onClick={handleClick}
    >
      {addSong}
    </button>
  );
}

UploadButton.propTypes = {
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
};

export default UploadButton;
