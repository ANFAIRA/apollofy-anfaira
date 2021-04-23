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

const Controls = ({ isPlaying, onPlayPauseClick }) => {
  return (
    <div className="player--controller--buttons">
      <button type="button" aria-label="repeat" style={{ fontSize: "18px" }}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
      <button type="button" aria-label="previous">
        <FontAwesomeIcon icon={faBackward} />
      </button>
      {isPlaying ? (
        <button
          type="button"
          onClick={() => onPlayPauseClick(false)}
          aria-label="Pause"
        >
          <FontAwesomeIcon icon={faPause} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}
      <button type="button" aria-label="next">
        <FontAwesomeIcon icon={faForward} />
      </button>
      <button type="button" aria-label="shuffle" style={{ fontSize: "18px" }}>
        <FontAwesomeIcon icon={faRandom} />
      </button>
    </div>
  );
};

Controls.propTypes = {
  isPlaying: bool.isRequired,
  onPlayPauseClick: func.isRequired,
};

export default Controls;
