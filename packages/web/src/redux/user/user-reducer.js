import * as UserTypes from "./user-types";

export const UserInitState = {
  usersLoading: false,
  usersLoadingError: null,
  usersFetched: false,
  userLoading: false,
  userLoadingError: null,
  userFetched: false,
  selectedUser: {},
  usersByID: {},
  userIds: {
    ALL_USERS: [],
    FOLLOWERS: [],
    FOLLOWING: [],
    POPULAR: [],
  },
};

const UserReducer = (state = UserInitState, action) => {
  switch (action.type) {
    case UserTypes.FETCH_USERS_REQUEST: {
      return {
        ...state,
        usersLoading: true,
        usersLoadingError: null,
      };
    }
    case UserTypes.FETCH_USERS_ERROR: {
      return {
        ...state,
        usersLoading: false,
        usersLoadingError: action.payload,
      };
    }
    case UserTypes.FETCH_USERS_SUCCESS: {
      const actionType = action.payload.type;
      const newIds = { ...state.userIds };
      newIds[actionType] = [...action.payload.userIds];

      return {
        ...state,
        usersLoading: false,
        usersFetched: true,
        usersLoadingError: null,
        usersByID: {
          ...state.usersByID,
          ...action.payload.usersByID,
        },
        userIds: newIds,
      };
    }
    case UserTypes.FETCH_USER_BY_ID_REQUEST: {
      return {
        ...state,
        userLoading: true,
        userLoadingError: null,
      };
    }
    case UserTypes.FETCH_USER_BY_ID_ERROR: {
      return {
        ...state,
        userLoading: false,
        userLoadingError: action.payload,
      };
    }
    case UserTypes.FETCH_USER_BY_ID_SUCCESS: {
      const userID = action.payload._id;
      return {
        ...state,
        userLoading: false,
        userFetched: true,
        userLoadingError: null,
        selectedUser: action.payload,
        usersByID: {
          ...state.usersByID,
          [userID]: {
            ...action.payload,
          },
        },
      };
    }
    case UserTypes.FETCH_USER_BY_ID_RESET: {
      return {
        ...UserInitState,
      };
    }
    case UserTypes.DELETE_SONG_FROM_ALL_USERS_REQUEST: {
      return {
        ...state,
        deletingSong: true,
        deleteSongError: null,
      };
    }
    case UserTypes.DELETE_SONG_FROM_ALL_USERS_ERROR: {
      return {
        ...state,
        deletingSong: false,
        deleteSongError: action.payload,
      };
    }
    case UserTypes.DELETE_SONG_FROM_ALL_USERS_SUCCESS: {
      // console.log(state.usersByID[action.payload._id]);
      for (const userKeys in state.usersByID) {
        if (userKeys) {
          // eslint-disable-next-line no-param-reassign
          state.usersByID[userKeys].uploadedSongs = state.usersByID[
            userKeys
          ].uploadedSongs.filter(
            (itemId) => itemId !== action.payload.data._id,
          );
          console.log(state.usersByID[userKeys].uploadedSongs);
          // state.usersByID[userKeys].likedSongs = state.usersByID[
          //   userKeys
          // ].likedSongs.filter((itemId) => itemId !== action.payload.data._id);
        }
      }
      for (const userKeys in state.usersByID) {
        if (userKeys) {
          console.log(state.usersByID[userKeys].likedSongs);
          // eslint-disable-next-line no-param-reassign
          state.usersByID[userKeys].likedSongs = state.usersByID[
            userKeys
          ].likedSongs.filter((itemId) => itemId !== action.payload.data._id);
        }
      }
      return {
        ...state,
        deletingSong: false,
        deleteSongError: null,
      };
    }
    case UserTypes.DELETE_PLAYLIST_FROM_ALL_USERS_REQUEST: {
      return {
        ...state,
        deletingSong: true,
        deleteSongError: null,
      };
    }
    case UserTypes.DELETE_PLAYLIST_FROM_ALL_USERS_ERROR: {
      return {
        ...state,
        deletingSong: false,
        deleteSongError: action.payload,
      };
    }
    case UserTypes.DELETE_PLAYLIST_FROM_ALL_USERS_SUCCESS: {
      return {
        ...state,
        deletingSong: false,
        deleteSongError: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
