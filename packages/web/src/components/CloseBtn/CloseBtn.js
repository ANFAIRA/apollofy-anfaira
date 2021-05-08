import React from "react";
import { bool } from "prop-types";
import { useDispatch } from "react-redux";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { hideAllModals } from "../../redux/modals/modal-actions";
import {
  setSongToUpdate,
  setSongToDelete,
} from "../../redux/song/song-actions";

const closeBtn = <FontAwesomeIcon icon={faTimes} size="2x" />;

function CloseBtn({ songDeleteModal, songEditModal }) {
  const dispatch = useDispatch();

  function handleCloseBtn() {
    dispatch(hideAllModals());
    songEditModal && dispatch(setSongToUpdate(null));
    songDeleteModal && dispatch(setSongToDelete(null));
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
  songDeleteModal: bool,
  songEditModal: bool,
};

CloseBtn.defaultProps = {
  songDeleteModal: false,
  songEditModal: false,
};

export default CloseBtn;
