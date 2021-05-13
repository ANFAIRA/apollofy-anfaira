import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

import SongCard from "../../components/SongCard";
import PlaylistCard from "../../components/PlayListCard";
import Main from "../../layout/Main";
import UserProfileLayout from "../../layout/UserProfileLayout";
// import { fetchUserByID } from "../../redux/user/user-actions";

const UserView = () => {
  // const dispatch = useDispatch();
  // const { id } = useParams();
  const { playlistsByID } = useSelector((state) => state.playlists);
  const { songsByID } = useSelector((state) => state?.song);
  const {
    uploadedSongs,
    uploadedPlaylist,
    likedSongs,
    followedPlaylist,
    username,
  } = useSelector((state) => state.user?.selectedUser);

  // useEffect(() => {
  //   dispatch(fetchUserByID(id));
  // }, [dispatch, id]);

  return (
    <Main>
      <UserProfileLayout>
        <h2 className="pb-2 font-semibold mt-10 capitalize">
          {username}&apos;s Songs
        </h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {uploadedSongs?.slice(0, 6).map((song) => (
            <SongCard key={songsByID[song]?._id} song={songsByID[song]} />
          ))}
        </section>
        <h2 className="pb-2 font-semibold mt-10 capitalize">
          {username}&apos;s Playlists
        </h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {uploadedPlaylist?.slice(0, 6).map((playlist) => (
            <PlaylistCard
              key={playlistsByID[playlist]._id}
              playlist={playlistsByID[playlist]}
              location={`playlist/${playlistsByID[playlist]._id}`}
            />
          ))}
        </section>
        <h2 className="pb-2 font-semibold mt-10 ">Favorites</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {likedSongs?.slice(0, 6).map((song) => {
            return (
              <SongCard key={songsByID[song]._id} song={songsByID[song]} />
            );
          })}
        </section>
        <h2 className="pb-2 font-semibold mt-10 ">Following</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {followedPlaylist?.slice(0, 6).map((playlist) => (
            <PlaylistCard
              key={playlistsByID[playlist]._id}
              playlist={playlistsByID[playlist]}
              location={`playlist/${playlistsByID[playlist]._id}`}
            />
          ))}
        </section>
      </UserProfileLayout>
    </Main>
  );
};

export default UserView;
