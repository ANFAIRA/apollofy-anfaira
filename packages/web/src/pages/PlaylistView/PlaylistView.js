import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisH, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../layout/Main";
import { playlistItemSelector } from "../../redux/playlist/playlist-selector";
import { songSelector } from "../../redux/song/song-selector";
import { formatTime } from "../../utils/utils";
import "./playlist.scss";

const PlaylistView = () => {
  const { id } = useParams();
  const { songs } = useSelector(songSelector);

  const playlist = playlistItemSelector(id);
  const { title, thumbnail, description, totalTracks, author, type } = playlist;

  const tracks = [
    { title: "my-song", artist: "unknown", genre: "pop", duration: "125.21" },
  ];

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
            <p className="">{author}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <div className="flex">
            <button
              type="button"
              className="mr-2 bg-indigo-500 text-indigo-100 block py-2 px-8 rounded-full"
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
          <div className="flex text-gray-600">
            <div className="p-2 w-12 flex-shrink-0" />
            <div className="p-2 w-12 flex-shrink-0" />
            <div className="p-2 w-full">Title</div>
            <div className="p-2 w-full">Artist</div>
            <div className="p-2 w-full">Genre</div>
            <div className="p-2 w-16 flex-shrink-0">Time</div>
          </div>
          {tracks.map((track) => (
            <div
              key={track._id}
              className="flex border-b border-gray-800 hover:bg-gray-800"
            >
              <button type="button" className="p-3 w-12 flex-shrink-0">
                <FontAwesomeIcon icon={faPlay} />
              </button>
              <button type="button" className="p-3 w-12 flex-shrink-0">
                <FontAwesomeIcon icon={farHeart} />
              </button>
              <div className="p-3 w-full">{track.title}</div>
              <div className="p-3 w-full">{track.artist}</div>
              <div className="p-3 w-full">{track.genre} </div>
              <div className="p-3 w-16 flex-shrink-0">
                {formatTime(track.duration)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2>Recommended Songs</h2>
          <div className="flex text-gray-600">
            <div className="p-2 w-12 flex-shrink-0" />
            <div className="p-2 w-12 flex-shrink-0" />
            <div className="p-2 w-full">Title</div>
            <div className="p-2 w-full">Artist</div>
            <div className="p-2 w-full">Genre</div>
            <div className="p-2 w-16 flex-shrink-0">Time</div>
          </div>
          {songs.data.map((song) => (
            <div
              key={song._id}
              className="flex border-b border-gray-800 hover:bg-gray-800"
            >
              <button type="button" className="p-3 w-12 flex-shrink-0">
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button type="button" className="p-3 w-12 flex-shrink-0">
                <FontAwesomeIcon icon={farHeart} />
              </button>
              <div className="p-3 w-full">{song.title}</div>
              <div className="p-3 w-full">{song.artist}</div>
              <div className="p-3 w-full">{song.genre} </div>
              <div className="p-3 w-16 flex-shrink-0">
                {formatTime(song.duration)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
};

export default PlaylistView;
