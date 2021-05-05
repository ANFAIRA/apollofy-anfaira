import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../components/DeleteModal";
import PlaylistCard from "../../components/PlayListCard";
import SongCard from "../../components/SongCard";
import SongModal from "../../components/SongModal";
import Main from "../../layout/Main";
import { authSelector } from "../../redux/auth/auth-selectors";
import {
  fetchAllPlaylists,
  // fetchPlaylists,
} from "../../redux/playlist/playlist-actions";
// import { playlistTypes } from "../../redux/playlist/playlist-types";
import { fetchSong } from "../../redux/song/song-actions";
import { songDeleteSelector } from "../../redux/songDelete/songDelete-selectors";
import { songEditorSelector } from "../../redux/songEditor/songEditor-selectors";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import "./Home.scss";

export default function Home() {
  const { currentUser } = useSelector(authSelector);
  const { songsByID, songsIds } = useSelector((state) => state.song);
  const { uploadSongSuccess } = useSelector(uploaderSelector);
  const { songUpdateSuccess } = useSelector(songEditorSelector);
  const { songDeleteSuccess } = useSelector(songDeleteSelector);
  const { ALL } = useSelector((state) => state.playlists.playlistIds);
  const { playlistByID } = useSelector((state) => state.playlists);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const dispatch = useDispatch();
  // const fetchedSongs = [];

  // if (fetchSong) {
  //   songsIds.map((id) => {
  //     fetchedSongs.push(songsByID[id]);
  //     return id;
  //   });
  // }

  useEffect(() => {
    // fetchedSongs.length == 0 &&
    dispatch(fetchSong());
    dispatch(fetchAllPlaylists());
    // dispatch(fetchPlaylists(playlistTypes.ALL));
  }, [dispatch, uploadSongSuccess, songUpdateSuccess, songDeleteSuccess]);

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
              {songsIds?.map((song) => (
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
                  key={playlistByID[playlist]._id}
                  playlist={playlistByID[playlist]}
                  location={`playlist/${playlistByID[playlist]._id}`}
                />
              ))}
            </section>
          </article>
        </div>
      </Main>
    </>
  );
}
