import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import Main from "../../layout/Main";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
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
    </Main>
  );
};

export default Profile;
