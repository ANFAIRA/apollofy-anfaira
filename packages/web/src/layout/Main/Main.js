import { node } from "prop-types";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SongModal from "../../components/SongModal";

const Main = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  return (
    <>
      {showModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <SongModal
            showModal={showModal}
            setShowModal={setShowModal}
            isEditModal={isEditModal}
            setIsEditModal={setIsEditModal}
          />
        </section>
      )}
      <Navbar showModal={showModal} setShowModal={setShowModal} />
      <section className="md:container md:mx-auto p-8">{children}</section>
    </>
  );
};

Main.propTypes = {
  children: node.isRequired,
};

export default Main;
