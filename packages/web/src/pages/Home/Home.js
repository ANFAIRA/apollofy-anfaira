import React from "react";
import { useSelector } from "react-redux";

import { authSelector } from "../../redux/auth/auth-selectors";
import { songSelector } from "../../redux/song/song-selector";

import PlaylistCard from "../../components/PlayListCard";
import SongCard from "../../components/SongCard";
import GenreCard from "../../components/GenreCard";

import Main from "../../layout/Main";

import "./Home.scss";

export default function Home() {
  const { currentUser } = useSelector(authSelector);
  const { songsByID } = useSelector(songSelector);
  const { ALL_SONGS, POPULAR } = useSelector((state) => state.song.songIds);
  const { ALL } = useSelector((state) => state.playlists.playlistIds);
  const { playlistsByID } = useSelector((state) => state.playlists);
  const { genresByID, genreIds } = useSelector((state) => state.genre);

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
