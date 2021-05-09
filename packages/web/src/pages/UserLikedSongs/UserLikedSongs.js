import React from "react";
import { useSelector } from "react-redux";

// import { fetchLikedSong } from "../../redux/liked-songs/liked-songs-actions";
import SongCard from "../../components/SongCard";
import Main from "../../layout/Main";
import UserProfileLayout from "../../layout/UserProfileLayout";

function LikedSongs() {
  const { likedSongs } = useSelector((state) => state.user?.currentUser);
  const { songsByID } = useSelector((state) => state?.song);

  // const { likedSongs } = useSelector((state) =>
  //   state.song?.currentUser?.data
  //     ? state.song.currentUser.data
  //     : state.auth?.currentUser?.data,
  // );

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchSongs(songsTypes.FAVORITE));
  // }, [dispatch, likedSongs]);

  return (
    <Main>
      <UserProfileLayout>
        <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
          {likedSongs?.map((song) => (
            <SongCard key={songsByID[song]._id} song={songsByID[song]} />
          ))}
        </section>
      </UserProfileLayout>
    </Main>
  );
}

export default LikedSongs;
