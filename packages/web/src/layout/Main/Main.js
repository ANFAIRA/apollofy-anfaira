import React, { useState } from "react";
import { useSelector } from "react-redux";
import { node } from "prop-types";

import { modalStateSelector } from "../../redux/modals/modal-selectors";

import Navbar from "../../components/Navbar";
import Player from "../../components/Player";
import PlaylistModal from "../../components/PlaylistModal";
import SongModal from "../../components/SongModal";
import DeleteModal from "../../components/DeleteModal";

const Main = ({ children }) => {
  // const [showModal, setShowModal] = useState(false);
  // const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  // const [isEditModal, setIsEditModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const songsToPlay = useSelector((state) => state.player.songsToPlay);
  const { showSongModal, showPlaylistModal, showDeleteModal } = useSelector(
    modalStateSelector,
  );

  return (
    <>
      {showSongModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <SongModal
            // showModal={showModal}
            // setShowModal={setShowModal}
            // isEditModal={isEditModal}
            // setIsEditModal={setIsEditModal}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
          />
        </section>
      )}
      {showPlaylistModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <PlaylistModal
          // showPlaylistModal={showPlaylistModal}
          // setShowPlaylistModal={setShowPlaylistModal}
          />
        </section>
      )}
      {showDeleteModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <DeleteModal
            // setShowDeleteModal={setShowDeleteModal}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
          />
        </section>
      )}
      <Navbar
      // showModal={showModal}
      // setShowModal={setShowModal}
      // showPlaylistModal={showPlaylistModal}
      // setShowPlaylistModal={setShowPlaylistModal}
      />
      <section className="md:container md:mx-auto p-8">{children}</section>
      <Player songs={songsToPlay} />
    </>
  );
};

Main.propTypes = {
  children: node.isRequired,
};

export default Main;
