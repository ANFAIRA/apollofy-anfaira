import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { array } from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { calcRemainingTime, formatTime } from "../../utils/utils";
import Controls from "./Controls";
import "./Player.scss";

const Player = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { artist, title, url, thumbnail, duration } = tracks[trackIndex] || "";

  const audioRef = useRef(new Audio(url));
  const intervalRef = useRef();

  const currentTime = formatTime(audioRef.current.currentTime);
  const totalTime = calcRemainingTime(duration, audioRef.current.currentTime);

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";

  const trackStyling = `
  -webkit-gradient(
    linear, 0% 0%, 100% 0%,
    color-stop(${currentPercentage}, #6320ee),
    color-stop(${currentPercentage}, #777)
  )
`;

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
    }, [1000]);
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) setIsPlaying(true);
    startTimer();
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Handle setup when changing tracks
    audioRef.current.pause();
    audioRef.current = new Audio(url);
    setTrackProgress(audioRef.current.currentTime);
  }, [url]);

  return (
    <div className="player">
      <div className="player--wrapper">
        <div className="player--info">
          <img
            src={thumbnail}
            alt={`thumbnail for ${title} by ${artist}`}
            className="player--info--img"
          />
          <div className="player--info--details">
            <h5>{title}</h5>
            <p>{artist}</p>
          </div>
        </div>
        <div className="player--controller">
          <Controls
            isPlaying={isPlaying}
            onPlayPauseClick={setIsPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
          />
          <div className="player--controller--progressBar">
            <p>{currentTime}</p>
            <input
              type="range"
              step="1"
              min="0"
              max={duration || 0}
              style={{ background: trackStyling }}
              value={trackProgress}
              onChange={(e) => onScrub(e.target.value)}
              onMouseUp={onScrubEnd}
              onKeyUp={onScrubEnd}
            />
            <p>{totalTime}</p>
          </div>
        </div>
        <div className="player--actions">
          <button type="button">
            <FontAwesomeIcon icon={faListUl} />
          </button>
          <button
            type="button"
            className="player--actions--icon"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <FontAwesomeIcon icon={isFavorite ? faHeart : farHeart} />
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  tracks: array,
};

Player.defaultProps = {
  tracks: [],
};

export default Player;
