import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { playlistTypes } from "../../redux/playlist/playlist-types";
import {
  // fetchPlaylists,
  fetchOwnPlaylists,
} from "../../redux/playlist/playlist-actions";

import PlaylistCard from "../../components/PlayListCard";
import Main from "../../layout/Main";
import ProfileLayout from "../../layout/ProfileLayout";

function MyPlaylists() {
  const { OWN } = useSelector((state) => state.playlists.playlistIds);

  const { playlistsByID } = useSelector((state) => state.playlists);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchPlaylists(playlistTypes.OWN));
    dispatch(fetchOwnPlaylists());
  }, [dispatch]);

  return (
    <Main>
      <ProfileLayout>
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {OWN?.map((playlist) => (
            <PlaylistCard
              key={playlistsByID[playlist]._id}
              playlist={playlistsByID[playlist]}
              location={`playlist/${playlistsByID[playlist]._id}`}
            />
          ))}
        </section>
      </ProfileLayout>
    </Main>
  );
}

export default MyPlaylists;
