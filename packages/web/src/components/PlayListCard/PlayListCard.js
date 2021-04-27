import React from "react";
import { object, string } from "prop-types";
import { useHistory } from "react-router-dom";

function PlayListCard({ title, description, location, playlist = null }) {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/${location}`);
  };

  return (
    <div className="my-1 mb-6 px-6 card">
      <button
        type="button"
        className={
          playlist
            ? "relative flex flex-col justify-between w-96 sm:w-96 h-96 bg-center shadow-md overflow-hidden cursor-pointer mt-8 focus:outline-none"
            : "flex flex-col justify-between w-96 sm:w-96 h-96 bg-white bg-center shadow-md overflow-hidden cursor-pointer mt-8 playlist-card focus:outline-none"
        }
        onClick={handleClick}
      >
        {playlist && (
          <img src={playlist ? playlist.thumbnail : ""} alt="thumbnail" />
        )}
        <div className="absolute z-10 bg-purple-800 bg-opacity-85 shadow-md rounded-r-xl p-4 flex flex-col mr-4 mt-56 w-80">
          <h3 className="text-2xl font-bold pb-2 text-left">
            {playlist ? playlist.title : title}
          </h3>
          <p className="truncate text-white-500 text-sm text-left">
            {playlist ? playlist.description : description}
          </p>
        </div>
      </button>
    </div>
  );
}

PlayListCard.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  location: string.isRequired,
  playlist: object,
};

PlayListCard.defaultProps = {
  playlist: null,
};

export default PlayListCard;
