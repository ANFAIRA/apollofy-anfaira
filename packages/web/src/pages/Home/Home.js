import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelector } from "../../redux/auth/auth-selectors";
import {
  fetchAllPlaylists,
  // fetchPlaylists,
} from "../../redux/playlist/playlist-actions";
// import { playlistTypes } from "../../redux/playlist/playlist-types";
import { fetchSong } from "../../redux/song/song-actions";
import { trackDeleteSelector } from "../../redux/trackDelete/trackDelete-selectors";
import { trackEditorSelector } from "../../redux/trackEditor/trackEditor-selectors";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";

import PlaylistCard from "../../components/PlayListCard";
import SongCard from "../../components/SongCard";

import Main from "../../layout/Main";

import "./Home.scss";

export default function Home() {
  const { currentUser } = useSelector(authSelector);
  const { data } = useSelector((state) => state.song.songs);
  const { uploadSongSuccess } = useSelector(uploaderSelector);
  const { trackUpdateSuccess } = useSelector(trackEditorSelector);
  const { trackDeleteSuccess } = useSelector(trackDeleteSelector);
  const { ALL } = useSelector((state) => state.playlists.playlistIds);
  const { playlistByID } = useSelector((state) => state.playlists);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSong());
    dispatch(fetchAllPlaylists());
    // dispatch(fetchPlaylists(playlistTypes.ALL));
  }, [dispatch, uploadSongSuccess, trackUpdateSuccess, trackDeleteSuccess]);

  return (
    <>
      <Main>
        <h1 className="text-xl mb-4">Hello {currentUser?.data?.username}</h1>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Songs</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              {data?.map((song) => (
                <SongCard key={song._id} song={song} />
              ))}
            </section>
          </article>
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Playlists</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              {ALL?.map((playlist) => (
                <PlaylistCard
                  key={playlistByID[playlist]._id}
                  playlist={playlistByID[playlist]}
                  location={`playlist/${playlistByID[playlist]._id}`}
                />
              ))}
            </section>
          </article>
        </div>
      </Main>
    </>
  );
}
