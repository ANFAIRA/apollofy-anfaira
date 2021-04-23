import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import PlayListCard from "../../components/PlayListCard";
import Main from "../../layout/Main";
import "./Profile.scss";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Main>
      <div className="flex items-center">
        <Avatar
          placeholder={currentUser.data.username.charAt(0).toUpperCase()}
          height="h-32"
          width="w-32"
          textSize="text-7xl"
        />
        <h3 className="text-5xl font-semibold ml-4">
          {currentUser.data.username}
        </h3>
      </div>
      <div className="container">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <PlayListCard
            title="My songs"
            location="my-songs"
            description="My uploaded tracks..."
          />
          <PlayListCard
            title="My favourite songs"
            location="my-favourite-songs"
            description="My favourite tracks..."
          />
        </div>
      </div>
    </Main>
  );
};

export default Profile;
