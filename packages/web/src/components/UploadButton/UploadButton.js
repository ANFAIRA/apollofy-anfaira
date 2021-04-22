import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bool, func, string } from "prop-types";
import React from "react";

const addSong = <FontAwesomeIcon title="Upload song" icon={faCloudUploadAlt} />;

function UploadButton({ showModal, setShowModal, text }) {
  function handleClick() {
    setShowModal(true);
  }
  return (
    <button
      type="button"
      aria-label="upload a song"
      className="focus:outline-none openModal p-2"
      onClick={handleClick}
    >
      {addSong}
      {text}
    </button>
  );
}

UploadButton.propTypes = {
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
  text: string,
};

UploadButton.defaultProps = {
  text: "",
};

export default UploadButton;
