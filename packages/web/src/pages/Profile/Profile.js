import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PlayListCard from "../../components/PlayListCard";

import { fetchMySong } from "../../redux/mySong/mySong-actions";
import { fetchLikedSong } from "../../redux/liked-songs/liked-songs-actions";

import Main from "../../layout/Main";
import ProfileLayout from "../../layout/ProfileLayout";
import SongCard from "../../components/SongCard";
import "./Profile.scss";

const Profile = () => {
  const { data: mySongsArray } = useSelector((state) => state?.mySong?.mySongs);
  const { data: likedSongsArray } = useSelector(
    (state) => state?.likedSong?.likedSongs,
  );

  const { likedSongs } = useSelector((state) =>
    state.song?.currentUser?.data
      ? state.song.currentUser.data
      : state.auth?.currentUser?.data,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMySong());
    dispatch(fetchLikedSong());
  }, [dispatch, likedSongs]);

  return (
    <Main>
      <ProfileLayout>
        <h2 className="pb-2 font-semibold mt-10 ">My Songs</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {mySongsArray?.slice(0, 6).map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </section>
        <h2 className="pb-2 font-semibold mt-10 ">My Playlists</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {likedSongsArray?.slice(0, 6).map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </section>
        <h2 className="pb-2 font-semibold mt-10 ">Favorite Songs</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {likedSongsArray?.slice(0, 6).map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </section>
        <h2 className="pb-2 font-semibold mt-10 ">Favorite Playlists</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {likedSongsArray?.slice(0, 6).map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </section>
        {/* <div className="flex">
          <PlayListCard title="My songs" location="my-songs" />
          <PlayListCard
            title="My favourite songs"
            location="my-favourite-songs"
          />
          <PlayListCard title="My playlists" location="my-playlists" />
          <PlayListCard
            title="Followed playlists"
            location="followed-playlists"
          />
        </div> */}
      </ProfileLayout>
    </Main>
  );
};

export default Profile;
