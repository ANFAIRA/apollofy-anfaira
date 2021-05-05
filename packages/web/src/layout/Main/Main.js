import { node } from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Player from "../../components/Player";
import PlaylistModal from "../../components/PlaylistModal/PlaylistModal";
import SongModal from "../../components/SongModal";

const Main = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const songsToPlay = useSelector((state) => state.player.songsToPlay);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <>
      {showModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <SongModal
            showModal={showModal}
            setShowModal={setShowModal}
            isEditModal={isEditModal}
            setIsEditModal={setIsEditModal}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
          />
        </section>
      )}
      {showPlaylistModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <PlaylistModal
            showPlaylistModal={showPlaylistModal}
            setShowPlaylistModal={setShowPlaylistModal}
          />
        </section>
      )}
      <Navbar
        showModal={showModal}
        setShowModal={setShowModal}
        showPlaylistModal={showPlaylistModal}
        setShowPlaylistModal={setShowPlaylistModal}
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
