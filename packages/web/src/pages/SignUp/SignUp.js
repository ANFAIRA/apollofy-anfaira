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
              label="Username"
              name="username"
              labelClass="form-label"
              type="text"
              inputClass="form-input"
              {...register("username", {
                required: true,
              })}
              placeholder="username"
            />
            <p>{errors.username && "Username is required"}</p>
            <Input
              label="First Name"
              name="firstName"
              labelClass="form-label"
              type="text"
              inputClass="form-input"
              {...register("firstName", { required: true })}
              placeholder="first name"
            />
            <p>{errors.firstName && "First name is required"}</p>
            <Input
              label="Last Name"
              name="lastName"
              labelClass="form-label"
              type="text"
              inputClass="form-input"
              {...register("lastName", {
                required: true,
              })}
              placeholder="last name"
            />
            <p>{errors.lastName && "Last name is required"}</p>
            <Input
              label="Email"
              name="email"
              labelClass="form-label"
              type="text"
              inputClass="form-input"
              {...register(
                "email",
                {
                  required: true,
                },
                { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
              )}
              placeholder="email"
            />
            <p>{errors.email && "Email is required"}</p>
            <PasswordInput
              label="Password"
              name="password"
              labelClass="form-label"
              type="password"
              inputClass="form-input"
              {...register("password", { required: true })}
              placeholder="password"
            />
            <p>{errors.password && "Password is required"}</p>
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
          {signUpError && <section className="mt-4">{signUpError}</section>}
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
