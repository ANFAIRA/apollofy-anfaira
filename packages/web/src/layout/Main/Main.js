import { node } from "prop-types";
import React from "react";
import Navbar from "../../components/Navbar";

const Main = ({ children }) => {
  return (
    <>
      <Navbar />
      <section className="md:container md:mx-auto p-8">{children}</section>
    </>
  );
};

Main.propTypes = {
  children: node.isRequired,
};

export default Main;
