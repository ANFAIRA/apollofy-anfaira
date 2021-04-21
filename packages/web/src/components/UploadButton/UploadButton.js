import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { bool, func } from "prop-types";

const addSong = <FontAwesomeIcon icon={faPlus} />;

function UploadButton({ showModal, setShowModal }) {
  function handleClick() {
    setShowModal(true);
  }
  return (
    <>
      <button
        type="button"
        className="focus:outline-none openModal"
        onClick={handleClick}
      >
        {addSong}
      </button>
    </>
  );
}

UploadButton.propTypes = {
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
};

export default UploadButton;
