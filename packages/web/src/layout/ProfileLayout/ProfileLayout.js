import React from "react";
import { NavLink } from "react-router-dom";
import { node } from "prop-types";
import { useSelector } from "react-redux";
import * as ROUTES from "../../routes";
import Avatar from "../../components/Avatar";

const ProfileLayout = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { followedUsers, followers } = useSelector(
    (state) => state.auth.currentUser,
  );
  return (
    <>
      <header>
        <div className="flex items-center mb-10">
          <Avatar
            placeholder={currentUser.username.charAt(0).toUpperCase()}
            height="h-24"
            width="w-24"
            textSize="text-5xl"
          />
          <div className="ml-10">
            <h3 className="text-5xl font-semibold">{currentUser.username}</h3>
            <div className="flex mt-4">
              <p
                className={
                  followers.length
                    ? "text-gray-600 hover:text-gray-300 cursor-pointer text-sm mr-5"
                    : "text-gray-600 cursor-pointer text-sm mr-5"
                }
              >
                {followers.length !== 1
                  ? `${followers.length} FOLLOWERS`
                  : `${followers.length} FOLLOWER`}
              </p>
              <p
                className={
                  followedUsers.length
                    ? "text-gray-600 hover:text-gray-300 cursor-pointer text-sm"
                    : "text-gray-600 cursor-pointer text-sm"
                }
              >
                {`${followedUsers.length} FOLLOWED`}
              </p>
            </div>
          </div>
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
            Favorites
          </NavLink>
          <NavLink
            to={ROUTES.FOLLOWING_PLAYLISTS}
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

ProfileLayout.propTypes = {
  children: node.isRequired,
};

export default ProfileLayout;
