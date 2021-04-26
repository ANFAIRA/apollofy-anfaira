import {
  faHeart as farHeart,
  faPlayCircle as farPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsisH, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { object } from "prop-types";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeSong } from "../../redux/song/song-actions";
import "./SongCard.scss";

const likeOn = <FontAwesomeIcon icon={faHeart} />;
const likeOff = <FontAwesomeIcon icon={farHeart} />;
const playCircle = <FontAwesomeIcon icon={farPlayCircle} />;
const dotsH = <FontAwesomeIcon icon={faEllipsisH} />;

function SongCard({ song }) {
  const { firebaseId } = useSelector((state) => state.auth?.currentUser?.data);
  const { likedSongs } = useSelector((state) => state.song.currentUser.data);
  console.log(likedSongs);
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
    <div className="my-1 px-1 w-full sm:w-1/2 md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4">
      <div className="card">
        <img
          src={
            song.thumbnail
              ? song.thumbnail
              : "https://kzoomusic.com/wp-content/uploads/2019/11/logo-hd.jpg"
          }
          alt="song-img"
          className="object-contain"
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
            className="card--icons--icon  card--icons--icon-play"
          >
            {playCircle}
          </button>
          <button type="button" className="card--icons--icon">
            {dotsH}
          </button>
        </div>
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
};

export default SongCard;
