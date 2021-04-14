import React from "react";
import { useSelector } from "react-redux";

import "./Home.scss";
import Navbar from "../../components/Navbar";
import { authSelector } from "../../redux/auth/auth-selectors";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  return (
    <main className="p-4">
      <Navbar />
      <section className="p-4">
        {isAuthenticated ? (
          <h1 className="text-xl">Hello</h1>
        ) : (
          <h1 className="text-xl">Hello World</h1>
        )}
      </section>
    </main>
  );
}

export default Home;
