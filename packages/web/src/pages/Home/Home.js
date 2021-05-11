import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelector } from "../../redux/auth/auth-selectors";
import { fetchPlaylists } from "../../redux/playlist/playlist-actions";
import { playlistTypes } from "../../redux/playlist/playlist-types";
import {
  fetchAllSongs,
  fetchPopularSongs,
} from "../../redux/song/song-actions";
import { songSelector } from "../../redux/song/song-selector";
import { songsTypes } from "../../redux/song/song-types";

import PlaylistCard from "../../components/PlayListCard";
import SongCard from "../../components/SongCard";
import GenreCard from "../../components/GenreCard";

import Main from "../../layout/Main";

import { fetchUsers } from "../../redux/user/user-actions";
import { fetchGenres } from "../../redux/genre/genre-actions";
import { userTypes } from "../../redux/user/user-types";

import "./Home.scss";

export default function Home() {
  const { currentUser } = useSelector(authSelector);
  const { songsByID } = useSelector(songSelector);
  const { ALL_SONGS, POPULAR } = useSelector((state) => state.song.songIds);
  const { ALL_USERS } = useSelector((state) => state.user.userIds);
  const { ALL } = useSelector((state) => state.playlists.playlistIds);
  const { playlistsByID } = useSelector((state) => state.playlists);
  const { genresByID, genreIds } = useSelector((state) => state.genre);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ALL_USERS.length === 0) {
      dispatch(fetchUsers(userTypes.ALL_USERS));
    }

    if (ALL_SONGS.length === 0) {
      dispatch(fetchAllSongs(songsTypes.ALL_SONGS));
    }
    if (ALL.length === 0) {
      dispatch(fetchPlaylists(playlistTypes.ALL));
    }
    if (POPULAR.length === 0) {
      dispatch(fetchPopularSongs(songsTypes.POPULAR));
    }
    if (genreIds.length === 0) {
      console.log("fetch");
      dispatch(fetchGenres());
    }
  }, [
    dispatch,
    ALL_USERS.length,
    ALL_SONGS.length,
    ALL.length,
    POPULAR.length,
    genreIds.length,
  ]);

  return (
    <>
      <Main>
        <h1 className="text-xl mb-4">Hello {currentUser?.data?.username}</h1>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Most Popular Genres</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              {genreIds?.map((genre) => (
                <GenreCard
                  key={genresByID[genre]._id}
                  genre={genresByID[genre]}
                  location={`genre/${genresByID[genre].metadata.genre}`}
                />
              ))}
            </section>
          </article>
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Most Played Songs</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              {POPULAR?.map((song) => (
                <SongCard key={songsByID[song]._id} song={songsByID[song]} />
              ))}
            </section>
          </article>
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Songs</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              {ALL_SONGS?.map((song) => (
                <SongCard key={songsByID[song]._id} song={songsByID[song]} />
              ))}
            </section>
          </article>
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Playlists</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              {ALL?.map((playlist) => (
                <PlaylistCard
                  key={playlistsByID[playlist]._id}
                  playlist={playlistsByID[playlist]}
                  location={`playlist/${playlistsByID[playlist]._id}`}
                />
              ))}
            </section>
          </article>
        </div>
      </Main>
    </>
  );
}
