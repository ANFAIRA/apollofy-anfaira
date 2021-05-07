import {
  faHeart as farHeart,
  faPlayCircle as farPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsisH, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { func, object, oneOfType, string } from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../../redux/player/player-actions";
import { likeSong } from "../../redux/song/song-actions";
import SongDialogue from "../SongDialogue";
import "./SongCard.scss";

const likeOn = <FontAwesomeIcon icon={faHeart} />;
const likeOff = <FontAwesomeIcon icon={farHeart} />;
const dotsH = <FontAwesomeIcon icon={faEllipsisH} />;

function SongCard({
  song,
  setShowModal,
  setShowDeleteModal,
  setIsEditModal,
  setSelectedSong,
}) {
  const { likedSongs } = useSelector((state) =>
    state.song?.currentUser?.data
      ? state.song.currentUser.data
      : state.auth?.currentUser?.data,
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { firebaseId } = useSelector((state) => state.auth?.currentUser?.data);

  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(
    likedSongs?.findIndex((id) => String(id) === String(song._id)) !== -1 &&
      true,
  );

  function handleLikeBtn() {
    setIsFavorite(!isFavorite);
    dispatch(likeSong(song._id, firebaseId));
  }

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
            onClick={handleLikeBtn}
          >
            {isFavorite ? likeOn : likeOff}
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
            className="card--icons--icon ou"
            onClick={() => setIsMenuOpen((prevVal) => !prevVal)}
          >
            {dotsH}
          </button>
        </div>
        {isMenuOpen && (
          <SongDialogue
            setShowModal={setShowModal}
            setShowDeleteModal={setShowDeleteModal}
            setIsEditModal={setIsEditModal}
            song={song}
            setSelectedSong={setSelectedSong}
            handleLikeBtn={handleLikeBtn}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-lg">{song.title}</h3>
        <p>{song.artist}</p>
        {/* {song?.artist?.map((artist) => (
          <p key={song._id} className="text-sm">
            {artist}
          </p>
        ))} */}
      </div>
    </div>
  );
}

SongCard.propTypes = {
  song: object.isRequired,
  setShowModal: oneOfType([string, func]),
  setShowDeleteModal: oneOfType([string, func]),
  setIsEditModal: oneOfType([string, func]),
  setSelectedSong: oneOfType([string, func]),
};

SongCard.defaultProps = {
  setShowModal: "",
  setShowDeleteModal: "",
  setIsEditModal: "",
  setSelectedSong: "",
};

export default SongCard;
