import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCard from "../../components/PlayListCard";
import SongCard from "../../components/SongCard";
import Main from "../../layout/Main";
import ProfileLayout from "../../layout/ProfileLayout";

import { fetchPlaylists } from "../../redux/playlist/playlist-actions";
import { fetchSongs } from "../../redux/song/song-actions";
import { songsTypes } from "../../redux/song/song-type";
import { selectSongState } from "../../redux/song/song-selector";
import { playlistTypes } from "../../redux/playlist/playlist-types";
import "./Profile.scss";

const Profile = () => {
  const { OWN: ownPlaylistsArray } = useSelector(
    (state) => state.playlists.playlistIds,
  );
  const { FOLLOWING: followedPlaylistsArray } = useSelector(
    (state) => state.playlists.playlistIds,
  );
  const { playlistByID } = useSelector((state) => state.playlists);

  const { likedSongs } = useSelector((state) =>
    state.song?.currentUser?.data
      ? state.song.currentUser.data
      : state.auth?.currentUser?.data,
  );

  const { MY_SONGS, FAVORITE } = useSelector((state) => state.song.songsIds);

  const { songsByID } = useSelector(selectSongState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs(songsTypes.FAVORITE));
    dispatch(fetchSongs(songsTypes.MY_SONGS));
    dispatch(fetchPlaylists(playlistTypes.OWN));
    dispatch(fetchPlaylists(playlistTypes.FOLLOWING));
  }, [dispatch, likedSongs]);

  return (
    <Main>
      <ProfileLayout>
        <h2 className="pb-2 font-semibold mt-10 ">My Songs</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {MY_SONGS?.slice(0, 6).map((song) => (
            <SongCard key={songsByID[song]._id} song={songsByID[song]} />
          ))}
        </section>
        <h2 className="pb-2 font-semibold mt-10 ">My Playlists</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {ownPlaylistsArray?.slice(0, 6).map((playlist) => (
            <PlaylistCard
              key={playlistByID[playlist]._id}
              playlist={playlistByID[playlist]}
              location={`playlist/${playlistByID[playlist]._id}`}
            />
          ))}
        </section>
        <h2 className="pb-2 font-semibold mt-10 ">Favorites</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {FAVORITE?.slice(0, 6).map((song) => (
            <SongCard key={songsByID[song]._id} song={songsByID[song]} />
          ))}
        </section>
        <h2 className="pb-2 font-semibold mt-10 ">Following</h2>
        <hr className="border-gray-600 pb-2 " />
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {followedPlaylistsArray?.slice(0, 6).map((playlist) => (
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
};

export default Profile;
