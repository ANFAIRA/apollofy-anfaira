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
  const { followers } = useSelector((state) => state.user.selectedUser);
  const {usersByID} = useSelector((state)=> state.user);

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
            {following
              ? followers?.map((follower) => (
                  <UserCard
                    key={usersByID[follower]._id}
                    genre={usersByID[follower]}
                    // location={`genre/${genresByID[follower].metadata.genre}`}
                  />
                ))
              : followers?.map((genre) => (
                  <UserCard
                    key={usersByID[genre]._id}
                    genre={usersByID[genre]}
                    // location={`genre/${genresByID[follower].metadata.genre}`}
                  />
                ))}
          </section>
        </article>
      </div>
    </Main>
  );
};

export default FollowingUsers;
