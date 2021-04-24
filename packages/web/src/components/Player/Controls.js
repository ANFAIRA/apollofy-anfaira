import {
  faBackward,
  faForward,
  faPause,
  faPlay,
  faRandom,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bool, func } from "prop-types";
import React from "react";

const Controls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="player--controller--buttons">
      <button type="button" aria-label="repeat" style={{ fontSize: "16px" }}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
      <button type="button" aria-label="previous" onClick={onPrevClick}>
        <FontAwesomeIcon icon={faBackward} />
      </button>
      {isPlaying ? (
        <button
          type="button"
          onClick={() => onPlayPauseClick(false)}
          aria-label="Pause"
          style={{ fontSize: "32px" }}
        >
          <FontAwesomeIcon icon={faPause} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
          style={{ fontSize: "32px" }}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}
      <button type="button" aria-label="next" onClick={onNextClick}>
        <FontAwesomeIcon icon={faForward} />
      </button>
      <button type="button" aria-label="shuffle" style={{ fontSize: "16px" }}>
        <FontAwesomeIcon icon={faRandom} />
      </button>
    </div>
  );
};

Controls.propTypes = {
  isPlaying: bool.isRequired,
  onPlayPauseClick: func.isRequired,
  onNextClick: func.isRequired,
  onPrevClick: func.isRequired,
};

export default Controls;
