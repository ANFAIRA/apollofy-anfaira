import React from "react";
import { object, string } from "prop-types";
import { useHistory } from "react-router-dom";

import "../SongCard/SongCard.scss";

function PlayListCard({ title, location, playlist = null }) {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/${location}`);
  };

  return (
    <div
      className={
        playlist
          ? "my-1 mb-6 px-1 w-full max-w-sm sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 lg:my-4 lg:px-4"
          : "my-1 mb-6 px-1"
      }
    >
      <div className={playlist ? "card" : ""}>
        <button
          type="button"
          className={
            playlist
              ? "relative z-10 flex flex-col justify-center h-full object-cover bg-center shadow-md overflow-hidden cursor-pointer focus:outline-none"
              : "flex flex-col justify-between w-96 sm:w-96 h-96 bg-white bg-center shadow-md overflow-hidden cursor-pointer mt-8 playlist-card focus:outline-none"
          }
          onClick={handleClick}
        >
          {playlist && (
            <img src={playlist ? playlist.thumbnail : ""} alt="thumbnail" />
          )}
          <div
            className={
              playlist
                ? "absolute z-20 bg-purple-800 bg-opacity-85 shadow-md rounded-r-xl px-2 py-2 flex flex-col w-5/6 h-2/6 mt-16"
                : "absolute z-20 bg-purple-800 bg-opacity-85 shadow-md rounded-r-xl p-4 flex flex-col mr-4 mt-56 w-80"
            }
          >
            <h3
              className={
                playlist
                  ? "text-lg font-semibold pb-2 text-left leading-4 break-all"
                  : "text-2xl font-bold pb-2 text-left"
              }
            >
              {playlist ? playlist.title : title}
            </h3>
          </div>
        </button>
      </div>
      {playlist && (
        <p className="text-white-500 text-sm text-left leading-4 mt-2 pb-1">
          {playlist.description.length > 75
            ? playlist.description.slice(0, 75).concat("...")
            : playlist.description}
        </p>
      )}
    </div>
  );
}

PlayListCard.propTypes = {
  title: string.isRequired,
  location: string.isRequired,
  playlist: object,
};

PlayListCard.defaultProps = {
  playlist: null,
};

export default PlayListCard;
