import { node } from "prop-types";
import React from "react";
import "./AuthForm.scss";

const AuthForm = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen authBackground">
        <div className="formShadow md:w-1/2 max-w-lg px-10 pt-5 pb-10 mx-auto my-24 bg-gray-900">
          <div className="text-left p-0 font-sans">
            <h1 className=" text-white text-3xl font-medium px-5 py-10">
              APOLLOFY
            </h1>
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
