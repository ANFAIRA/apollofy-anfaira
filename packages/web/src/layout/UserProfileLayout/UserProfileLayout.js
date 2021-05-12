import { node } from "prop-types";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Avatar from "../../components/Avatar";
import * as ROUTES from "../../routes";
import { followUser } from "../../redux/user/user-actions";
import { selectUser } from "../../redux/user/user-selector";

const UserProfileLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);
  // const userToFollow = useSelector(selectUser(selectedUser._id));
  const userToFollow = useSelector(
    (state) => state.user?.usersByID[selectedUser._id],
  );
  console.log(userToFollow);

  const [isFollowingUser, setIsFollowingUser] = useState(
    userToFollow?.followers.find(
      (followerId) => followerId === currentUser.data._id,
    ),
  );

  const handleFollowUser = () => {
    setIsFollowingUser(!isFollowingUser);
    dispatch(followUser(selectedUser._id, currentUser.data.firebaseId));
  };

  // TODO create route
  return (
    <>
      <header>
        <div className="text-gray-300 p-10">
          <div className="flex items-center">
            <Avatar
              placeholder={selectedUser?.username?.charAt(0).toUpperCase()}
              height="h-32"
              width="w-32"
              textSize="text-5xl"
            />
            <div className="flex flex-col ml-6 items-start">
              <h4 className="mt-0 mb-2 uppercase text-gray-500 songing-widest text-xs">
                USER
              </h4>
              <h2 className="mt-0 mb-2 text-white text-4xl">
                {selectedUser.username}
              </h2>
            </div>
            <div className="ml-auto">
              <button
                type="button"
                className="mr-2 bg-indigo-500 text-indigo-100 block py-2 px-8 rounded-full focus:outline-none"
                onClick={handleFollowUser}
              >
                FOLLOW
              </button>
            </div>
          </div>
        </div>
        <div className="flex ml-1 mb-3 text-md font-semibold uppercase">
          <NavLink
            to={`/users/${selectedUser._id}`}
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
            {selectedUser.username}&apos;s Songs
          </NavLink>
          <NavLink
            to={ROUTES.USER_PLAYLISTS}
            className="mr-12 cursor-pointer"
            activeClassName="pb-2 border-b-4 border-indigo-500"
          >
            {selectedUser.username}&apos;s Playlists
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
