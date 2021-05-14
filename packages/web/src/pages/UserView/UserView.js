import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SongCard from "../../components/SongCard";
import PlaylistCard from "../../components/PlayListCard";
import Main from "../../layout/Main";
import UserProfileLayout from "../../layout/UserProfileLayout";
import Slider from "../../components/Slider";

const UserView = () => {
  const { playlistsByID } = useSelector((state) => state.playlists);
  const { songsByID } = useSelector((state) => state.song);
  const { usersByID } = useSelector((state) => state.user);
  const { id } = useParams();
  const selectedUser = usersByID[id];
  const {
    uploadedSongs,
    uploadedPlaylist,
    likedSongs,
    followedPlaylist,
    username,
  } = selectedUser;

  return (
    <Main>
      <UserProfileLayout>
        <h2 className="pb-2 font-semibold mt-10 capitalize">
          {username}&apos;s Songs
        </h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          <Slider>
            {uploadedSongs?.slice(0, 6).map((song) => (
              <SongCard
                key={songsByID[song]._id}
                song={songsByID[song]}
                slide
              />
            ))}
          </Slider>
        </section>
        <h2 className="pb-2 font-semibold mt-10 capitalize">
          {username}&apos;s Playlists
        </h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          <Slider>
            {uploadedPlaylist?.slice(0, 6).map((playlist) => (
              <PlaylistCard
                key={playlistsByID[playlist]?._id}
                playlist={playlistsByID[playlist]}
                location={`playlist/${playlistsByID[playlist]?._id}`}
                slide
              />
            ))}
          </Slider>
        </section>
        <h2 className="pb-2 font-semibold mt-10 ">Favorites</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          <Slider>
            {likedSongs?.slice(0, 6).map((song) => (
              <SongCard
                key={songsByID[song]._id}
                song={songsByID[song]}
                slide
              />
            ))}
          </Slider>
        </section>
        <h2 className="pb-2 font-semibold mt-10 ">Following</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          <Slider>
            {followedPlaylist?.slice(0, 6).map((playlist) => (
              <PlaylistCard
                key={playlistsByID[playlist]?._id}
                playlist={playlistsByID[playlist]}
                location={`playlist/${playlistsByID[playlist]?._id}`}
                slide
              />
            ))}
          </Slider>
        </section>
      </UserProfileLayout>
    </Main>
  );
};

export default UserView;
