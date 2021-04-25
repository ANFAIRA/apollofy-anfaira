import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "../../components/SongCard";
import SongModal from "../../components/SongModal";
import Main from "../../layout/Main";
import { authSelector } from "../../redux/auth/auth-selectors";
import { fetchSong } from "../../redux/song/song-actions";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import "./Home.scss";

export default function Home() {
  const { currentUser } = useSelector(authSelector);
  const { data } = useSelector((state) => state.song.songs);
  const { uploadSongSuccess } = useSelector(uploaderSelector);

  const [showModal, setShowModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    uploadSongSuccess ? dispatch(fetchSong()) : dispatch(fetchSong());
  }, [dispatch, uploadSongSuccess]);

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
      <Main>
        <h1 className="text-xl mb-4">Hello {currentUser.data.username}</h1>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <div className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
            {data?.map((song) => (
              <SongCard
                key={song._id}
                song={song}
                setShowModal={setShowModal}
                setIsEditModal={setIsEditModal}
                setSelectedSong={setSelectedSong}
              />
            ))}
          </div>
        </div>
      </Main>
    </>
  );
}
