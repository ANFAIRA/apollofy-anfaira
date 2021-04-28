import React from "react";
import { func } from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const closeBtn = <FontAwesomeIcon icon={faTimes} size="2x" />;

function CloseBtn({ setShowModal }) {
  function handleCloseBtn() {
    setShowModal(false);
  }
  return (
    <div className="relative h-10">
      <button
        className="absolute top-3 right-5"
        type="button"
        onClick={handleCloseBtn}
      >
        <i className="text-gray-400 hover:text-gray-100">{closeBtn}</i>
      </button>
    </div>
  );
}

CloseBtn.propTypes = {
  setShowModal: func.isRequired,
};

export default CloseBtn;
