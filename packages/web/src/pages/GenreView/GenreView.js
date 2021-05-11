import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisH,
  faHeart,
  faPlay,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PlaylistDialogue from "../../components/PlaylistDialogue";
import PlayListTable from "../../components/PlayListTable";
import Main from "../../layout/Main";
import { playCollection } from "../../redux/player/player-actions";
import { collectionTime } from "../../utils/utils";
import defaultImg from "../../assets/background_cover.jpeg";

const GenreView = () => {
  const { id } = useParams();
  const { songsByID } = useSelector((state) => state.song);
  const { genresByID } = useSelector((state) => state.genre);

  const songsInGenre = [];

  for (const song in songsByID) {
    if (songsByID[song].genre === id) {
      songsInGenre.push(songsByID[song]);
    }
  }

  const currentUser = useSelector((state) => state.auth?.currentUser);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      <Main>
        <div className="text-gray-300 min-h-screen p-10">
          <div className="flex">
            <img
              src={defaultImg}
              alt="genry-img"
              className="mr-6"
              width="200"
              height="200"
            />
            <div className="flex flex-col justify-center">
              <h4 className="mt-0 mb-2 uppercase text-gray-500 songing-widest text-xs">
                Songs in Genre
              </h4>
              <h2 className="mt-0 mb-2 text-white text-4xl">
                {genresByID[id]?.metadata.name}
              </h2>
              <div className="flex content-center">
                <p className="text-gray-600 mb-2 text-sm">
                  Created by &nbsp;{" "}
                  <span className="text-white mr-2 text-sm">Apollofy</span>
                </p>
                <p className="text-gray-600 mr-2 text-sm">·</p>
                <p className="text-gray-600 mr-2 text-sm">
                  {songsInGenre.length > 0
                    ? `${songsInGenre.length} songs`
                    : `${songsInGenre.length} song`}
                </p>
                <p className="text-gray-600 mr-2 text-sm">
                  {collectionTime(songsInGenre)}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="relative flex">
              <button
                type="button"
                className="mr-2 bg-indigo-500 text-indigo-100 block py-2 px-8 rounded-full focus:outline-none"
                onClick={() => dispatch(playCollection(songsInGenre))}
              >
                <FontAwesomeIcon icon={faPlay} />
              </button>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-gray-300 mb-5 text-xl">Songs</h2>
            <PlayListTable
              songs={songsInGenre}
              icon={faPlay}
              fetchedSongs={["genre"]}
            />
          </div>
        </div>
      </Main>
    </>
  );
};

export default GenreView;
