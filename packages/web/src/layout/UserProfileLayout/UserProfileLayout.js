import { node } from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Avatar from "../../components/Avatar";
import * as ROUTES from "../../routes";

const UserProfileLayout = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  // TODO create route
  return (
    <>
      <header>
        <div className="flex items-center mb-5">
          <Avatar
            placeholder={currentUser?.username?.charAt(0).toUpperCase()}
            height="h-24"
            width="w-24"
            textSize="text-5xl"
          />
          <h3 className="text-5xl font-semibold ml-4">
            {currentUser.username}
          </h3>
        </div>
        <div className="flex ml-1 mb-3 text-md font-semibold uppercase">
          <NavLink
            to={`/users/${currentUser._id}`}
            className="mr-12 cursor-pointer active:text-indigo-500"
            activeClassName="pb-2 border-b-4 border-indigo-500"
          >
            Overview
          </NavLink>
          <NavLink
            to={ROUTES.USER_SONGS}
            className="mr-12 cursor-pointer"
            activeClassName="pb-2 border-b-4 border-indigo-500"
          >
            Uploaded Songs
          </NavLink>
          <NavLink
            to={ROUTES.USER_PLAYLISTS}
            className="mr-12 cursor-pointer"
            activeClassName="pb-2 border-b-4 border-indigo-500"
          >
            Created Playlists
          </NavLink>
          <NavLink
            to={ROUTES.USER_FAVOURITE_SONGS}
            className="mr-12 cursor-pointer"
            activeClassName="pb-2 border-b-4 border-indigo-500"
          >
            Favorites
          </NavLink>
          <NavLink
            to={ROUTES.USER_FOLLOWING_PLAYLISTS}
            className="mr-12 cursor-pointer"
            activeClassName="pb-2 border-b-4 border-indigo-500"
          >
            Following
          </NavLink>
        </div>
      </header>
      <section className="container my-8 mx-auto px-4 md:px-12">
        {children}
      </section>
    </>
  );
};

UserProfileLayout.propTypes = {
  children: node.isRequired,
};

export default UserProfileLayout;
