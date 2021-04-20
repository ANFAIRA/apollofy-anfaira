import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const addSong = <FontAwesomeIcon icon={faPlus} />;

function UploadButton() {
  return (
    <>
      <button type="button" className="focus:outline-none">
        {addSong}
      </button>
    </>
  );
}

export default UploadButton;
