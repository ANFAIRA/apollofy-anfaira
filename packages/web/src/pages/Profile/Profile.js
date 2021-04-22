import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeSong } from "../../redux/song/song-actions";
import Avatar from "../../components/Avatar";
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
        {data?.map((song) => (
          <p key={song._id}>{song.title}</p>
        ))}
      </div>
    </Main>
  );
};

export default Profile;
