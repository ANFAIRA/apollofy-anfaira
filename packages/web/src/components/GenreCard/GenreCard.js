import { object, string } from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import defaultImg from "../../assets/genre.png";

function GenreCard({ genre = null, location }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${location}`);
  };

  return (
    genre && (
      <div className="my-1 mb-6 px-1">
        <div className="card">
          <button
            type="button"
            className="relative z-10 flex flex-col justify-center h-full object-cover bg-center shadow-md overflow-hidden cursor-pointer focus:outline-none"
            onClick={handleClick}
          >
            <img src={defaultImg} alt="thumbnail" />
            <div className="absolute z-20 bg-indigo-900 bg-opacity-85 shadow-md rounded-r-xl px-2 py-2 flex flex-col w-5/6 h-2/6 mt-16">
              <h3 className="text-lg font-semibold pb-2 text-left leading-4 break-all">
                {genre.metadata.name}
              </h3>
            </div>
          </button>
        </div>
      </div>
    )
  );
}

GenreCard.propTypes = {
  genre: object,
  location: string.isRequired,
};

GenreCard.defaultProps = {
  genre: null,
};

export default GenreCard;
