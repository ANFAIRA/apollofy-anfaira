import {
  faHeart as farHeart,
  faPlayCircle as farPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsisH, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { object } from "prop-types";
import React, { useState } from "react";
import "./SongCard.scss";

const playCircle = <FontAwesomeIcon icon={farPlayCircle} />;
const dotsH = <FontAwesomeIcon icon={faEllipsisH} />;

function SongCard({ song }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="my-1 px-1 w-full sm:w-1/2 md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4">
      <div className="card">
        <img
          src="https://kzoomusic.com/wp-content/uploads/2019/11/logo-hd.jpg"
          alt="song-img"
          className="object-contain"
        />
        <div className="card--icons">
          <button
            type="button"
            className="card--icons--icon"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? (
              <FontAwesomeIcon icon={faHeart} />
            ) : (
              <FontAwesomeIcon icon={farHeart} />
            )}
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
