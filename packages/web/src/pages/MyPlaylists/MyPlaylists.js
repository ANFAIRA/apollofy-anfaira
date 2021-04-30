import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playlistTypes } from "../../redux/playlist/playlist-types";

// import { fetchLikedSong } from "../../redux/liked-songs/liked-songs-actions";
import { fetchPlaylists } from "../../redux/playlist/playlist-actions";

import SongCard from "../../components/SongCard";
import PlaylistCard from "../../components/PlayListCard";
import Main from "../../layout/Main";
import ProfileLayout from "../../layout/ProfileLayout";

function MyPlaylists() {
  //   const { ALL } = useSelector((state) => state.playlists.playlistIds);
  const { OWN } = useSelector((state) => state.playlists.playlistIds);
  console.log(useSelector((state) => state.playlists.playlistIds));

  const { playlistByID } = useSelector((state) => state.playlists);
  // const { data } = useSelector((state) => state?.likedSong?.likedSongs);
  //   const { likedSongs } = useSelector((state) =>
  //     state.song?.currentUser?.data
  //       ? state.song.currentUser.data
  //       : state.auth?.currentUser?.data,
  //   );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylists(playlistTypes.OWN));
  }, [dispatch]);

  return (
    <Main>
      <ProfileLayout>
        <h2 className="pb-2 font-semibold mt-10 ">My Playlists</h2>
        <hr className="border-gray-600 pb-2" />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {OWN?.map((playlist) => (
            <PlaylistCard
              key={playlistByID[playlist]._id}
              playlist={playlistByID[playlist]}
              location={`playlist/${playlistByID[playlist]._id}`}
            />
          ))}
        </section>
      </ProfileLayout>
    </Main>
  );
}

export default MyPlaylists;
