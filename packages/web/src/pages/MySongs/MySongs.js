import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSongs } from "../../redux/song/song-actions";
import { songsTypes } from "../../redux/song/song-types";

import SongCard from "../../components/SongCard";
import Main from "../../layout/Main";
import ProfileLayout from "../../layout/ProfileLayout";

function MySongs() {
  const { MY_SONGS } = useSelector((state) => state?.song?.songIds);
  const { songsByID } = useSelector((state) => state?.song);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs(songsTypes.MY_SONGS));
  }, [dispatch]);

  return (
    <Main>
      <ProfileLayout>
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {MY_SONGS?.map((song) => (
            <SongCard key={songsByID[song]._id} song={songsByID[song]} />
          ))}
        </section>
      </ProfileLayout>
    </Main>
  );
}

export default MySongs;
