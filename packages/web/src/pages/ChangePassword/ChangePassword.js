import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import {
  changePassword,
  resetPasswordState,
} from "../../redux/auth/auth-actions";
import PasswordInput from "../../components/PasswordInput";

function ChangePassword() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth?.passwordChangeError);
  const history = useHistory();

  const {
    passwordIsChanged,
    passwordChangeError,
    passwordIsChanging,
  } = useSelector((state) => state.auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.newPassword === data.confirmPassword) {
      await dispatch(changePassword(data));
    }
  };

  useEffect(() => {
    dispatch(resetPasswordState());
    if (
      passwordIsChanged === true &&
      passwordChangeError === null &&
      passwordIsChanging == false
    ) {
      history.push("/");
    }
  }, [passwordIsChanged, passwordChangeError, passwordIsChanging]);

  return (
    <>
      <Navbar />
      <main className="Login">
        <section className="Login__wrapper">
          <hr className="mt-1 mb-4" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <PasswordInput
              label="Current Password"
              name="currentPassword"
              labelClass="form-label"
              type="password"
              inputClass="form-input"
              // value={userPassword.currentPassword}
              // onChange={handleChange}
              {...register("currentPassword", {
                required: true,
              })}
            />
            <p>{errors.currentPassword && "Current Password is required"}</p>
            <PasswordInput
              label="New Password"
              name="newPassword"
              labelClass="form-label"
              type="password"
              inputClass="form-input"
              // value={userPassword.newPassword}
              // onChange={handleChange}
              {...register("newPassword", {
                required: true,
              })}
            />
            <p>{errors.newPassword && "New Password is required"}</p>
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              labelClass="form-label"
              type="password"
              inputClass="form-input"
              // value={userPassword.confirmPassword}
              // onChange={handleChange}
              {...register("confirmPassword", {
                required: true,
              })}
            />
            <p>{errors.confirmPassword && "Confirm Password is required"}</p>
            <button className="btn btn-primary w-full" type="submit">
              Submit
            </button>
          </form>
          <section className="mt-4">
            <hr className="mt-1 mb-4" />
          </section>
        </section>
      </main>
    </>
  );
}

export default ChangePassword;
