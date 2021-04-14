import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAccount } from "../../redux/auth/auth-actions";

import Navbar from "../../components/Navbar";

function Account() {
  const dispatch = useDispatch();
  const { username, firstName, lastName, email } = useSelector(
    (state) => state.auth?.currentUser?.data,
  );
  const [userData, setUserData] = useState({
    username,
    firstName,
    lastName,
    email,
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
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              value={userData.username}
              onChange={handleChange}
            />
            <label htmlFor="firstName" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-input"
              value={userData.firstName}
              onChange={handleChange}
            />
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-input"
              value={userData.lastName}
              onChange={handleChange}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-input"
              value={userData.email}
              onChange={handleChange}
            />
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

export default Account;
