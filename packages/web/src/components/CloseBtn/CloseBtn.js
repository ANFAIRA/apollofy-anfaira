import React from "react";
import { useDispatch } from "react-redux";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { hideAllModals } from "../../redux/modals/modal-actions";
import { setTrackToUpdate } from "../../redux/trackEditor/trackEditor-actions";

const closeBtn = <FontAwesomeIcon icon={faTimes} size="2x" />;

function CloseBtn() {
  const dispatch = useDispatch();

  function handleCloseBtn() {
    dispatch(hideAllModals());
    dispatch(setTrackToUpdate({}));
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

export default CloseBtn;
