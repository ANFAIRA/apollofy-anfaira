import { node } from "prop-types";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SongModal from "../../components/SongModal";

const Main = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Navbar showModal={showModal} setShowModal={setShowModal} />
      <section>
        {showModal && (
          <SongModal showModal={showModal} setShowModal={setShowModal} />
        )}
      </section>
      <section className="md:container md:mx-auto p-8">{children}</section>
    </>
  );
};

Main.propTypes = {
  children: node.isRequired,
};

export default Main;
