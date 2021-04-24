import React from "react";
import { string } from "prop-types";
import { useHistory } from "react-router-dom";

function PlayListCard({ title, description, location }) {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/${location}`);
  };

  return (
    <div className="my-1 mb-6 px-6 card">
      <button
        type="button"
        className="flex flex-col justify-between w-96 sm:w-96 h-96 bg-white bg-center shadow-md overflow-hidden cursor-pointer mt-8 playlist-card focus:outline-none"
        onClick={handleClick}
      >
        <div className="bg-purple-800 bg-opacity-85 shadow-md rounded-r-xl p-4 flex flex-col mr-4 mt-56 w-80">
          <h3 className="text-2xl font-bold pb-2 text-left">{title}</h3>
          <p className="truncate text-white-500 text-sm text-left">
            {description}
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
};

export default PlayListCard;