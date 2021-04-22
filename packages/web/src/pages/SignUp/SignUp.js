import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import AuthForm from "../../layout/AuthForm";

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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  const onSubmit = (data) => {
    dispatch(signUpWithEmailRequest(data));
  };

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <AuthForm>
      <main className="SignUp">
        <section className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">SignUp</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="username"
              type="text"
              placeholder="username"
              inputClass="form-input"
              validation={{
                required: {
                  value: true,
                  message: "Please enter your username",
                },
              }}
              register={register}
              errors={errors.username}
            />
            <Input
              name="firstName"
              type="text"
              placeholder="first name"
              inputClass="form-input"
              validation={{
                required: {
                  value: true,
                  message: "Please enter your first name",
                },
              }}
              register={register}
              errors={errors.firstName}
            />
            <Input
              name="lastName"
              type="text"
              placeholder="last name"
              inputClass="form-input"
              validation={{
                required: {
                  value: true,
                  message: "Please enter your last name",
                },
              }}
              register={register}
              errors={errors.lastName}
            />
            <Input
              name="email"
              type="text"
              placeholder="email"
              inputClass="form-input"
              validation={{
                required: { value: true, message: "Please enter your email" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a correct email address",
                },
              }}
              register={register}
              errors={errors.email}
            />
            <PasswordInput
              name="password"
              type="password"
              placeholder="password"
              inputClass="form-input"
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
            <button
              className="btn rounded-full bg-indigo-500 w-full py-3 text-xl font-semibold"
              type="submit"
              disabled={isSigningUp}
            >
              Sign Up
            </button>
          </form>
          <button
            className="btn border-gray-400 border-2 rounded-full w-full py-3 text-xl font-semibold"
            type="button"
            onClick={handleLoginWithGoogle}
            disabled={isSigningUp}
          >
            SignUp with Google
          </button>
          <section className="mt-4">
            <p className="text-center">
              Already have an account?
              <Link to={ROUTES.LOGIN}>
                &nbsp;<span className="font-semibold">LOG IN</span>
              </Link>
            </p>
          </section>
        </section>
      </main>
    </AuthForm>
  );
}

export default SignUp;
