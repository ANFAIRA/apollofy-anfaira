import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "../../components/SongCard";
import Main from "../../layout/Main";
import { fetchMySong } from "../../redux/mySong/mySong-actions";

function MySongs() {
  const { data } = useSelector((state) => state?.mySong?.mySongs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMySong());
  }, [dispatch, fetchMySong]);

  return (
    <Main>
      <h1 className="text-5xl font-bold mb-4">My songs</h1>
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

export default MySongs;
