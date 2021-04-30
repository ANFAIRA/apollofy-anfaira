import React from "react";
import { NavLink } from "react-router-dom";
import { node } from "prop-types";
import { useSelector } from "react-redux";
import * as ROUTES from "../../routes";
import Avatar from "../../components/Avatar";

const ProfileLayout = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <>
      <header>
        <div className="flex items-center mb-5">
          <Avatar
            placeholder={currentUser.data.username.charAt(0).toUpperCase()}
            height="h-24"
            width="w-24"
            textSize="text-5xl"
          />
          <h3 className="text-5xl font-semibold ml-4">
            {currentUser.data.username}
          </h3>
        </div>
        <div className="flex ml-1 mb-3 text-md font-semibold uppercase">
          <NavLink
            to={ROUTES.PROFILE}
            className="mr-12 cursor-pointer active:text-indigo-500"
            activeClassName="pb-2 border-b-4 border-indigo-500"
          >
            Overview
          </NavLink>
          <NavLink
            to={ROUTES.MY_SONGS}
            className="mr-12 cursor-pointer"
            activeClassName="pb-2 border-b-4 border-indigo-500"
          >
            My Songs
          </NavLink>
          <NavLink
            to={ROUTES.MY_PLAYLISTS}
            className="mr-12 cursor-pointer"
            activeClassName="pb-2 border-b-4 border-indigo-500"
          >
            My Playlists
          </NavLink>
          <NavLink
            to={ROUTES.MY_FAVOURITE_SONGS}
            className="mr-12 cursor-pointer"
            activeClassName="pb-2 border-b-4 border-indigo-500"
          >
            Favorite Songs
          </NavLink>
          <NavLink
            to={ROUTES.FOLLOWING_PLAYLISTS}
            className="mr-12 cursor-pointer"
            activeClassName="pb-2 border-b-4 border-indigo-500"
          >
            Followed Playlists
          </NavLink>
        </div>
      </header>
      <section className="container my-12 mx-auto px-4 md:px-12">
        {children}
      </section>
    </>
  );
};

ProfileLayout.propTypes = {
  children: node.isRequired,
};

export default ProfileLayout;
