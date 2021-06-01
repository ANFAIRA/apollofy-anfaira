import api from "../../api";
import { normalizeUsers } from "../../schema/user-schema";
import { getCurrentUserToken } from "../../services/auth";
import * as UserTypes from "./user-types";
import { userTypes } from "./user-types";
import {
  updateUserAccountRequest,
  updateUserAccountSuccess,
  updateUserAccountError,
  updateUserAccountReset,
} from "../auth/auth-actions";

// export const resetStoreAndLogOut = () => ({
//   type: UserTypes.RESET_STORE_AND_LOG_OUT,
// });

// FETCH A COLLECTION OF USERS

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

export function fetchUsers(type) {
  switch (type) {
    case userTypes.ALL_USERS:
      return fetchAllUsers();
    case userTypes.FOLLOWERS:
      return fetchFollowersUsers();
    case userTypes.FOLLOWING:
      return fetchFollowingUsers();
    default:
      break;
  }
  return fetchAllUsers();
}

// Fetch all users

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
      return dispatch(fetchUsersError(err.message));
    }
  };
}

// Fetch users I am following

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

// Fetch users that follow me

export function fetchFollowersUsers() {
  return async function fetchUsersThunk(dispatch) {
    dispatch(fetchUsersRequest());

    const res = await api.getFollowingUsers();

    if (res.isSuccessful) {
      const normalizedUsers = normalizeUsers(res.data);
      dispatch(
        fetchUsersSuccess({
          type: userTypes.FOLLOWERS,
          usersByID: normalizedUsers.entities.users,
          userIds: normalizedUsers.result,
        }),
      );
    } else {
      dispatch(fetchUsersError(res.errorMessage));
    }
  };
}

// Fetch popular users

// export function fetchPopularUsers() {
//   return async function fetchUsersThunk(dispatch) {
//     dispatch(fetchUsersRequest());

//     const res = await api.getPopularUsers();

//     if (res.isSuccessful) {
//       const normalizedUsers = normalizeUsers(res.data);
//       dispatch(
//         fetchUsersSuccess({
//           type: userTypes.POPULAR,
//           usersByID: normalizedUsers.entities.users,
//           userIds: normalizedUsers.result,
//         }),
//       );
//     } else {
//       dispatch(fetchUsersError(res.errorMessage));
//     }
//   };
// }

// FETCH USER BY ID

export const fetchUserByIdRequest = () => ({
  type: UserTypes.FETCH_USER_BY_ID_REQUEST,
});

export const fetchUserByIdError = (message) => ({
  type: UserTypes.FETCH_USER_BY_ID_ERROR,
  payload: message,
});

export const fetchUserByIdSuccess = (user) => ({
  type: UserTypes.FETCH_USER_BY_ID_SUCCESS,
  payload: user,
});

export function fetchUserByID(userID) {
  return async function fetchUserByIDThunk(dispatch) {
    dispatch(fetchUserByIdRequest());
    try {
      const res = await api.getUserById(userID);
      return dispatch(fetchUserByIdSuccess(res.data.data));
    } catch (err) {
      return dispatch(fetchUserByIdError(err.message));
    }
  };
}

// Delete song from all users

export const deleteSongFromAllUsersRequest = () => ({
  type: UserTypes.DELETE_SONG_FROM_ALL_USERS_REQUEST,
});

export const deleteSongFromAllUsersError = (message) => ({
  type: UserTypes.DELETE_SONG_FROM_ALL_USERS_ERROR,
  payload: message,
});

export const deleteSongFromAllUsersSuccess = (songId) => ({
  type: UserTypes.DELETE_SONG_FROM_ALL_USERS_SUCCESS,
  payload: songId,
});

export function deleteSongFromAllUsers(songId) {
  return async function deleteSongFromAllUsersThunk(dispatch) {
    dispatch(deleteSongFromAllUsersRequest());
    try {
      const response = await api.deleteSongFromAllUsers({
        songId,
      });
      if (response.errorMessage) {
        return dispatch(deleteSongFromAllUsersError(response.errorMessage));
      }
      return dispatch(deleteSongFromAllUsersSuccess());
    } catch (error) {
      return dispatch(deleteSongFromAllUsersError(error.message));
    }
  };
}

// FOLLOW USERS

export const followUser = (userId, firebaseId) => {
  return async function followUserThunk(dispatch) {
    dispatch(updateUserAccountRequest());
    try {
      const token = await getCurrentUserToken();
      const data = await api.followUser(
        {
          Authorization: `Bearer ${token}`,
        },
        { userId, firebaseId },
      );
      dispatch(updateUserAccountSuccess(data.data.data));
      dispatch(fetchUserByID(userId));
      return dispatch(updateUserAccountReset());
    } catch (err) {
      return dispatch(updateUserAccountError(err.message));
    }
  };
};

// Delete playlist from all users

export const deletePlaylistFromAllUsersRequest = () => ({
  type: UserTypes.DELETE_PLAYLIST_FROM_ALL_USERS_REQUEST,
});

export const deletePlaylistFromAllUsersError = (message) => ({
  type: UserTypes.DELETE_PLAYLIST_FROM_ALL_USERS_ERROR,
  payload: message,
});

export const deletePlaylistFromAllUsersSuccess = (playlistId) => ({
  type: UserTypes.DELETE_PLAYLIST_FROM_ALL_USERS_SUCCESS,
  payload: playlistId,
});

export function deletePlaylistFromAllUsers(playlistId) {
  return async function deletePlaylistFromAllUsersThunk(dispatch) {
    dispatch(deletePlaylistFromAllUsersRequest());
    try {
      const response = await api.deletePlaylistFromAllUsers({
        playlistId,
      });
      if (response.errorMessage) {
        return dispatch(deletePlaylistFromAllUsersError(response.errorMessage));
      }
      return dispatch(deletePlaylistFromAllUsersSuccess());
    } catch (error) {
      return dispatch(deletePlaylistFromAllUsersError(error.message));
    }
  };
}
