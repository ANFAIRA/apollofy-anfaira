import { node } from "prop-types";
import React from "react";

const AuthForm = ({ children }) => {
  return <section className="md:container md:mx-auto p-8">{children}</section>;
};

AuthForm.propTypes = {
  children: node.isRequired,
};

export default AuthForm;
