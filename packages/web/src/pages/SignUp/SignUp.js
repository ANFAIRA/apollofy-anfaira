import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./SignUp.scss";

import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signUpWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function SignUp() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(
    authSelector,
  );

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signUpWithEmailRequest(formData));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <main className="SignUp">
        <section className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">SignUp</h1>
          <hr className="my-4" />
          <button
            className="btn btn-primary w-full"
            type="button"
            onClick={handleLoginWithGoogle}
            disabled={isSigningUp}
          >
            SignUp with Google
          </button>
          <hr className="mt-1 mb-4" />
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor="firstName" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
            />
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isSigningUp}
            >
              Sign Up
            </button>
          </form>
          {signUpError && <section className="mt-4">{signUpError}</section>}
          <section className="mt-4">
            <hr className="mt-1 mb-4" />
            <Link
              to={ROUTES.RESET_PASSWORD}
              className="underline text-blue-gray-200 w-full text-center block"
            >
              Reset password
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}

export default SignUp;
