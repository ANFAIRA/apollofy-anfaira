import React from "react";
import { useSelector } from "react-redux";

import SongCard from "../../components/SongCard";
import Main from "../../layout/Main";
import UserProfileLayout from "../../layout/UserProfileLayout";

function UserSongs() {
  const { uploadedSongs } = useSelector((state) => state.user.currentUser);
  const { songsByID } = useSelector((state) => state?.song);

  return (
    <Main>
      <UserProfileLayout>
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {uploadedSongs?.map((song) => (
            <SongCard key={songsByID[song]._id} song={songsByID[song]} />
          ))}
        </section>
      </UserProfileLayout>
    </Main>
  );
}

export default UserSongs;
