import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";
import { updateUserAccount } from "../../redux/auth/auth-actions";
import Input from "../../components/Input";

function Account() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, firstName, lastName, firebaseId } = useSelector(
    (state) => state.auth?.currentUser?.data,
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateUserAccount(data));
    history.push("/");
  };

  return (
    <>
      <Navbar />
      <main className="SignUp">
        <section className="Login__wrapper">
          <hr className="mt-1 mb-4" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Username"
              type="text"
              name="username"
              labelClass="form-label"
              inputClass="form-input"
              {...register("username", {
                required: true,
              })}
            />
            <p>{errors.username && "Username is required"}</p>
            <Input
              label="Name"
              type="text"
              name="firstName"
              labelClass="form-label"
              inputClass="form-input"
              {...register("firstName", {
                required: true,
              })}
            />
            <p>{errors.firstName && "First name is required"}</p>
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              labelClass="form-label"
              inputClass="form-input"
              {...register("lastName", {
                required: true,
              })}
            />
            <p>{errors.lastName && "Last name is required"}</p>
            <button className="btn btn-primary w-full" type="submit">
              Submit
            </button>
          </form>
          <section className="mt-4">
            <hr className="mt-1 mb-4" />
            <Link to="/change-password">Want to change your password?</Link>
          </section>
        </section>
      </main>
    </>
  );
}

export default Account;
