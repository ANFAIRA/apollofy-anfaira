import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "../../components/SongCard";
import Main from "../../layout/Main";
import { fetchLikedSong } from "../../redux/liked-songs/liked-songs-actions";

function LikedSongs() {
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
      <h1 className="text-5xl font-bold mb-4">Liked songs</h1>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {data?.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      </div>
    </Main>
  );
}

export default LikedSongs;
