import React from "react";
import { useSelector } from "react-redux";

import PlaylistCard from "../../components/PlayListCard";
import Main from "../../layout/Main";
import UserProfileLayout from "../../layout/UserProfileLayout";

function FollowingPlaylists() {
  const { followedPlaylist } = useSelector((state) => state.user?.selectedUser);

  const { playlistsByID } = useSelector((state) => state.playlists);

  return (
    <Main>
      <UserProfileLayout>
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {followedPlaylist?.map((playlist) => (
            <PlaylistCard
              key={playlistsByID[playlist]._id}
              playlist={playlistsByID[playlist]}
              location={`playlist/${playlistsByID[playlist]._id}`}
            />
          ))}
        </section>
      </UserProfileLayout>
    </Main>
  );
}

export default FollowingPlaylists;
