import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../components/DeleteModal";
import PlaylistCard from "../../components/PlayListCard";
import SongCard from "../../components/SongCard";
import SongModal from "../../components/SongModal";
import Main from "../../layout/Main";
import { authSelector } from "../../redux/auth/auth-selectors";
import {
  // fetchAllPlaylists,
  fetchPlaylists,
  updateUpdatedPlaylist,
  addCreatedPlaylist,
} from "../../redux/playlist/playlist-actions";
import { playlistTypes } from "../../redux/playlist/playlist-types";
import {
  fetchAllSongs,
  addUploadedSong,
  updateUpdatedSong,
} from "../../redux/song/song-actions";
import { songsTypes } from "../../redux/song/song-type";
import { songSelector } from "../../redux/song/song-selector";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import "./Home.scss";

export default function Home() {
  const { currentUser } = useSelector(authSelector);
  const { songsByID, songEditing } = useSelector((state) => state.song);
  const { ALL_SONGS } = useSelector((state) => state.song.songIds);
  const { uploadSongSuccess, uploadedSong } = useSelector(uploaderSelector);
  const { songUpdateSuccess } = useSelector(songSelector);
  // const { songDeleteSuccess } = useSelector(songSelector);
  const { ALL } = useSelector((state) => state.playlists.playlistIds);
  const {
    playlistsByID,
    playlistUpdateSuccess,
    playlistEditing,
    createdPlaylist,
  } = useSelector((state) => state.playlists);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ALL_SONGS.length === 0) {
      dispatch(fetchAllSongs(songsTypes.ALL_SONGS));
    }
    if (songUpdateSuccess) {
      dispatch(updateUpdatedSong(songEditing.data));
    }
    if (ALL.length === 0) {
      dispatch(fetchPlaylists(playlistTypes.ALL));
    }
    if (playlistUpdateSuccess) {
      dispatch(updateUpdatedPlaylist(playlistEditing.data));
    }
    uploadSongSuccess && dispatch(addUploadedSong(uploadedSong));
    createdPlaylist && dispatch(addCreatedPlaylist(createdPlaylist));
  }, [
    dispatch,
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
      {showModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <SongModal
            setShowModal={setShowModal}
            setIsEditModal={setIsEditModal}
            isEditModal={isEditModal}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
          />
        </section>
      )}
      {showDeleteModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <DeleteModal
            setShowDeleteModal={setShowDeleteModal}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
          />
        </section>
      )}
      <Main>
        <h1 className="text-xl mb-4">Hello {currentUser?.data?.username}</h1>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Songs</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              {ALL_SONGS?.map((song) => (
                <SongCard
                  key={songsByID[song]._id}
                  song={songsByID[song]}
                  setShowModal={setShowModal}
                  setShowDeleteModal={setShowDeleteModal}
                  setIsEditModal={setIsEditModal}
                  setSelectedSong={setSelectedSong}
                />
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
