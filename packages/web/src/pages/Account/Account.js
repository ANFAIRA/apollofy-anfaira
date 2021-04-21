import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Main from "../../layout/Main";
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
    setValue,
  } = useForm({
    defaultValues: {
      username: username,
      firstName: firstName,
      lastName: lastName,
    },
  });

  const onSubmit = (data) => {
    dispatch(updateUserAccount({ ...data, firebaseId: firebaseId }));
    history.push("/");
  };

  useEffect(() => {
    register("username", { required: true });
    register("firstName", { required: true });
    register("lastName", { required: true });
  }, [register]);

  return (
    <Main>
      <main className="SignUp">
        <section className="mt-20">
          <h2 className="mb-8 text-2xl">Edit your user account details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              name="username"
              inputClass="form-input"
              defaultValue={username}
              onChange={(e) => setValue("username", e.target.value)}
            />
            {errors.username && (
              <p className="-mt-5 mb-5 pt-2 border-t-4 border-red-600">
                Username is required
              </p>
            )}
            <label htmlFor="firstName">First Name</label>
            <Input
              type="text"
              name="firstName"
              inputClass="form-input"
              defaultValue={firstName}
              onChange={(e) => setValue("firstName", e.target.value)}
            />
            {errors.firstName && (
              <p className="-mt-5 mb-5 pt-2 border-t-4 border-red-600">
                First name is required
              </p>
            )}
            <label htmlFor="lastName">Last Name</label>
            <Input
              type="text"
              name="lastName"
              inputClass="form-input"
              defaultValue={lastName}
              onChange={(e) => setValue("lastName", e.target.value)}
            />
            {errors.lastName && (
              <p className="-mt-5 mb-5 pt-2 border-t-4 border-red-600">
                Last name is required
              </p>
            )}
            <button
              className="btn rounded-full bg-indigo-500 hover:bg-indigo-600 w-full py-3 text-xl font-semibold mt-5"
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
    </Main>
  );
}

export default Account;
