import React from "react";
import { useSelector } from "react-redux";
import { node } from "prop-types";

import { modalStateSelector } from "../../redux/modals/modal-selectors";

import Navbar from "../../components/Navbar";
import Player from "../../components/Player";
import PlaylistModal from "../../components/PlaylistModal";
import SongModal from "../../components/SongModal";
import DeleteModal from "../../components/DeleteModal";
import PlaylistDeleteModal from "../../components/PlaylistDeleteModal";

const Main = ({ children }) => {
  const songsToPlay = useSelector((state) => state.player.songsToPlay);
  const {
    showSongModal,
    showPlaylistModal,
    showDeleteModal,
    showPlaylistDeleteModal,
  } = useSelector(modalStateSelector);

  return (
    <>
      {showSongModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <SongModal />
        </section>
      )}
      {showPlaylistModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <PlaylistModal />
        </section>
      )}
      {showDeleteModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <DeleteModal />
        </section>
      )}
      {showPlaylistDeleteModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <PlaylistDeleteModal />
        </section>
      )}
      <Navbar />
      <section className="md:container md:mx-auto p-8 pt-24">
        {children}
      </section>
      <Player songs={songsToPlay} />
    </>
  );
};

Main.propTypes = {
  children: node.isRequired,
};

export default Main;
