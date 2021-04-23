import {
  faHeart as farHeart,
  faPlayCircle as farPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsisH, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bool, func, object } from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { playSong } from "../../redux/player/player-actions";
import SongDialogue from "../SongDialogue";
import "./SongCard.scss";

const dotsH = <FontAwesomeIcon icon={faEllipsisH} />;

function SongCard({
  song,
  setShowModal,
  setIsEditModal,
  selectedSong,
  setSelectedSong,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="my-1 mb-6 px-1 w-full max-w-sm sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 lg:my-4 lg:px-4">
      <div className="card">
        <img
          src={
            song.thumbnail
              ? song.thumbnail
              : "https://kzoomusic.com/wp-content/uploads/2019/11/logo-hd.jpg"
          }
          alt="song-img"
          className="object-contain w-full"
        />
        <div className="card--icons">
          <button
            type="button"
            className="card--icons--icon"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <FontAwesomeIcon icon={isFavorite ? faHeart : farHeart} />
          </button>
          <button
            type="button"
            aria-label="play"
            className="card--icons--icon  card--icons--icon-play"
            onClick={() => dispatch(playSong(song))}
          >
            <FontAwesomeIcon icon={farPlayCircle} />
          </button>
          <button
            type="button"
            className="card--icons--icon"
            onClick={() => setIsMenuOpen((prevVal) => !prevVal)}
          >
            {dotsH}
          </button>
        </div>
        {isMenuOpen && (
          <SongDialogue
            setShowModal={setShowModal}
            setIsEditModal={setIsEditModal}
            song={song}
            setSelectedSong={setSelectedSong}
            selectedSong={selectedSong}
          />
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-2xl">{song.title}</h3>
        {song?.artist?.map((artist) => (
          <p key={song._id}>{artist}</p>
        ))}
      </div>
    </div>
  );
}

SongCard.propTypes = {
  song: object.isRequired,
  setShowModal: func.isRequired,
  setIsEditModal: func,
  selectedSong: bool.isRequired,
  setSelectedSong: func.isRequired,
};

SongCard.defaultProps = {
  setIsEditModal: "",
};

export default SongCard;
