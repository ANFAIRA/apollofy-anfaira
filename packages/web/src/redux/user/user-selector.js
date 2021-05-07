import { createSelector } from "reselect";

export const selectUsers = (state) => state.users.userIds;

export const selectUser = (state, userID) => state.users.usersByID[userID];

export const selectUserState = (state) => state.users;

export const usersSelector = createSelector(
  [selectUsers],
  (usersIDS) => usersIDS,
);

export const userSelector = createSelector([selectUser], (user) => user);

export const userStateSelector = createSelector(
  [selectUserState],
  (userState) => userState,
);
