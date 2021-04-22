import React from "react";
import {
  // faHeart,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faPlayCircle as farPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { string } from "prop-types";
import "./SongCard.scss";

const likeOff = <FontAwesomeIcon icon={farHeart} />;
// const likeOn = <FontAwesomeIcon icon={faHeart} />
const playCircle = <FontAwesomeIcon icon={farPlayCircle} />;
const dotsH = <FontAwesomeIcon icon={faEllipsisH} />;

function SongCard({ song }) {
  return (
    <div className="w-1/6 m-3">
      <div className="relative">
        <img
          src="https://kzoomusic.com/wp-content/uploads/2019/11/logo-hd.jpg"
          className="card-image"
          alt="track"
        />
        <div className="card-icons">
          <button type="button" className="card-icons--icon">
            {likeOff}
          </button>
          <button
            type="button"
            className="card-icons--icon  card-icons--icon-play"
          >
            {playCircle}
          </button>
          <button type="button" className="card-icons--icon">
            {dotsH}
          </button>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold">{song.title}</h3>
        <p>Artist</p>
      </div>
    </div>
  );
}

SongCard.propTypes = {
  song: string.isRequired,
};

export default SongCard;
