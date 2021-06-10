import { node } from "prop-types";
import React from "react";
import "./AuthForm.scss";
import appLogo from "../../assets/logo1.png";

const AuthForm = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen authBackground">
        <div className="formShadow md:w-1/2 max-w-lg px-10 pt-5 pb-10 mx-auto my-24 bg-gray-900">
          <div className="grid justify-items-center">
            <img src={appLogo} alt="Apollofy logo" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

AuthForm.propTypes = {
  children: node.isRequired,
};

export default AuthForm;
