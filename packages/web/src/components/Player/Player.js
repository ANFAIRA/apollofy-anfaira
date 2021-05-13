import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { array } from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeSong } from "../../redux/song/song-actions";
import { calcRemainingTime, formatTime } from "../../utils/utils";
import Controls from "./Controls";
import "./Player.scss";

const Player = ({ songs }) => {
  const [songIndex, setSongIndex] = useState(0);
  const [songProgress, setSongProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { artist, title, url, thumbnail, _id, likedBy } =
    songs[songIndex] || "";

  const audioRef = useRef(new Audio(url));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const currentTime = formatTime(audioRef.current.currentTime);
  const totalTime = calcRemainingTime(duration, audioRef.current.currentTime);

  const { currentUser } = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(
    likedBy?.findIndex((id) => String(id) === String(currentUser._id)) !== -1 &&
      true,
  );
  const dispatch = useDispatch();

  function handleLikeBtn() {
    setIsFavorite(!isFavorite);
    dispatch(likeSong(_id, currentUser.firebaseId));
  }
  const currentPercentage = duration
    ? `${(songProgress / duration) * 100}%`
    : "0%";

  const songStyling = `
  -webkit-gradient(
    linear, 0% 0%, 100% 0%,
    color-stop(${currentPercentage}, #6320ee),
    color-stop(${currentPercentage}, #777)
  )
`;

  const likeOn = <FontAwesomeIcon icon={faHeart} />;
  const likeOff = <FontAwesomeIcon icon={farHeart} />;

  const toPrevSong = () => {
    if (songIndex - 1 < 0) {
      setSongIndex(songs.length - 1);
    } else {
      setSongIndex(songIndex - 1);
    }
  };

  const toNextSong = () => {
    if (songIndex < songs.length - 1) {
      setSongIndex(songIndex + 1);
    } else {
      setSongIndex(0);
    }
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSongProgress(audioRef.current.currentTime);
    }, [1000]);
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setSongProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) setIsPlaying(true);
    startTimer();
  };

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

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
    // Handle setup when changing songs
    setIsFavorite(
      likedBy?.findIndex((id) => String(id) === String(currentUser._id)) !==
        -1 && true,
    );
    audioRef.current.pause();
    audioRef.current = new Audio(url);
    setSongProgress(audioRef.current.currentTime);
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [url, likedBy, currentUser._id]);

  return (
    <div className="player">
      <div className="player--wrapper">
        <div className="player--info">
          <img
            src={thumbnail}
            alt={thumbnail ? `song thumbnail for ${title} by ${artist}` : ""}
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
            onPrevClick={toPrevSong}
            onNextClick={toNextSong}
          />
          <div className="player--controller--progressBar">
            <p>{currentTime}</p>
            <input
              type="range"
              step="1"
              min="0"
              max={duration || 0}
              style={{ background: songStyling }}
              value={songProgress}
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
            onClick={handleLikeBtn}
          >
            {isFavorite ? likeOn : likeOff}
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  songs: array,
};

Player.defaultProps = {
  songs: [],
};

export default Player;
