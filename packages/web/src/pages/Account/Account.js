import React from "react";
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

  return (
    <Main>
      <main className="SignUp">
        <section className="mt-20">
          <h2 className="mb-8 text-2xl">Edit your user account details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <Input
              name="username"
              type="text"
              inputClass="form-input"
              defaultValue={username}
              onChange={(e) => setValue("username", e.target.value)}
              validation={{
                required: {
                  value: true,
                  message: "Please enter your username",
                },
              }}
              register={register}
              errors={errors.username}
            />
            <label htmlFor="firstName">First Name</label>
            <Input
              name="firstName"
              type="text"
              inputClass="form-input"
              defaultValue={firstName}
              onChange={(e) => setValue("firstName", e.target.value)}
              validation={{
                required: {
                  value: true,
                  message: "Please enter your first name",
                },
              }}
              register={register}
              errors={errors.firstName}
            />
            <label htmlFor="lastName">Last Name</label>
            <Input
              name="lastName"
              type="text"
              inputClass="form-input"
              defaultValue={lastName}
              onChange={(e) => setValue("lastName", e.target.value)}
              validation={{
                required: {
                  value: true,
                  message: "Please enter your last name",
                },
              }}
              register={register}
              errors={errors.lastName}
            />
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
