import { node } from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Player from "../../components/Player";
import SongModal from "../../components/SongModal";

const Main = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const tracksToPlay = useSelector((state) => state.player.tracksToPlay);

  return (
    <>
      <Navbar showModal={showModal} setShowModal={setShowModal} />
      {showModal && (
        <section className="w-screen h-screen p-8 fixed z-10 bg-gray-900 bg-opacity-90">
          <SongModal showModal={showModal} setShowModal={setShowModal} />
        </section>
      )}
      <section className="md:container md:mx-auto p-8">{children}</section>
      <Player tracks={tracksToPlay} />
    </>
  );
};

Main.propTypes = {
  children: node.isRequired,
};

export default Main;
