import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisH, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  playlistItemSelector,
  playlistStateSelector,
} from "../../redux/playlist/playlist-selector";
import { songSelector } from "../../redux/song/song-selector";
import { playCollection } from "../../redux/player/player-actions";
import { fetchPlaylistById } from "../../redux/playlist/playlist-actions";

import PlayListTableLikedSongs from "../../components/PlayListTableLikedSongs";
import PlayListTable from "../../components/PlayListTable";
import Main from "../../layout/Main";

import "./playlist.scss";

const PlaylistView = () => {
  const { id } = useParams();
  const { songs } = useSelector(songSelector);
  const { addingSong } = useSelector(playlistStateSelector);

  const playlist = playlistItemSelector(id);

  const {
    title,
    thumbnail,
    description,
    totalTracks,
    author,
    type,
    tracks,
    _id,
  } = playlist;
  console.log(playlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylistById(_id));
  }, [dispatch, _id, addingSong]);

  return (
    <Main>
      <div className="text-gray-300 min-h-screen p-10">
        <div className="flex">
          <img
            src={thumbnail}
            alt="playlist-img"
            className="mr-6"
            width="200"
            height="200"
          />
          <div className="flex flex-col justify-center">
            <h4 className="mt-0 mb-2 uppercase text-gray-500 tracking-widest text-xs">
              {type}
            </h4>
            <h2 className="mt-0 mb-2 text-white text-4xl">{title}</h2>
            <p className="text-gray-600 mb-2 text-sm">{description}</p>
            <p className="text-gray-600 text-sm">{totalTracks}</p>
            <p className="">{author[1]}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <div className="flex">
            <button
              type="button"
              className="mr-2 bg-indigo-500 text-indigo-100 block py-2 px-8 rounded-full"
              onClick={() => dispatch(playCollection(tracks))}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button type="button" className="mr-2 block p-2 ">
              <FontAwesomeIcon icon={farHeart} />
            </button>
            <button type="button" className="mr-2 block p-2">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </div>
        </div>
        <div className="mt-10">
          {console.log(playlist)}
          <PlayListTableLikedSongs
            songs={tracks}
            icon={faPlay}
            playlistId={id}
          />
        </div>
        <div className="mt-10">
          <h2>Recommended Songs</h2>
          <PlayListTable songs={songs.data} icon={faPlus} playlistId={id} />
        </div>
      </div>
    </Main>
  );
};

export default PlaylistView;
