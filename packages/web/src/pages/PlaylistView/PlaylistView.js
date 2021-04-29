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
import PlayListTable from "../../components/PlayListTable";
import Main from "../../layout/Main";
import { playCollection } from "../../redux/player/player-actions";
import {
  fetchPlaylistById,
  followPlaylist,
} from "../../redux/playlist/playlist-actions";
import {
  playlistItemSelector,
  playlistStateSelector,
} from "../../redux/playlist/playlist-selector";
import { songSelector } from "../../redux/song/song-selector";

const PlaylistView = () => {
  const { id } = useParams();
  const { songs } = useSelector(songSelector);
  const { addingSong } = useSelector(playlistStateSelector);
  const currentUser = useSelector((state) => state.auth?.currentUser);

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

            <button type="button" className="mr-2 block p-2">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </div>
        </div>
        <div className="mt-10">
          <PlayListTable songs={tracks} icon={faPlay} />
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
