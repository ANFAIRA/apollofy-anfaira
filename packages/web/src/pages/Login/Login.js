import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import AuthForm from "../../layout/AuthForm";
import {
  resetAuthState,
  signInWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";
import * as ROUTES from "../../routes";
import "./Login.scss";

function Login() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(
    authSelector,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signInWithEmailRequest(email, password));

    setEmail("");
    setPassword("");
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <AuthForm>
      <main className="Login">
        <section className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <hr className="my-4" />
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-input"
              value={email}
              onChange={handleSetEmail}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={handleSetPassword}
            />
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isSigningUp}
            >
              Login
            </button>
          </form>
          <button
            className="btn btn-primary w-full"
            type="button"
            onClick={handleLoginWithGoogle}
            disabled={isSigningUp}
          >
            Login with Google
          </button>
          {signUpError && <section className="mt-4">{signUpError}</section>}
          <section className="mt-4">
            <hr className="mt-1 mb-4" />
            <p>
              Do not have an account?
              <Link to={ROUTES.SIGN_UP}>&nbsp; Sign Up</Link>
            </p>
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
    </AuthForm>
  );
}

export default Login;
