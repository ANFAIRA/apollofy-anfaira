import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const selectUsers = (state) => state.user.userIds;

// export const selectUser = (state, userID) => state.user.usersByID[userID];

export const selectUser = (userID) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSelector((state) => state.user.usersByID[userID]);
};

export const selectUserState = (state) => state.user;

export const usersSelector = createSelector(
  [selectUsers],
  (usersIDS) => usersIDS,
);

export const userSelector = createSelector([selectUser], (user) => user);

export const userStateSelector = createSelector(
  [selectUserState],
  (userState) => userState,
);
