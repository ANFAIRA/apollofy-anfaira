import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { updateUserAccount } from "../../redux/auth/auth-actions";
import Input from "../../components/Input";

function Account() {
  const dispatch = useDispatch();
  const { username, firstName, lastName, firebaseId } = useSelector(
    (state) => state.auth?.currentUser?.data,
  );
  const [userData, setUserData] = useState({
    username,
    firstName,
    lastName,
    firebaseId,
  });

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(updateUserAccount(userData));
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <main className="SignUp">
        <section className="mt-20">
          <h2 className="mb-8 text-2xl">Edit your user account details</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              name="username"
              labelClass="form-label"
              inputClass="form-input"
              value={userData.username}
              onChange={handleChange}
            />
            <label htmlFor="firstName">First Name</label>
            <Input
              label="Name"
              type="text"
              name="firstName"
              labelClass="form-label"
              inputClass="form-input"
              value={userData.firstName}
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              labelClass="form-label"
              inputClass="form-input"
              value={userData.lastName}
              onChange={handleChange}
            />
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
