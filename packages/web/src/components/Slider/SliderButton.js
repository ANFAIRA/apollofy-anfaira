import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { func, string } from "prop-types";
import React from "react";

const SlideButton = ({ onClick, type }) => (
  <button
    type="button"
    className={`slider--button slider--button-${type}`}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={type === "prev" ? faChevronLeft : faChevronRight} />
  </button>
);

SlideButton.propTypes = {
  onClick: func.isRequired,
  type: string.isRequired,
};

export default SlideButton;
