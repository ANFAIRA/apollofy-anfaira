import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongModal from "../../components/SongModal";
import Main from "../../layout/Main";
import { authSelector } from "../../redux/auth/auth-selectors";
import { fetchSong } from "../../redux/song/song-actions";
import "./Home.scss";

function Home() {
  const { currentUser } = useSelector(authSelector);
  const { data } = useSelector((state) => state.song.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSong());
  }, [dispatch]);

  return (
    <Main>
      <h1 className="text-xl">Hello {currentUser.data.username} </h1>
      <SongModal />
      {data?.map((song) => (
        <p key={song._id}>{song.title}</p>
      ))}
    </Main>
  );
}

export default Home;
