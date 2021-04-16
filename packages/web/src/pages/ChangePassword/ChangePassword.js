import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { changePassword } from "../../redux/auth/auth-actions";
import PasswordInput from "../../components/PasswordInput";

function ChangePassword() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth?.passwordChangeError);
  const history = useHistory();
  const [userPassword, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (userPassword.newPassword === userPassword.confirmPassword) {
      dispatch(changePassword(userPassword));
    }
  }

  useEffect(() => {
    if (errorMessage === null) {
      history.push("/");
    }
  }, [errorMessage, history]);

  const handleChange = (e) => {
    setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <main className="Login">
        <section className="Login__wrapper">
          <hr className="mt-1 mb-4" />
          <form onSubmit={handleSubmit}>
            <PasswordInput
              label="Current Password"
              name="currentPassword"
              labelClass="form-label"
              type="password"
              inputClass="form-input"
              value={userPassword.currentPassword}
              onChange={handleChange}
            />
            <PasswordInput
              label="New Password"
              name="newPassword"
              labelClass="form-label"
              type="password"
              inputClass="form-input"
              value={userPassword.newPassword}
              onChange={handleChange}
            />
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              labelClass="form-label"
              type="password"
              inputClass="form-input"
              value={userPassword.confirmPassword}
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

export default ChangePassword;
