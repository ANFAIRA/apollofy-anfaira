import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { func, object, oneOfType, string } from "prop-types";

import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisH,
  faHeart,
  faPlay,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayListTable from "../../components/PlayListTable";
import Main from "../../layout/Main";
import {
  fetchPlaylistById,
  followPlaylist,
} from "../../redux/playlist/playlist-actions";
import {
  playlistItemSelector,
  playlistStateSelector,
} from "../../redux/playlist/playlist-selector";
import { songSelector } from "../../redux/song/song-selector";
import { playCollection } from "../../redux/player/player-actions";
import { fetchPlaylistById } from "../../redux/playlist/playlist-actions";

import PlayListTable from "../../components/PlayListTable";
import PlaylistDialogue from "../../components/PlaylistDialogue";
import DeleteModal from "../../components/DeleteModal";
import Main from "../../layout/Main";

import "./playlist.scss";

const PlaylistView = ({
  setShowModal,
  setIsEditModal,
  selectedTrack,
  setSelectedTrack,
}) => {
  const { id } = useParams();
  const { songs } = useSelector(songSelector);
  const { addingSong } = useSelector(playlistStateSelector);
  const currentUser = useSelector((state) => state.auth?.currentUser);

  const playlist = playlistItemSelector(id);

  const { title, thumbnail, description, author, type, tracks, _id } = playlist;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const dispatch = useDispatch();

  const [isFollow, setIsFollow] = useState(
    playlist.followedBy.find((like) => like === currentUser.data._id),
  );

  const handleFollowPlaylist = () => {
    setIsFollow(!isFollow);
    dispatch(followPlaylist(playlist._id, currentUser.data.firebaseId));
  };

  useEffect(() => {
    dispatch(fetchPlaylistById(_id));
  }, [dispatch, _id, addingSong]);

  return (
    <>
      {showDeleteModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <DeleteModal
            setShowDeleteModal={setShowDeleteModal}
            selectedTrack={selectedPlaylist}
            setSelectedTrack={setSelectedPlaylist}
          />
        </section>
      )}
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
              <div className="flex content-center">
                <p className="text-gray-600 mb-2 text-sm">
                  Created by &nbsp;{" "}
                  <span className="text-white mr-2 text-sm">
                    {author[1].toUpperCase()}
                  </span>
                </p>
                <p className="text-white mr-2 text-sm">·</p>
                <p className="text-gray-600 mr-2 text-sm">
                  {tracks.length > 0
                    ? `${tracks.length} songs`
                    : `${tracks.length} song`}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="relative flex">
              <button
                type="button"
                className="mr-2 bg-indigo-500 text-indigo-100 block py-2 px-8 rounded-full focus:outline-none"
                onClick={() => dispatch(playCollection(tracks))}
              >
                <FontAwesomeIcon icon={faPlay} />
              </button>
              {currentUser.data._id !== author[0] ? (
                <button
                  type="button"
                  className="mr-2 block p-2"
                  onClick={handleFollowPlaylist}
                >
                  <FontAwesomeIcon icon={isFollow ? faHeart : farHeart} />
                </button>
              ) : (
                ""
              )}

              <button
                type="button"
                className="mr-2 block p-2 focus:outline-none"
                onClick={() => setIsMenuOpen((prevVal) => !prevVal)}
              >
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
              {isMenuOpen && (
                <PlaylistDialogue
                  setShowModal={setShowModal}
                  setShowDeleteModal={setShowDeleteModal}
                  setIsEditModal={setIsEditModal}
                  selectedPlaylist={playlist}
                  setSelectedPlaylist={setSelectedPlaylist}
                />
              )}
            </div>
            <p className="text-gray-600 text-sm">
              {playlist.followedBy.length > 1
                ? `${playlist.followedBy.length} FOLLOWERS`
                : `${playlist.followedBy.length} FOLLOWER`}
            </p>
          </div>
          <div className="mt-10">
            <PlayListTable songs={tracks} icon={faPlay} />
          </div>
          <div className="mt-10">
            <h2 className="text-gray-300 mb-5 text-xl">Recommended Songs</h2>
            <PlayListTable songs={songs.data} icon={faPlus} playlistId={id} />
          </div>
        </div>
      </Main>
    </>
  );
};

PlaylistView.propTypes = {
  selectedTrack: object.isRequired,
  setShowModal: oneOfType([string, func]),
  setIsEditModal: oneOfType([string, func]),
  setSelectedTrack: oneOfType([string, func]),
};

PlaylistView.defaultProps = {
  setShowModal: "",
  setIsEditModal: "",
  setSelectedTrack: "",
};

export default PlaylistView;
