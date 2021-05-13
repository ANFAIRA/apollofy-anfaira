import {
  faHeart as farHeart,
  faPlayCircle as farPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsisH, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bool, object } from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playSongAndSaveStats } from "../../redux/player/player-actions";
import { likeSong } from "../../redux/song/song-actions";
import SongDialogue from "../SongDialogue";
import "./SongCard.scss";

const likeOn = <FontAwesomeIcon icon={faHeart} />;
const likeOff = <FontAwesomeIcon icon={farHeart} />;
const dotsH = <FontAwesomeIcon icon={faEllipsisH} />;

function SongCard({ song, slide = false }) {
  const { likedSongs } = useSelector((state) =>
    state.song?.currentUser ? state.song.currentUser : state.auth?.currentUser,
  );

  const { FAVORITE } = useSelector((state) => state?.song?.songIds);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { firebaseId } = useSelector((state) => state.auth?.currentUser);

  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(
    likedSongs?.findIndex((id) => String(id) === String(song._id)) !== -1 ||
      (FAVORITE?.findIndex((id) => String(id) === String(song._id)) !== -1 &&
        true),
  );

  function handleLikeBtn() {
    setIsFavorite(!isFavorite);
    dispatch(likeSong(song._id, firebaseId));
  }

  return (
    <div
      className={
        slide
          ? "my-1 mb-6 px-1"
          : "my-1 mb-6 px-1 w-full max-w-sm sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 lg:my-4 lg:px-4"
      }
    >
      <div className="card">
        <img
          src={song.thumbnail}
          alt="song-img"
          className="object-contain w-full"
        />
        <div className="card--icons">
          <button
            type="button"
            className="card--icons--icon"
            onClick={handleLikeBtn}
          >
            {isFavorite ? likeOn : likeOff}
          </button>
          <button
            type="button"
            aria-label="play"
            className="card--icons--icon  card--icons--icon-play"
            onClick={() => dispatch(playSongAndSaveStats(song))}
          >
            <FontAwesomeIcon icon={farPlayCircle} />
          </button>
          <button
            type="button"
            className="card--icons--icon ou"
            onClick={() => setIsMenuOpen((prevVal) => !prevVal)}
          >
            {dotsH}
          </button>
        </div>
        {isMenuOpen && (
          <SongDialogue
            song={song}
            handleLikeBtn={handleLikeBtn}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-lg">{song.title}</h3>
        <p className="text-gray-400 text-sm text-left leading-4 mt-1">
          {song.artist}
        </p>
      </div>
    </div>
  );
}

SongCard.propTypes = {
  song: object.isRequired,
  slide: bool,
};

SongCard.defaultProps = {
  slide: false,
};

export default SongCard;
