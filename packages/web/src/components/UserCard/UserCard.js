import { object, string } from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";

import Avatar from "../Avatar";

function UserCard({ user = null, location }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${location}`);
  };
  return (
    user && (
      <>
        <button type="button" onClick={handleClick}>
          <div className="text-gray-300 p-10">
            <div className="flex items-center">
              <Avatar
                placeholder={user?.username?.charAt(0).toUpperCase()}
                height="h-32"
                width="w-32"
                textSize="text-5xl"
              />
              <div className="flex flex-col ml-6 items-start">
                <h2 className="mt-0 mb-2 text-white text-xl">
                  {user?.username}
                </h2>
                <h4 className="mt-0 mb-2 uppercase text-gray-500 songing-widest text-xs">
                  {user?.firstName} {user?.lastName}
                </h4>
                {/* <div className="ml-auto">
                <button
                  type="button"
                  className="mr-9 bg-indigo-500 text-indigo-100 block py-2 px-1 rounded-full focus:outline-none text-xs"
                >
                  FOLLOW
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </button>
      </>
    )
  );
}

UserCard.propTypes = {
  user: object,
  location: string.isRequired,
};

UserCard.defaultProps = {
  user: null,
};

export default UserCard;
