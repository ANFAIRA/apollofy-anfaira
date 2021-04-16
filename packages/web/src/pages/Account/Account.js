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
        <section className="Login__wrapper">
          <hr className="mt-1 mb-4" />
          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              type="text"
              name="username"
              labelClass="form-label"
              inputClass="form-input"
              value={userData.username}
              onChange={handleChange}
            />
            <Input
              label="Name"
              type="text"
              name="firstName"
              labelClass="form-label"
              inputClass="form-input"
              value={userData.firstName}
              onChange={handleChange}
            />
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              labelClass="form-label"
              inputClass="form-input"
              value={userData.lastName}
              onChange={handleChange}
            />
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
