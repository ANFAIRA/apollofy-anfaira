import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelector } from "../../redux/auth/auth-selectors";
import {
  addCreatedPlaylist,
  // fetchAllPlaylists,
  fetchPlaylists,
  updateUpdatedPlaylist,
} from "../../redux/playlist/playlist-actions";
import { playlistTypes } from "../../redux/playlist/playlist-types";
import {
  addUploadedSong,
  fetchAllSongs,
  updateUpdatedSong,
} from "../../redux/song/song-actions";
import { songSelector } from "../../redux/song/song-selector";
import { songsTypes } from "../../redux/song/song-type";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import { uploadSongReset } from "../../redux/uploader/uploader-actions";

import PlaylistCard from "../../components/PlayListCard";
import SongCard from "../../components/SongCard";

import Main from "../../layout/Main";

import { fetchUsers } from "../../redux/user/user-actions";
import { userTypes } from "../../redux/user/user-types";
import "./Home.scss";

export default function Home() {
  const { currentUser } = useSelector(authSelector);
  const { songsByID, songEditing, songUpdateSuccess } = useSelector(
    songSelector,
  );
  const { ALL_SONGS } = useSelector((state) => state.song.songIds);
  const { uploadSongSuccess, uploadedSong } = useSelector(uploaderSelector);
  const { ALL_USERS } = useSelector((state) => state.user.userIds);
  const { ALL } = useSelector((state) => state.playlists.playlistIds);
  const {
    playlistsByID,
    playlistUpdateSuccess,
    playlistEditing,
    createdPlaylist,
  } = useSelector((state) => state.playlists);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ALL_USERS.length === 0) {
      dispatch(fetchUsers(userTypes.ALL_USERS));
    }

    if (ALL_SONGS.length === 0) {
      dispatch(fetchAllSongs(songsTypes.ALL_SONGS));
    }
    if (ALL.length === 0) {
      dispatch(fetchPlaylists(playlistTypes.ALL));
    }
    if (songUpdateSuccess) {
      dispatch(updateUpdatedSong(songEditing.data));
    }
    if (playlistUpdateSuccess) {
      dispatch(updateUpdatedPlaylist(playlistEditing.data));
    }
    uploadSongSuccess && dispatch(addUploadedSong(uploadedSong));
    dispatch(uploadSongReset());
    createdPlaylist && dispatch(addCreatedPlaylist(createdPlaylist));
  }, [
    dispatch,
    ALL_USERS.length,
    ALL_SONGS.length,
    ALL.length,
    playlistUpdateSuccess,
    playlistEditing,
    uploadSongSuccess,
    uploadedSong,
    songUpdateSuccess,
    songEditing,
    createdPlaylist,
  ]);

  return (
    <>
      <Main>
        <h1 className="text-xl mb-4">Hello {currentUser?.data?.username}</h1>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Songs</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              {ALL_SONGS?.map((song) => (
                <SongCard key={songsByID[song]._id} song={songsByID[song]} />
              ))}
            </section>
          </article>
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Playlists</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              {ALL?.map((playlist) => (
                <PlaylistCard
                  key={playlistsByID[playlist]._id}
                  playlist={playlistsByID[playlist]}
                  location={`playlist/${playlistsByID[playlist]._id}`}
                />
              ))}
            </section>
          </article>
        </div>
      </Main>
    </>
  );
}
