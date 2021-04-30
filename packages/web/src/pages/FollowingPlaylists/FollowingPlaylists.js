import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLikedSong } from "../../redux/liked-songs/liked-songs-actions";

import SongCard from "../../components/SongCard";
import Main from "../../layout/Main";
import ProfileLayout from "../../layout/ProfileLayout";

function FollowingPlaylists() {
  const { data } = useSelector((state) => state?.likedSong?.likedSongs);
  const { likedSongs } = useSelector((state) =>
    state.song?.currentUser?.data
      ? state.song.currentUser.data
      : state.auth?.currentUser?.data,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLikedSong());
  }, [dispatch, likedSongs]);

  return (
    <Main>
      <ProfileLayout>
        <h2 className="pb-2 font-semibold mt-10 ">Followed Playlists</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {data?.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </section>
      </ProfileLayout>
    </Main>
  );
}

export default FollowingPlaylists;
