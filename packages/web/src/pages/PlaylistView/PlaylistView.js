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
import { useParams, Link } from "react-router-dom";
import PlaylistDialogue from "../../components/PlaylistDialogue";
import PlayListTable from "../../components/PlayListTable";
import PlayListTableDnd from "../../components/PlayListTableDnd";
import Main from "../../layout/Main";
import { playCollection } from "../../redux/player/player-actions";
import {
  fetchPlaylistById,
  followPlaylist,
} from "../../redux/playlist/playlist-actions";
import {
  playlistItemSelector,
  playlistStateSelector,
  selectPlaylistState,
} from "../../redux/playlist/playlist-selector";
import { collectionTime } from "../../utils/utils";

const PlaylistView = () => {
  const { id } = useParams();
  const { songsByID, songIds, isFetchAllSuccess } = useSelector(
    (state) => state.song,
  );
  const { addingSong, playlistUpdate, deletingSong } = useSelector(
    playlistStateSelector,
  );
  const { isUpdatingPlaylist } = useSelector(selectPlaylistState);
  const currentUser = useSelector((state) => state.auth?.currentUser);

  const playlist = playlistItemSelector(id);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const [isFollow, setIsFollow] = useState(
    playlist?.followedBy.find((like) => like === currentUser._id),
  );

  const handleFollowPlaylist = () => {
    setIsFollow(!isFollow);
    dispatch(followPlaylist(playlist._id, currentUser.firebaseId));
  };

  useEffect(() => {
    !isUpdatingPlaylist && dispatch(fetchPlaylistById(id));
  }, [
    dispatch,
    id,
    addingSong,
    playlistUpdate,
    isUpdatingPlaylist,
    isFollow,
    deletingSong,
  ]);

  if (!playlist) {
    return null;
  }

  const { title, thumbnail, description, author, type, songs } = playlist;
  const fetchedSongs = [];

  if (isFetchAllSuccess) {
    songIds.ALL_SONGS.map((songId) => {
      fetchedSongs.push(songsByID[songId]);
      return songId;
    });
  }

  return (
    <>
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
              <h4 className="mt-0 mb-2 uppercase text-gray-500 songing-widest text-xs">
                {type}
              </h4>
              <h2 className="mt-0 mb-2 text-white text-4xl">{title}</h2>
              <p className="text-gray-600 mb-2 text-sm">{description}</p>
              <div className="flex content-center">
                <Link to={`/users/${author[0]}`}>
                  <p className="text-gray-600 mb-2 text-sm">
                    Created by &nbsp;{" "}
                    <span className="text-white mr-2 text-sm">
                      {author[1].toUpperCase()}
                    </span>
                  </p>
                </Link>
                <p className="text-gray-600 mr-2 text-sm">·</p>
                <p className="text-gray-600 mr-2 text-sm">
                  {songs.length > 0
                    ? `${songs.length} songs`
                    : `${songs.length} song`}
                </p>
                <p className="text-gray-600 mr-2 text-sm">
                  {collectionTime(songs)}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="relative flex">
              <button
                type="button"
                className="mr-2 bg-indigo-500 text-indigo-100 block py-2 px-8 rounded-full focus:outline-none"
                onClick={() => dispatch(playCollection(songs))}
              >
                <FontAwesomeIcon icon={faPlay} />
              </button>
              {currentUser._id !== author[0] ? (
                <button
                  type="button"
                  className="mr-2 block p-2 focus:outline-none"
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
              {isMenuOpen && <PlaylistDialogue playlist={playlist} />}
            </div>
            <p className="text-gray-600 text-sm">
              {playlist.followedBy.length > 1
                ? `${playlist.followedBy.length} FOLLOWERS`
                : `${playlist.followedBy.length} FOLLOWER`}
            </p>
          </div>
          <div className="mt-10">
            <PlayListTableDnd
              fetchedSongs={fetchedSongs}
              songs={songs}
              icon={faPlay}
              playlistId={id}
            />
          </div>
          <div className="mt-10">
            <h2 className="text-gray-300 mb-5 text-xl">Recommended Songs</h2>
            <PlayListTable
              fetchedSongs={fetchedSongs}
              icon={faPlus}
              songs={songs}
            />
          </div>
        </div>
      </Main>
    </>
  );
};

export default PlaylistView;
