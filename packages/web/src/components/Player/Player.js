import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { object } from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import "./Player.scss";

const Player = ({ tracks }) => {
  const { artist, title, url, thumbnail, duration } = tracks;
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const audioRef = useRef(new Audio(url));
  const intervalRef = useRef();
  const isReady = useRef(false);

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

  const startTimer = () => {
    clearInterval(intervalRef.current);
    // Clear any timers already running
    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
    }, [1000]);
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    // Clear any timers already running
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
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // Handle setup when changing tracks
    audioRef.current.pause();
    audioRef.current = new Audio(url);
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [url]);

  return (
    <div className="player">
      <div className="player--wrapper">
        <div className="player--info">
          <img src={thumbnail} alt="song-img" className="player--info--img" />
          <div className="player--info--details">
            <h5>{title}</h5>
            <p>{artist}</p>
          </div>
        </div>
        <div className="player--controller">
          <Controls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} />
          <div className="player--controller--progressBar">
            <input
              type="range"
              step="1"
              min="0"
              max={duration || 0}
              value={trackProgress}
              style={{ background: trackStyling }}
              onChange={(e) => onScrub(e.target.value)}
              onMouseUp={onScrubEnd}
              onKeyUp={onScrubEnd}
            />
          </div>
        </div>
        <div className="player--actions">
          <button type="button">
            <FontAwesomeIcon icon={faListUl} />
          </button>
          <button type="button" className="player--actions--icon">
            <FontAwesomeIcon icon={isFavorite ? faHeart : farHeart} />
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  tracks: object.isRequired,
};

export default Player;
