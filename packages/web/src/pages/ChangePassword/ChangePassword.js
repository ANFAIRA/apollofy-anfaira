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
        <section className="mt-20">
          <h2 className="mb-8 text-2xl">Change your password</h2>
          <form onSubmit={handleSubmit}>
            <PasswordInput
              label="Current Password"
              name="currentPassword"
              labelClass="form-label"
              type="password"
              inputClass="form-input"
              value={userPassword.currentPassword}
              onChange={handleChange}
              placeholder="Current password"
            />
            <PasswordInput
              label="New Password"
              name="newPassword"
              labelClass="form-label"
              type="password"
              inputClass="form-input"
              value={userPassword.newPassword}
              onChange={handleChange}
              placeholder="New password"
            />
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              labelClass="form-label"
              type="password"
              inputClass="form-input"
              value={userPassword.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat new password"
            />
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
