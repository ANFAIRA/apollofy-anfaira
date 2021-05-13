import React from "react";
import { useSelector } from "react-redux";
import Main from "../../layout/Main";
import UserCard from "../../components/UserCard";

const FollowingUsers = () => {
  const pathname = window.location.pathname;
  const following =
    pathname.substring(pathname.lastIndexOf("/") + 1) === "following";
  const followed =
    pathname.substring(pathname.lastIndexOf("/") + 1) === "followed";
  const {
    followers: selectedUserFollowers,
    followedUsers: selectedUserFollowed,
  } = useSelector((state) => state.user.selectedUser);
  const {
    followers: currentUserFollowers,
    followedUsers: currentUserFollowed,
  } = useSelector((state) => state.auth.currentUser);
  const { usersByID } = useSelector((state) => state.user);

  return (
    <Main>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <article className="pb-10">
          {following ? (
            <h2 className="pb-2 font-semibold">Following users</h2>
          ) : (
            <h2 className="pb-2 font-semibold">Followed users</h2>
          )}
          <hr className="border-gray-600 pb-2" />
          <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
            {following &&
              (selectedUserFollowers
                ? selectedUserFollowers.map((follower) => {
                    return (
                      <UserCard
                        key={usersByID[follower]._id}
                        user={usersByID[follower]}
                        location={`users/${usersByID[follower]._id}`}
                      />
                    );
                  })
                : currentUserFollowers?.map((follower) => {
                    return (
                      <UserCard
                        key={usersByID[follower]._id}
                        user={usersByID[follower]}
                        location={`users/${usersByID[follower]._id}`}
                      />
                    );
                  }))}

            {followed &&
              (selectedUserFollowed
                ? selectedUserFollowed.map((follower) => {
                    return (
                      <UserCard
                        key={usersByID[follower]._id}
                        user={usersByID[follower]}
                        location={`users/${usersByID[follower]._id}`}
                      />
                    );
                  })
                : currentUserFollowed?.map((follower) => {
                    return (
                      <UserCard
                        key={usersByID[follower]._id}
                        user={usersByID[follower]}
                        location={`users/${usersByID[follower]._id}`}
                      />
                    );
                  }))}
          </section>
        </article>
      </div>
    </Main>
  );
};

export default FollowingUsers;
