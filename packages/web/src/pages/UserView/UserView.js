import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../layout/Main";
import UserProfileLayout from "../../layout/UserProfileLayout";
import { fetchUserByID } from "../../redux/user/user-actions";

const UserView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserByID(id));
  }, [dispatch, id]);

  return (
    <Main>
      <UserProfileLayout>
        <h2>hey</h2>
      </UserProfileLayout>
    </Main>
  );
};

export default UserView;
