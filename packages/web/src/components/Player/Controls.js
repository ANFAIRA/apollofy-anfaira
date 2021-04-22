import {
  faBackward,
  faForward,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Controls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="player--controller">
      <div className="player--controller--buttons">
        <button type="button" aria-label="previous">
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button
          type="button"
          aria-label="pause"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button type="button" aria-label="next">
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
      <div className="player--controller--progressBar">
        <input type="range" step="1" min="0" max="300" />
      </div>
    </div>
  );
};

export default Controls;
