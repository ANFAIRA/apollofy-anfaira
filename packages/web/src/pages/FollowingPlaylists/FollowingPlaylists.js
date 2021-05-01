import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { playlistTypes } from "../../redux/playlist/playlist-types";
import {
  // fetchPlaylists,
  fetchFollowedPlaylists,
} from "../../redux/playlist/playlist-actions";

import PlaylistCard from "../../components/PlayListCard";
import Main from "../../layout/Main";
import ProfileLayout from "../../layout/ProfileLayout";

function FollowingPlaylists() {
  const { FOLLOWING: followedPlaylistsArray } = useSelector(
    (state) => state.playlists.playlistIds,
  );

  const { playlistByID } = useSelector((state) => state.playlists);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchPlaylists(playlistTypes.FOLLOWING));
    dispatch(fetchFollowedPlaylists());
  }, [dispatch]);

  return (
    <Main>
      <ProfileLayout>
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {followedPlaylistsArray?.map((playlist) => (
            <PlaylistCard
              key={playlistByID[playlist]._id}
              playlist={playlistByID[playlist]}
              location={`playlist/${playlistByID[playlist]._id}`}
            />
          ))}
        </section>
      </ProfileLayout>
    </Main>
  );
}

export default FollowingPlaylists;
