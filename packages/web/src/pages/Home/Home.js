import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "../../components/SongCard/SongCard";
import Main from "../../layout/Main";
import { authSelector } from "../../redux/auth/auth-selectors";
import { fetchSong } from "../../redux/song/song-actions";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import "./Home.scss";

function Home() {
  const { currentUser } = useSelector(authSelector);
  const { data } = useSelector((state) => state.song.songs);
  const { uploadSongSuccess } = useSelector(uploaderSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    uploadSongSuccess ? dispatch(fetchSong()) : dispatch(fetchSong());
  }, [dispatch, uploadSongSuccess]);

  return (
    <Main>
      <h1 className="text-xl mb-4">Hello {currentUser.data.username}</h1>
      <div className="flex flex-wrap">
        {data?.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </Main>
  );
}

export default Home;
