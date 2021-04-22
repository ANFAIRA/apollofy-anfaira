import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Main from "../../layout/Main";
import {
  changePassword,
  resetPasswordState,
} from "../../redux/auth/auth-actions";
import PasswordInput from "../../components/PasswordInput";

function ChangePassword() {
  const dispatch = useDispatch();
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
    setValue,
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
    <Main>
      <main className="Login">
        <section className="mt-20">
          <h2 className="mb-8 text-2xl">Change your password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PasswordInput
              name="currentPassword"
              type="password"
              placeholder="Current password"
              inputClass="form-input"
              onChange={(e) => setValue("currentPassword", e.target.value)}
              validation={{
                required: {
                  value: true,
                  message: "Please enter your current password",
                },
              }}
              register={register}
              errors={errors.currentPassword}
            />
            <PasswordInput
              name="newPassword"
              type="password"
              placeholder="New password"
              inputClass="form-input"
              onChange={(e) => setValue("newPassword", e.target.value)}
              validation={{
                required: {
                  value: true,
                  message: "Please enter your new password",
                },
              }}
              register={register}
              errors={errors.newPassword}
            />
            <PasswordInput
              name="confirmPassword"
              type="password"
              placeholder="Repeat new password"
              inputClass="form-input"
              onChange={(e) => setValue("confirmPassword", e.target.value)}
              validation={{
                required: {
                  value: true,
                  message: "Please confirm your new password",
                },
              }}
              register={register}
              errors={errors.confirmPassword}
            />
            <button
              className="btn rounded-full bg-indigo-500 hover:bg-indigo-600 w-full py-3 text-xl font-semibold mt-5"
              type="submit"
            >
              Submit
            </button>
          </form>
        </section>
      </main>
    </Main>
  );
}

export default ChangePassword;
