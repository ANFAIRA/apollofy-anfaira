import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeSong } from "../../redux/song/song-actions";
import Avatar from "../../components/Avatar";
import SongCard from "../../components/SongCard";
import Main from "../../layout/Main";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { data } = useSelector((state) => state?.song?.meSongs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeSong());
  }, [dispatch]);
  return (
    <Main>
      <div className="flex items-center ">
        <Avatar
          placeholder={currentUser.data.username.charAt(0).toUpperCase()}
          height="h-32"
          width="w-32"
          textSize="text-7xl"
        />
        <h3 className="text-6xl font-semibold ml-4">
          {currentUser.data.username}
        </h3>
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {data?.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      </div>
    </Main>
  );
};

export default Profile;
