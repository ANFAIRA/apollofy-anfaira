import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSongs } from "../../redux/song/song-actions";
import { songsTypes } from "../../redux/song/song-type";

import SongCard from "../../components/SongCard";
import Main from "../../layout/Main";
import ProfileLayout from "../../layout/ProfileLayout";

function MySongs() {
  const { data } = useSelector((state) => state?.mySong?.mySongs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs(songsTypes.MY_SONGS));
  }, [dispatch]);

  return (
    <Main>
      <ProfileLayout>
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {data?.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </section>
      </ProfileLayout>
    </Main>
  );
}

export default MySongs;
