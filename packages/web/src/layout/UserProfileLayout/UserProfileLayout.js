import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { node } from "prop-types";
import Avatar from "../../components/Avatar";
import * as ROUTES from "../../routes";
import { followUser, fetchUserByID } from "../../redux/user/user-actions";

const UserProfileLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedUser } = useSelector((state) => state.user);
  const { followers, followedUsers } = useSelector(
    (state) => state.user.selectedUser,
  );
  const { currentUser } = useSelector((state) => state.auth);
  const userToFollow = useSelector(
    (state) => state.user?.usersByID[selectedUser._id],
  );

  const [isFollowingUser, setIsFollowingUser] = useState(
    userToFollow?.followers.find(
      (followerId) => followerId === currentUser._id,
    ),
  );

  const handleFollowUser = () => {
    setIsFollowingUser(!isFollowingUser);
    dispatch(followUser(selectedUser._id, currentUser.firebaseId));
  };

  useEffect(() => {
    dispatch(fetchUserByID(id));
  }, [dispatch, id]);

  // TODO create route
  return (
    <>
      <header>
        {/* <div className="p-10"> */}
        <div className="flex items-center mb-10">
          <Avatar
            placeholder={selectedUser?.username?.charAt(0).toUpperCase()}
            height="h-28"
            width="w-28"
            textSize="text-5xl"
          />
          <div className="flex flex-col ml-10 items-start">
            <h4 className="mt-0 mb-2 uppercase text-gray-500 songing-widest text-xs">
              USER
            </h4>
            <h2 className="mt-0 mb-2 text-white text-5xl font-semibold">
              {selectedUser.username}
            </h2>
          </div>
          <div className="ml-auto">
            <div className="flex mt-4 font-semibold">
              <p
                className={
                  followers?.length
                    ? "text-gray-600 hover:text-gray-300 cursor-pointer text-sm mr-5"
                    : "text-gray-600 text-sm mr-5"
                }
              >
                {followers?.length !== 1
                  ? `${followers.length} FOLLOWERS`
                  : `${followers.length} FOLLOWER`}
              </p>
              <p
                className={
                  followedUsers?.length
                    ? "text-gray-600 hover:text-gray-300 cursor-pointer text-sm"
                    : "text-gray-600 text-sm"
                }
              >
                {`${followedUsers?.length} FOLLOWED`}
              </p>
            </div>
            <button
              type="button"
              className={
                isFollowingUser
                  ? "mr-2 border-2 border-opacity-20 border-white hover:border-opacity-90 text-white font-semibold w-40 block py-2 px-8 rounded-full focus:outline-none"
                  : "mr-2 bg-indigo-500 text-white font-semibold w-40 block py-2 px-8 rounded-full focus:outline-none"
              }
              onClick={handleFollowUser}
            >
              {isFollowingUser ? "FOLLOW" : "FOLLOWING"}
            </button>
          </div>
        </div>
        {/* </div> */}
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
