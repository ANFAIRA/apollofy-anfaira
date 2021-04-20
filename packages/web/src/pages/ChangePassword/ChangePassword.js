import React, { useEffect } from "react";
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
  // const errorMessage = useSelector((state) => state.auth?.passwordChangeError);
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
      passwordIsChanging === false
    ) {
      history.push("/");
    }
  }, [
    passwordIsChanged,
    passwordChangeError,
    passwordIsChanging,
    dispatch,
    history,
  ]);

  return (
    <>
      <Navbar />
      <main className="Login">
        <section className="mt-20">
          <h2 className="mb-8 text-2xl">Change your password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PasswordInput
              name="currentPassword"
              type="password"
              inputClass="form-input"
              {...register("currentPassword", {
                required: true,
              })}
              placeholder="Current password"
            />
            <p>{errors.currentPassword && "Current Password is required"}</p>
            <PasswordInput
              name="newPassword"
              type="password"
              inputClass="form-input"
              {...register("newPassword", {
                required: true,
              })}
              placeholder="New password"
            />
            <p>{errors.newPassword && "New Password is required"}</p>
            <PasswordInput
              name="confirmPassword"
              type="password"
              inputClass="form-input"
              {...register("confirmPassword", {
                required: true,
              })}
              placeholder="Repeat new password"
            />
            <p>{errors.confirmPassword && "Confirm Password is required"}</p>
            <button
              className="btn rounded-full bg-indigo-500 w-full py-3 text-xl font-semibold mt-5"
              type="submit"
            >
              Submit
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default ChangePassword;
