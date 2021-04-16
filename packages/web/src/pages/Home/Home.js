import React from "react";
import { useSelector } from "react-redux";
import Main from "../../layout/Main";
import { authSelector } from "../../redux/auth/auth-selectors";
import "./Home.scss";

function Home() {
  const { currentUser } = useSelector(authSelector);

  return (
    <Main>
      <h1 className="text-xl">Hello {currentUser.data.username} </h1>
    </Main>
  );
}

export default Home;
