import { func, object, string } from "prop-types";
import React from "react";

function UploadButton({ setShowModal, text, icon }) {
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
      {icon}
      {text}
    </button>
  );
}

UploadButton.propTypes = {
  setShowModal: func.isRequired,
  icon: object.isRequired,
  text: string,
};

UploadButton.defaultProps = {
  text: "",
};

export default UploadButton;
