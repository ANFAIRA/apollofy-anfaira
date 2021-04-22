import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import AuthForm from "../../layout/AuthForm";

import "./Login.scss";

import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signInWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function Login() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(
    authSelector,
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  const onSubmit = (data) => {
    dispatch(signInWithEmailRequest(data.email, data.password));
  };

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <AuthForm>
      <main className="Login">
        <section className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="email"
              type="email"
              placeholder="email"
              inputClass="form-input"
              onChange={(e) => setValue("email", e.target.value)}
              validation={{
                required: { value: true, message: "Please enter your email" },
              }}
              register={register}
              errors={errors.email}
            />
            <PasswordInput
              name="password"
              type="password"
              placeholder="password"
              inputClass="form-input"
              onChange={(e) => setValue("password", e.target.value)}
              validation={{
                required: {
                  value: true,
                  message: "Please enter your password",
                },
              }}
              register={register}
              errors={errors.password}
            />
            {signUpError && <section className="mt-4">{signUpError}</section>}
            <Link
              to={ROUTES.RESET_PASSWORD}
              className="underline text-blue-gray-200 w-full block mb-8 text-left"
            >
              Reset password
            </Link>
            <button
              className="btn rounded-full bg-indigo-500 w-full py-3 text-xl font-semibold"
              type="submit"
              disabled={isSigningUp}
            >
              Login
            </button>
          </form>
          <button
            className="btn border-gray-400 border-2 rounded-full w-full py-3 text-xl font-semibold"
            type="button"
            onClick={handleLoginWithGoogle}
            disabled={isSigningUp}
          >
            Login with Google
          </button>

          <section className="mt-4">
            <p className="text-center">
              Do not have an account?
              <Link to={ROUTES.SIGN_UP}>
                &nbsp;<span className="font-semibold"> SIGN UP</span>
              </Link>
            </p>
          </section>
        </section>
      </main>
    </AuthForm>
  );
}

export default Login;
