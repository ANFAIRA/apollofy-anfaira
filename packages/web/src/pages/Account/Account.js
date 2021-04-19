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
        <section className="mt-20">
          <h2 className="mb-8 text-2xl">Edit your user account details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              name="username"
              inputClass="form-input"
              {...register("username", {
                required: true,
              })}
            />
            <p>{errors.username && "Username is required"}</p>
            <label htmlFor="firstName">First Name</label>
            <Input
              type="text"
              name="firstName"
              inputClass="form-input"
              {...register("firstName", {
                required: true,
              })}
            />
            <p>{errors.firstName && "First name is required"}</p>
            <label htmlFor="lastName">Last Name</label>
            <Input
              type="text"
              name="lastName"
              inputClass="form-input"
              {...register("lastName", {
                required: true,
              })}
            />
            <p>{errors.lastName && "Last name is required"}</p>
            <button
              className="btn rounded-full bg-indigo-500 w-full py-3 text-xl font-semibold mt-5"
              type="submit"
            >
              Submit
            </button>
          </form>
          <section className="mt-4 text-center">
            <Link to="/change-password">
              Want to change your password? &nbsp;
              <span className="font-semibold">CHANGE PASSWORD</span>
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}

export default Account;
