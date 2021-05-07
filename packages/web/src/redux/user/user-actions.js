import api from "../../api";
import { normalizeUsers } from "../../schema/user-schema";
import * as UserTypes from "./user-types";
import { userTypes } from "./user-types";

export const resetStoreAndLogOut = () => ({
  type: UserTypes.RESET_STORE_AND_LOG_OUT,
});

export const fetchUsersRequest = () => ({
  type: UserTypes.FETCH_USERS_REQUEST,
});

export const fetchUsersError = ({ message }) => ({
  type: UserTypes.FETCH_USERS_ERROR,
  payload: message,
});

export const fetchUsersSuccess = ({
  type = userTypes.ALL,
  usersByID,
  userIds,
}) => ({
  type: UserTypes.FETCH_USERS_SUCCESS,
  payload: {
    type: type,
    usersByID: usersByID,
    userIds: userIds,
  },
});

export const fetchUserRequest = () => ({
  type: UserTypes.FETCH_USER_REQUEST,
});

export const fetchUserError = (message) => ({
  type: UserTypes.FETCH_USER_ERROR,
  payload: message,
});

export const fetchUserSuccess = (user) => ({
  type: UserTypes.FETCH_USER_SUCCESS,
  payload: user,
});

export function fetchUsers(type) {
  switch (type) {
    case userTypes.ALL_USERS:
      return fetchAllUsers();
    case userTypes.FOLLOWED_BY:
      return fetchFollowersUsers();
    case userTypes.FOLLOWING:
      return fetchFollowingUsers();
    case userTypes.POPULAR:
      return fetchPopularUsers();
    default:
      break;
  }
  return fetchAllUsers();
}

export function fetchAllUsers() {
  return async function fetchUsersThunk(dispatch) {
    dispatch(fetchUsersRequest());

    try {
      const res = await api.getUsers();

      if (res.errorMessage) {
        return dispatch(fetchUsersError(res.errorMessage));
      }

      const normalizedUsers = normalizeUsers(res.data.data);

      return dispatch(
        fetchUsersSuccess({
          type: userTypes.ALL_USERS,
          usersByID: normalizedUsers.entities.users,
          userIds: normalizedUsers.result,
        }),
      );
    } catch (err) {
      return dispatch(fetchUserError(err.message));
    }
  };
}

export function fetchFollowingUsers() {
  return async function fetchUsersThunk(dispatch) {
    dispatch(fetchUsersRequest());

    const res = await api.getFollowingUsers();

    if (res.isSuccessful) {
      const normalizedUsers = normalizeUsers(res.data);
      dispatch(
        fetchUsersSuccess({
          type: userTypes.FOLLOWING,
          usersByID: normalizedUsers.entities.users,
          userIds: normalizedUsers.result,
        }),
      );
    } else {
      dispatch(fetchUsersError(res.errorMessage));
    }
  };
}

export function fetchPopularUsers() {
  return async function fetchUsersThunk(dispatch) {
    dispatch(fetchUsersRequest());

    const res = await api.getPopularUsers();

    if (res.isSuccessful) {
      const normalizedUsers = normalizeUsers(res.data);
      dispatch(
        fetchUsersSuccess({
          type: userTypes.POPULAR,
          usersByID: normalizedUsers.entities.users,
          userIds: normalizedUsers.result,
        }),
      );
    } else {
      dispatch(fetchUsersError(res.errorMessage));
    }
  };
}

export function fetchFollowersUsers() {
  return async function fetchUsersThunk(dispatch) {
    dispatch(fetchUsersRequest());

    const res = await api.getFollowingUsers();

    if (res.isSuccessful) {
      const normalizedUsers = normalizeUsers(res.data);
      dispatch(
        fetchUsersSuccess({
          type: userTypes.FOLLOWED_BY,
          usersByID: normalizedUsers.entities.users,
          userIds: normalizedUsers.result,
        }),
      );
    } else {
      dispatch(fetchUsersError(res.errorMessage));
    }
  };
}

export function fetchUserByID(userID) {
  return async function fetchUserByIDThunk(dispatch) {
    dispatch(fetchUserRequest());
    try {
      const res = await api.getUserById(userID);
      return dispatch(fetchUserSuccess(res.data.data));
    } catch (err) {
      return dispatch(fetchUserError(err.message));
    }
  };
}
